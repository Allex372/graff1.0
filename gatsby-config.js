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
        url: 'http://www.graff-massage.com:8080/graphql',
        headers: {
          Authorization: 'Bearer 9d4d07b8c7e7e98b3fdfe94fdb83e4101a56ee2ebdd542f52cb40652c40367c19d63e2a3d4736bc766693c965e2ee6b45eb371ae186fc25c0a4ad27b2013000468f739109e4d9ebf4c9efd644f199a418aa4904b3aef2da4f186d2d3171fdcfbdb520b98e2d22f545d37468d4c3a144b0c2909c37434c9bff453edf2c31f3da2',
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
  pathPrefix: "/graff",
};
