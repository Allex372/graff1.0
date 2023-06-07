/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Graff massage Lviv`,
    description: `Найкращий салон еротичного масажу у Львові`,
    author: `@gatsbyjs`,
    siteUrl: `https://www.graff-massage.com`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-anchor-links`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'REST',
        fieldName: 'rest',
        url: 'https://whispering-shore-87525.herokuapp.com/graphql',
        headers: {
          Authorization: 'Bearer 571ed7986473215e45d999825cca0187c80a0561cf3246a38e6aa437a408bda689eacd923909bdebf75b17ae696f35208f876bc02fb3e7479f20c89e4d3711e66bfa7795d9b8a2f8122f4d8f9a63e2d306259f4048eb8048a7d27fadfde000139d1909b1abd9bde84980162a303658a65e18346446b6e5c19e42631ec1a6aeaa',
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.jpg`, // This path is relative to the root of the site.
      },
    },
  ],
  pathPrefix: "/graff",
};
