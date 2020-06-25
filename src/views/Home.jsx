import React, { useEffect, useContext } from "react";

// Components
import { HeadProvider, Title } from "react-head";
import { Cookie } from "./../components/Cookie";
import { Shop } from "./../components/Shop";

// Functions
import { commarize } from "./../helpers/helper";

//context
import { GlobalContext } from "./../context/GlobalState";

export const Home = () => {
    const { state, loadFileState, incrementCookiePerSecond } = useContext(GlobalContext);

    useEffect(() => {
        let file = JSON.parse(localStorage.getItem("saveFile"));
        if (file !== null) loadFileState(file);

        const interval = setInterval(() => {
            incrementCookiePerSecond();
        }, 1000);

        return function () {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem("saveFile", JSON.stringify({ state }));
    }, [state]);

    return (
        <>
            <HeadProvider>
                <Title>{commarize(state.nbCookie)} cookies - Cookie Clicker | React Hooks</Title>
            </HeadProvider>
            {state.items && (
                <div className="container">
                    <Cookie />
                    <Shop />
                </div>
            )}
        </>
    );
};
