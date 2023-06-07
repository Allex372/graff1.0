const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            rest {
                services {
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
}
