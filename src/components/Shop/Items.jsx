import React, { useContext } from "react";
import { commarize } from "./../../helpers/helper";

//context
import { GlobalContext } from "./../../context/GlobalState";

export const Items = () => {
    const { state, buyItem, checkForUnlockableUpgrades, checkDiscovered } = useContext(GlobalContext);

    const handleBuyItem = (item) => {
        if (state.nbCookie < state.items[item].price) return;

        checkDiscovered(item);
        handleUnlockableUpgrades(item);
        buyItem(item);
    };

    const handleUnlockableUpgrades = (item) => {
        if (!state.upgrades[item]) return;

        let nbItem = state.items[item].nbItem + 1;
        const found = state.upgrades[item].filter((upgrade) => upgrade.condition === nbItem);

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
            {Object.entries(state.items).map((item, key) => {
                const priceClass = state.nbCookie >= state.items[item[0]].price ? "" : "noMoney";
                const itemClass = item[0] + " discovered-" + item[1].discovered + " item " + priceClass;
                return (
                    <div onClick={() => handleBuyItem(item[0])} className={itemClass} key={key}>
                        <div className="icon"></div>
                        <div className="data-item">
                            <p className="item-name">{item[1].name}</p>
                            <p className="price"> {commarize(item[1].price)}</p>
                        </div>
                        {item[1].nbItem > 0 && <p className="owned">{item[1].nbItem}</p>}
                    </div>
                );
            })}
        </div>
    );
};
