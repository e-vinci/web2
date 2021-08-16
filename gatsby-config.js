const emoji = require(`remark-emoji`);
const siteURL = "https://e-vinci.github.io/myjscourse"; //"https://www.artiyoga.com", // No trailing slash allowed!
const youtubeUrl = "https://www.youtube.com/channel/UC_iU0pfrDaYFXd6X9mPlAJQ";
const authorEmail = "raphael.baroni@vinci.be";
const facebookUrl = "";
const instagramUrl = "";
module.exports = {
  pathPrefix: `/myjscourse`,
  siteMetadata: {
    title: "myjscourse",
    description: "myjscourse : Apprendre JavaScript et Node.js",
    url: siteURL,
    siteUrl: siteURL, // config for gatsby-plugin-robots-txt
    youtubeUrl: youtubeUrl,
    authorEmail: authorEmail,
    facebookUrl: facebookUrl,
    instagramUrl: instagramUrl,
    //twitterUsername: "@occlumency",
    menuLinks: [
      {
        name: `Home`,
        link: `/`,
      },
      {
        name: `About`,
        link: `/about`,
      },
      {
        name: "Vitrines de projets",
        link: "",
        subMenu: [
          { name: "Projets webs 2020", link: "/public-projects/showcase2020" },
        ],
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
        name: "page-content",
        path: `./src/page-content`,
      },
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
      },
    },
    {
      resolve: "gatsby-plugin-remove-console",
      options: {
        exclude: ["error", "warn"], // <- will be removed all console calls except these
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`, 
      options: { prefixes: [`/app/*`] }, // These paths exist on the client only and do not correspond to index.html files in an app’s built assets
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
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/favicon.svg`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-robots-txt",
    /*
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // In your gatsby-transformer-remark plugin array
        plugins: [{
          resolve: 'gatsby-remark-emojis',
          options: {
            // Deactivate the plugin globally (default: true)
            active : true,
            // Add a custom css class
            //class  : 'emoji-icon',
            // In order to avoid pattern mismatch you can specify
            // an escape character which will be prepended to the
            // actual pattern (e.g. `#:poop:`).
            escapeCharacter : '', // (default: '')
            // Select the size (available size: 16, 24, 32, 64)
            size   : 16,
            
          }
        }]
      }
    }*/
  ],
};
