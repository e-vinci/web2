const { createFilePath } = require("gatsby-source-filesystem");
const path = require("path");

// add a slug field to all MDX files
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode, basePath: `page-content` });
    console.log("create this slug: ", value);
    createNodeField({
      // Individual MDX node
      node,
      // Name of the field you are adding
      name: "slug",      
      // Generated value based on filepath. you
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: value,
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
  // Create pages from /page-content.
  const pages = result.data.allMdx.edges;
  console.log("Pages to create : ", pages.length);
  // you'll call `createPage` for each result
  pages.forEach(({ node }, index) => {
    console.log("Path:", node);
    //console.log("Path:", node.slug);
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/page-content-layout.js`),
      //component: path.resolve(`src/templates/empty-page-layout.js`),
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
  const { createFieldExtension, createTypes } = actions
  createFieldExtension({
    name: `defaultArray`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return []
          }
          return source[info.fieldName]
        },
      }
    },
  })
  const typeDefs = `
    type Site implements Node {
      siteMetadata: SiteMetadata
    }
    type SiteMetadata {
      menuLinks: [MenuLinks]!
    }
    type MenuLinks {
      name: String!
      link: String!
      subMenu: [SubMenu] @defaultArray
    }
    type SubMenu {
      name: String
      link: String
    }     
  `
  createTypes(typeDefs)
}

