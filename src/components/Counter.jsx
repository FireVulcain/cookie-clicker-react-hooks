import React, { useContext } from "react";

import { commarize, getUnit, formatNumber } from "./../helpers/helper";

//context
import { GlobalContext } from "./../context/GlobalState";

import CountUp from "react-countup";

export const Counter = () => {
    const { state } = useContext(GlobalContext);

    return (
        <div>
            {state.nbCookie === 0 ? (
                <p className="nbCookie-title">0 cookie</p>
            ) : (
                <>
                    <p className="nbCookie-title">
                        {
                            <CountUp
                                separator={state.nbCookie > 1e6 ? "." : " "}
                                preserveValue={true}
                                end={parseInt(formatNumber(state.nbCookie))}
                                suffix={` ${getUnit(state.nbCookie)}`}
                            />
                        }{" "}
                        {state.nbCookie > 1 ? "cookies" : "cookie"}
                    </p>
                </>
            )}
            <p className="nbCookie-subtitle">per click : {state.perClick}</p>
            <p className="nbCookie-subtitle">
                per second : {state.perSecond % 1 > 0 ? commarize(state.perSecond.toFixed(1)) : commarize(state.perSecond)}
            </p>
        </div>
    );
};
