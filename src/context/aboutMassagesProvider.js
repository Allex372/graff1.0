import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [fetchedMassages, setFetchedMassages] = useState(null);

    const fetchFetchData = async () => {
        try {
            const token = '24da86087f116291ec96ad43dab23b303ab9953b419db27224d705a0241d95806bf312d2019a0b39046444ea84e06fcfcfb764fdc28ec15d5a40f24368c343ea99c9c413aa61aa28cd472da495c88e21486f4769d9199cb861a55ef9b89af31d80ee1e8983e6adb6e0b05ab2b45bd9d56b617d96d16b69a7ca9bd059e17d5f27';
            const response = await fetch('https://vast-fjord-05237.herokuapp.com/api/about-massages?populate=*&pagination[page]=1&pagination[pageSize]=1000', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setFetchedMassages(data);
        } catch (error) {
            setFetchedMassages([]);
        }
    };

    useEffect(() => {
        fetchFetchData();
    }, []);

    return (
        <StateContext.Provider value={{ fetchedMassages, setFetchedMassages }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => {
    return useContext(StateContext);
};
