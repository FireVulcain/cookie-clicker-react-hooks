import React, { useContext } from "react";

import ReactTooltip from "react-tooltip";
//context
import { GlobalContext } from "./../../context/GlobalState";

export const Upgrades = () => {
    const { state, buyUpgrade, buyUpgradeCursors } = useContext(GlobalContext);

    const handleBuyUpgrade = (upgradeItemType, upgradeProperties) => {
        if (state.nbCookie < upgradeProperties.basePrice) return;

        upgradeProperties.isActivate = true;

        if (upgradeItemType === "cursors") {
            buyUpgradeCursors(upgradeProperties);
        }
        buyUpgrade(upgradeItemType, upgradeProperties);
    };
    return (
        <div className="upgrades">
            {Object.entries(state.upgrades).map((item) => {
                return item[1].map((upgrade, key) => {
                    if (upgrade.isUnlockable && !upgrade.isActivate) {
                        return (
                            <div key={key}>
                                <div
                                    data-tip
                                    data-for={upgrade.iconName + upgrade.id}
                                    onClick={() => handleBuyUpgrade(item[0], item[1][key])}
                                    className={"upgrade-info upgrade-" + item[0]}
                                >
                                    <img src={require("./../../assets/upgrades/" + upgrade.iconName + ".png")} alt={upgrade.iconName} />
                                </div>
                                <ReactTooltip place="bottom" id={upgrade.iconName + upgrade.id} class="tooltip-upgrade" type="dark" effect="solid">
                                    <div className="header-tooltip">
                                        <img src={require("./../../assets/upgrades/" + upgrade.iconName + ".png")} alt={upgrade.iconName} />
                                        <div>
                                            <p className="title">{upgrade.title}</p>
                                            <p className="price">{upgrade.basePrice}</p>
                                        </div>
                                    </div>
                                    <p className="description">{upgrade.description}</p>
                                </ReactTooltip>
                            </div>
                        );
                    }
                    return null;
                });
            })}
        </div>
    );
};
