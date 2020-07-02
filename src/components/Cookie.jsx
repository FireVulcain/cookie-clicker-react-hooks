import React, { useContext } from "react";

// Assets
import cookie from "./../assets/cookie.png";

// Components
import { Counter } from "./Counter";

//context
import { GlobalContext } from "./../context/GlobalState";

export const Cookie = () => {
    const { state, incrementCookieOnClick } = useContext(GlobalContext);

    const cookieShower = () => {
        if (state.bakedCookie >= 10000 && state.bakedCookie < 100000) {
            return "cs1";
        } else if (state.bakedCookie >= 100000 && state.bakedCookie < 1000000) {
            return "cs2";
        } else if (state.bakedCookie >= 1000000) {
            return "cs3";
        }
    };
    return (
        <div className="infos-cookie">
            <div className={"cookie-shower " + cookieShower()}></div>
            <div className="infos-cookie-wrapper">
                <Counter />
                <div className="cookie-container">
                    <div className="shine-cookie"></div>
                    <div className="shine-cookie-reverse"></div>
                    <img onClick={() => incrementCookieOnClick()} src={cookie} alt="Cookie" />
                </div>
            </div>
        </div>
    );
};
