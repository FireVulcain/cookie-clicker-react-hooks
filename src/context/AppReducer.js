export default (state, action) => {
    switch (action.type) {
        case "LOAD_FILE":
            return {
                ...action.payload.state,
            };
        case "INCREMENT_COOKIE":
            return {
                ...state,
                bakedCookie: state.bakedCookie + state.perClick,
                nbCookie: state.nbCookie + state.perClick,
            };
        case "INCREMENT_COOKIE_SECOND":
            return {
                ...state,
                bakedCookie: state.bakedCookie + state.perSecond,
                nbCookie: state.nbCookie + state.perSecond,
            };
        case "BUY_ITEM":
            const { item, bulk } = action.payload;

            return {
                ...state,
                nbCookie: state.nbCookie - state.items[item].price * bulk.multiplication,
                perSecond: state.perSecond + state.items[item].perSecond * bulk.bulk,
                items: {
                    ...state.items,
                    [item]: {
                        ...state.items[item],
                        price: Math.ceil(state.items[item].basePrice * 1.15 ** (state.items[item].nbItem + bulk.bulk)),
                        nbItem: state.items[item].nbItem + bulk.bulk,
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
