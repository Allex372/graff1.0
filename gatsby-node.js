const path = require('path');
const Token = 'bcfef643dcc1c5aca290f8b18206764070ad5d55308cbfabfa350a13ca4e0b385ec051029739afa52617fbc3ed09b0ba0c42705f29cdef53b40c0d113ebae0cb833fcf55abe126da949a0a2ca44d72db550778241fa7918ac492ee51bcfb089958ef90defd0f3aa6cc63616a7bd3100a860532085c1a5b25e3550e87b35e9b68'

exports.createPages = async ({ actions }) => {
    try {
        const response = await fetch('https://whispering-shore-87525.herokuapp.com/api/services?populate=*', {
            headers: {
                Authorization:
                    `Bearer ${Token}`,
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
