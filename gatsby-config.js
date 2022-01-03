const emoji = require(`remark-emoji`);
const siteURL = "https://e-vinci.github.io/baja-website"; // No trailing slash allowed!
const youtubeUrl = "";
const authorEmail = "raphael.baroni@vinci.be";
const facebookUrl = "";
const instagramUrl = "";
module.exports = {
  pathPrefix: `/baja-website`, // this is if your site is to be published on URL with a prefix (Github page e.g.),
  siteMetadata: {
    title: "Backend Java",
    description: "Your site description",
    url: siteURL,
    siteUrl: siteURL, // config for gatsby-plugin-robots-txt
    youtubeUrl: youtubeUrl,
    authorEmail: authorEmail,
    facebookUrl: facebookUrl,
    instagramUrl: instagramUrl,
    menuLinks: [
      {
        name: `Home`,
        link: `/`,
      },      
      {
        name: "Contenu du cours",
        link: "",
        subMenu: [
          { name: "Introduction", link: "/intro" },
          { name: "Module 1 : découverte de JAX-RS", link: "/modules/1" },
          { name: "Module 2 : JAX-RS & auths", link: "/modules/2" },
          { name: "Module 3 : JAX-RS avancé", link: "/modules/3" },
        ],
      },
      {
        name: `About`,
        link: `/about`,
      },
    ],
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-plugin-catch-links`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "texts",
        path: `./src/other-resources`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdx-pages",
        path: `./src/mdx-pages`,
      },
    },
    {
      resolve: "gatsby-plugin-remove-console",
      options: {
        exclude: ["error", "warn"], // <- will be removed all console calls except these
      },
    },
    `gatsby-remark-images`,
    
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: true,
            },
          },          
        ],
        extensions: [".mdx", ".md"],
        remarkPlugins: [emoji],
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `myjscourse`,
        short_name: `myjscourse`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#303030`,
        display: `standalone`,
        icon: `src/images/favicon.svg`,
        cache_busting_mode: "none",
        sizes: "any",
        include_favicon: true,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-robots-txt",
  ],
};
