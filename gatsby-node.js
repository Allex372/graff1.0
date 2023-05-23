const path = require('path');

exports.createPages = async ({ actions }) => {
    try {
        const response = await fetch('https://whispering-shore-87525.herokuapp.com/api/services?populate=*', {
            headers: {
                Authorization: 'Bearer a841dc75e9e097f8d4c9c8f9ee35ccd2a04a38d43c93a0162b962bb0059715d700cd888f1da1907c16c48e2e2e927c3ed2b73d026366116b1de8adfb879dd78cb0737ccc3a44ba5e348c4ab9d8b1e47257d59809be54bc488c62f59888e6137347f49721b85199f9881f57fe1d0bba33407d82410ded87aa8432639b84404224',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch services data');
        }

        const data = await response.json();

        data?.data?.forEach(node => {
            actions.createPage({
                path: `/${node.id}`,
                component: path.resolve('./src/templates/single-service.js'),
                context: { id: node.id }
            });
        });
    } catch (error) {
        console.error('Error creating pages:', error);
    }
};
