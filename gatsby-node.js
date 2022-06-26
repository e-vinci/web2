const path = require("path");
const crypto = require("crypto");
const fetch = require("node-fetch");
const { getSlugAndLang } = require("ptz-i18n");
const { getFilePath } = require("./src/utils/files/files");
/*/
const {
  onCreateNode: gatsbyPluginI18nOptions,
} = require("gatsby-plugin-i18n/onCreateNode");*/

const { plugins } = require("./gatsby-config");
const { options: i18nPluginOptions } = plugins.find(
  (plugin) => plugin.resolve === `gatsby-plugin-i18n`
);

// load variables from the .env.* files
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// add a slug field to all MDX files
exports.onCreateNode = ({ node, actions, getNode }) => {
  //gatsbyPluginI18nOptions({ node, actions }, pluginOptions);

  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark" || node.internal.type === "Mdx") {
    const filePath = getFilePath(node);
    const slugAndLang = getSlugAndLang(i18nPluginOptions, filePath);
    createNodeField({
      node,
      name: "langKey",
      value: slugAndLang.langKey,
    });
    createNodeField({
      node,
      name: "slug",
      value: slugAndLang.slug,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  console.log("CreatePages is called.");
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error("page creation error");
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // Create pages from /pages.
  const pages = result.data.allMdx.edges;
  console.log("Pages to create : ", pages.length);
  const templatePath = path.resolve(`src/templates/mdx-pages.js`);
  console.log("path to template: ", templatePath);
  // you'll call `createPage` for each result
  pages.forEach(({ node }, index) => {
    console.log("CREATE PAGE FOR : ", node.fields.slug);
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: templatePath,
      // Data passed to context is available
      // in page queries as GraphQL variables.
      //context: { id: node.id },
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};

// define fields for the menu & submenus if we want to avoid props with null values for example
// this is important in order for the main-layout to work even if there are no SubMenus
exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions;

  createFieldExtension({
    name: "defaultTrue",
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return true;
          }
          return source[info.fieldName];
        },
      };
    },
  });

  createFieldExtension({
    name: "defaultFalse",
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return false;
          }
          return source[info.fieldName];
        },
      };
    },
  });

  createFieldExtension({
    name: "defaultString",
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return "";
          }
          return source[info.fieldName];
        },
      };
    },
  });

  createFieldExtension({
    name: "defaultTitle",
    extend() {
      return {
        resolve(source, args, context, info) {
          console.log("source : ", source);
          console.log("info : ", info);
          if (source[info.fieldName] == null) {
            return "";
          }
          return source[info.fieldName];
        },
      };
    },
  });

  createFieldExtension({
    name: `defaultArray`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return [];
          }
          return source[info.fieldName];
        },
      };
    },
  });

  const typeDefs = `
  type Mdx implements Node {
    frontmatter: MdxFrontmatter!
  }
    type MdxFrontmatter {      
      autoMargin: Boolean @defaultTrue
      title: String @defaultString   
      description: String @defaultString 
      headerImage: String @defaultString 
      featuredImage: String @defaultString 
      navbarExtraStyles: String @defaultString
      date: Date @dateformat(formatString: "DD/MM/YYYY")
    }
    type Site implements Node {
      siteMetadata: SiteMetadata
    }
    type SiteMetadata {
      menuLinks: [MenuLinks]!
    }
    type MenuLinks {
      name: String!
      link: String!
      protected: Boolean @defaultFalse
      subMenu: [SubMenu] @defaultArray
    }
    type SubMenu {
      name: String
      link: String
      protected: Boolean @defaultFalse
    }     
  `;
  createTypes(typeDefs);
};

