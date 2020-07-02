import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Datas
import items from "./../data/items";
import upgrades from "./../data/upgrades";

const initialState = {
    bakedCookie: 0,
    nbCookie: 60000000000000000000000000000,
    perSecond: 0,
    perClick: 1,
    items: { ...items },
    upgrades: { ...upgrades },
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function loadFileState(fileState) {
        dispatch({
            type: "LOAD_FILE",
            payload: fileState,
        });
    }

    function incrementCookieOnClick() {
        dispatch({
            type: "INCREMENT_COOKIE",
        });
    }
    function incrementCookiePerSecond() {
        dispatch({
            type: "INCREMENT_COOKIE_SECOND",
        });
    }

    function buyItem(item) {
        dispatch({
            type: "BUY_ITEM",
            payload: item,
        });
    }
    function checkDiscovered(item) {
        let keys = Object.keys(state.items);
        let loc = keys.indexOf(item);

        if (!state.items[keys[loc + 1]].discovered) {
            dispatch({
                type: "DISCOVERED_NEXT_ITEM",
                payload: keys[loc + 1],
            });
        }
    }
    function checkForUnlockableUpgrades(state) {
        dispatch({
            type: "UNLOCKABLE_UPGRADES",
            payload: state,
        });
    }

    function buyUpgrade(upgradeItemType, upgradeProperties) {
        dispatch({
            type: "BUY_UPGRADES",
            upgradeItemType: upgradeItemType,
            upgradeProperties: upgradeProperties,
        });
    }
    function buyUpgradeCursors(upgradeProperties) {
        dispatch({
            type: "BUY_UPGRADES_CURSORS",
            upgradeProperties: upgradeProperties,
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                state,
                incrementCookieOnClick,
                incrementCookiePerSecond,
                loadFileState,
                buyItem,
                checkDiscovered,
                checkForUnlockableUpgrades,
                buyUpgrade,
                buyUpgradeCursors,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
