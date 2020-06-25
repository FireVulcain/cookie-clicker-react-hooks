export default (state, action) => {
    switch (action.type) {
        case "LOAD_FILE":
            return {
                ...action.payload.state,
            };
        case "INCREMENT_COOKIE":
            return {
                ...state,
                nbCookie: state.nbCookie + state.perClick,
            };
        case "INCREMENT_COOKIE_SECOND":
            return {
                ...state,
                nbCookie: state.nbCookie + state.perSecond,
            };
        case "BUY_ITEM":
            return {
                ...state,
                nbCookie: state.nbCookie - state.items[action.payload].price,
                perSecond: state.perSecond + state.items[action.payload].perSecond,
                items: {
                    ...state.items,
                    [action.payload]: {
                        ...state.items[action.payload],
                        price: Math.ceil(state.items[action.payload].basePrice * 1.15 ** (state.items[action.payload].nbItem + 1)),
                        nbItem: state.items[action.payload].nbItem + 1,
                    },
                },
            };
        case "DISCOVERED_NEXT_ITEM":
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload]: {
                        ...state.items[action.payload],
                        discovered: true,
                    },
                },
            };
        case "UNLOCKABLE_UPGRADES":
            return {
                ...state,
                upgrades: {
                    ...action.payload,
                },
            };
        case "BUY_UPGRADES_CURSORS":
            switch (action.upgradeProperties.bonus) {
                case "twice":
                default:
                    return {
                        ...state,
                        perClick: state.perClick * 2,
                    };
            }
        case "BUY_UPGRADES":
            switch (action.upgradeProperties.bonus) {
                case "twice":
                default:
                    return {
                        ...state,
                        nbCookie: state.nbCookie - action.upgradeProperties.basePrice,
                        perSecond: state.perSecond + state.items[action.upgradeItemType].perSecond * state.items[action.upgradeItemType].nbItem,
                        items: {
                            ...state.items,
                            [action.upgradeItemType]: {
                                ...state.items[action.upgradeItemType],
                                perSecond: state.items[action.upgradeItemType].perSecond * 2,
                            },
                        },
                        upgrades: {
                            ...state.upgrades,
                            [action.upgradeItemType]: [...state.upgrades[action.upgradeItemType]],
                        },
                    };
            }
        default:
            return state;
    }
};
