/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby";

function Seo({ description, title, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  console.log(title, 'title');
  console.log(description, 'description');

  return (
    <>
      <title>{defaultTitle ? `${title}` : title}</title>
      <meta name="description" content={description ? description : metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description ? description : metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <link rel="icon" href="../images/icon.jpg" type="image/jpg" />
      {children}
    </>
  )
}

export default Seo
