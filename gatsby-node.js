const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            rest {
                services(pagination: {limit: 20}) {
                    data {
                        attributes {
                            url
                            category
                        }
                    }
                }
            }
        }
      `)

    data?.rest?.services?.data?.forEach(node => {
        const { url, category } = node.attributes;
        actions.createPage({
            path: `/${category}/${url}`,
            component: path.resolve('./src/templates/single-service.js'),
            context: { url }
        })
    });

    const { data: AboutMassages } = await graphql(`
        query {
            rest {
              aboutMassages(pagination: {limit: 1000}) {
                data {
                    id
                    attributes {                    
                        url
                    }
                }
              }
            }
        }`
    )

    AboutMassages?.rest?.aboutMassages?.data?.forEach(node => {
        const { id, url } = node.attributes;
        actions.createPage({
            path: `about-massages/${url}`,
            component: path.resolve('./src/templates/single-about-massages-card.js'),
            context: { url, fetchedMassages: AboutMassages?.rest?.aboutMassages?.data, id }
        });
    });
}
