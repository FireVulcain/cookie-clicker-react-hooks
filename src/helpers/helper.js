export function commarize(number) {
    let min = 1e6;

    if (number >= min) {
        let units = ["million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion"];

        let order = Math.floor(Math.log(number) / Math.log(1000));

        let unitname = units[order - 2];
        let num = number / 1000 ** order;

        return num.toFixed(3) + " " + unitname;
    }
    return number.toLocaleString();
}

export function formatNumber(number) {
    let min = 1e6;

    if (number >= min) {
        let order = Math.floor(Math.log(number) / Math.log(1000));
        let num = number / 1000 ** (order - 1);

        return num.toFixed(0);
    }
    return number;
}

export function getUnit(number) {
    let min = 1e6;

    if (number >= min) {
        let units = ["million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion"];

        let order = Math.floor(Math.log(number) / Math.log(1000));

        let unitname = units[order - 2];

        return unitname;
    }
    return "";
}
