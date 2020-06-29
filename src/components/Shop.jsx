import React from "react";

import { Upgrades } from "./Shop/Upgrades";
import { Items } from "./Shop/Items";

import Scrollbar from "react-scrollbars-custom";

export const Shop = () => {
    return (
        <div className="shop">
            <h2 className="shop-title">Store</h2>
            <Scrollbar style={{ height: "100vh" }}>
                <Upgrades />
                <Items />
            </Scrollbar>
        </div>
    );
};
