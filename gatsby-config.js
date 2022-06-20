const emoji = require(`remark-emoji`);
const siteURL = "https://e-vinci.github.io/js"; // No trailing slash allowed!
const youtubeUrl = ""; //"https://www.youtube.com/channel/UC_iU0pfrDaYFXd6X9mPlAJQ";
const authorEmail = "raphael.baroni@vinci.be";
const facebookUrl = "";
const instagramUrl = "";
const defaultLanguage = "fr";
const defaultAssociatedProjectGroupName = "Web2 2021";
module.exports = {
  pathPrefix: `/js`,
  siteMetadata: {
    title: "myjscourse",
    description: "myjscourse : Apprendre JavaScript et Node.js",
    url: siteURL,
    siteUrl: siteURL, // config for gatsby-plugin-robots-txt
    youtubeUrl: youtubeUrl,
    authorEmail: authorEmail,
    facebookUrl: facebookUrl,
    instagramUrl: instagramUrl,
    languages: { langs: ["fr", "en"], defaultLangKey: defaultLanguage },
    defaultAssociatedProjectGroupName: defaultAssociatedProjectGroupName,
    //twitterUsername: "@whoever; )",
    menuLinks: [
      {
        name: `Home`,
        link: `/`,
      },
      {
        name: `Introduction au JS`,
        link: `/intro`,
      },
      {
        name: `Bibliographie`,
        link: `/references`,
      },
      {
        name: "Contenu du cours",
        link: "",
        subMenu: [
          { name: "Module 1 : découverte de JAX-RS", link: "/modules/1" },
          { name: "Module 2 : JAX-RS & auths", link: "/modules/2" },
          { name: "Module 3 : JAX-RS avancé", link: "/modules/3" },
        ],
      },
      {
        name: `Repositories`,
        link: `/repositories`,
      },
      {
        name: "Vitrines de projets",
        link: "",
        subMenu: [
          { name: "Projets web 2021", link: "/public-projects/showcase2021" },
          { name: "Projets web 2020", link: "/public-projects/showcase2020" },
        ],
      },
      {
        name: `About`,
        link: `/about`,
      },
      {
        name: `L'essentiel`,
        link: `/essentials`,
      },
      {
        name: `Other tools`,
        link: `/other-tools`,
      },
    ],
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
        name: "slides",
        path: `./src/slides`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "texts",
        path: `./src/texts`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
        name: "texts",
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
      resolve: "gatsby-source-filesystem",
      options: {
        name: "other-ressources",
        path: `./src/other-resources`,
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
        icon: `src/images/favicon2.svg`,
        cache_busting_mode: "none",
        // sizes: "any",
        //type: "image/svg+xml",
        include_favicon: true,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyForNull: "any",
        langKeyDefault: defaultLanguage,
        useLangKeyLayout: true,
        prefixDefault: false,
        pagesPaths: ["/src/mdx-pages/", "/src/pages"],
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-robots-txt",
  ],
};
