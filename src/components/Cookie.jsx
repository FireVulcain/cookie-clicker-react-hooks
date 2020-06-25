import React, { useState, useContext } from "react";

// Assets
import cookie from "./../assets/cookie.png";

// Components
import { Counter } from "./Counter";

//context
import { GlobalContext } from "./../context/GlobalState";

export const Cookie = () => {
    const { state, incrementCookieOnClick } = useContext(GlobalContext);
    const [active, setActive] = useState(false);

    return (
        <div className="infos-cookie">
            <Counter />
            <div className="cookie-container">
                <p onAnimationEnd={() => setActive(false)} className={active ? "animate" : null}>
                    + {state.perClick}
                </p>
                <img
                    onClick={() => {
                        incrementCookieOnClick();
                        setActive(!active);
                    }}
                    src={cookie}
                    alt="Cookie"
                />
            </div>
        </div>
    );
};
