const path = require('path');
const Token = '9d4d07b8c7e7e98b3fdfe94fdb83e4101a56ee2ebdd542f52cb40652c40367c19d63e2a3d4736bc766693c965e2ee6b45eb371ae186fc25c0a4ad27b2013000468f739109e4d9ebf4c9efd644f199a418aa4904b3aef2da4f186d2d3171fdcfbdb520b98e2d22f545d37468d4c3a144b0c2909c37434c9bff453edf2c31f3da2'

// exports.createPages = async ({ actions }) => {
//     try {
//         const response = await fetch('http://www.graff-massage.com:8080/api/services?populate=*', {
//             headers: {
//                 Authorization:
//                     `Bearer ${Token}`,
//             },
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch services data');
//         }

//         const data = await response.json();

//         data?.data?.forEach(node => {
//             actions.createPage({
//                 path: `/${node.id}`,
//                 component: path.resolve('./src/templates/single-service.js'),
//                 context: { id: node.id }
//             });
//         });
//     } catch (error) {
//         console.error('Error creating pages:', error);
//     }
// };

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
