import React, { useContext, useState } from "react";
import { commarize } from "./../../helpers/helper";

//context
import { GlobalContext } from "./../../context/GlobalState";

export const Items = () => {
    const { state, buyItem, checkForUnlockableUpgrades, checkDiscovered } = useContext(GlobalContext);

    const [bulk, setBulk] = useState({ bulk: 1, multiplication: 1 });
    const [activeBulk, setActiveBulk] = useState(1);

    const handleBuyItem = (item) => {
        if (state.nbCookie < state.items[item].price * bulk.multiplication) return;

        checkDiscovered(item);
        handleUnlockableUpgrades(item);
        buyItem(item, bulk);
    };

    const handleUnlockableUpgrades = (item) => {
        if (!state.upgrades[item]) return;

        let nbItem = state.items[item].nbItem + 1;
        const found = state.upgrades[item].filter((upgrade) => upgrade.condition <= nbItem);

        let stateCopy = Object.assign({}, state.upgrades);

        let keys = stateCopy[item].keys();

        for (const key of keys) {
            if (found.includes(stateCopy[item][key])) {
                stateCopy[item][key].isUnlockable = true;
            }
        }

        checkForUnlockableUpgrades(stateCopy);
    };
    return (
        <div className="items">
            <div className="storeBulk">
                <div
                    className={activeBulk === 1 ? "active-bulk" : ""}
                    onClick={() => {
                        setBulk({ bulk: 1, multiplication: 1 });
                        setActiveBulk(1);
                    }}
                >
                    1
                </div>
                <div
                    className={activeBulk === 10 ? "active-bulk" : ""}
                    onClick={() => {
                        setBulk({ bulk: 10, multiplication: 20.303718238 });
                        setActiveBulk(10);
                    }}
                >
                    10
                </div>
                <div
                    className={activeBulk === 100 ? "active-bulk" : ""}
                    onClick={() => {
                        setBulk({ bulk: 100, multiplication: 7828749.671335256 });
                        setActiveBulk(100);
                    }}
                >
                    100
                </div>
            </div>

            {Object.entries(state.items).map((item, key) => {
                const priceClass = state.nbCookie >= state.items[item[0]].price * bulk.multiplication ? "" : "noMoney";
                const itemClass = item[0] + " discovered-" + item[1].discovered + " item " + priceClass;
                return (
                    <div onClick={() => handleBuyItem(item[0])} className={itemClass} key={key}>
                        <div className="icon"></div>
                        <div className="data-item">
                            <p className="item-name">{item[1].name}</p>
                            <p className="price"> {commarize(item[1].price * bulk.multiplication)}</p>
                        </div>
                        {item[1].nbItem > 0 && <p className="owned">{item[1].nbItem}</p>}
                    </div>
                );
            })}
        </div>
    );
};
