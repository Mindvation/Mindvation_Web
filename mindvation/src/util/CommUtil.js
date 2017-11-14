import {colors} from '../res/data/colorLight';

export const dateFormat = (date, fmt) => {
    let o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

export const isEmpty = (text) => {
    return text === null || text === undefined || text === "";
};

export const getDesc = (options, key) => {
    let desc = "";
    options.some((option) => {
        if (option.value === key) {
            desc = option.text;
            return true
        }
    });
    return desc;
};

export const getOption = (options, key) => {
    let returnOption = {};
    options.some((option) => {
        if (option.value === key) {
            returnOption = option;
            return true
        }
    });
    return returnOption;
};

export const checkCompleted = (mandatoryFile, info) => {
    let flag = true;
    mandatoryFile.some((result) => {
        if (isEmpty(info[result])) {
            flag = false;
            return true;
        }
    });
    return flag;
};

/*export const getRandomColor = () => {
    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
};*/

export const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomStyle = () => {
    const styleCont = 7;
    return Math.floor(Math.random() * styleCont) + 1;
};

function createHexRandom() {
    let num = '';
    for (let i = 0; i <= 6; i++) {
        let tmp = Math.ceil(Math.random() * 15);
        if (tmp > 9) {
            switch (tmp) {
                case(10):
                    num += 'a';
                    break;
                case(11):
                    num += 'b';
                    break;
                case(12):
                    num += 'c';
                    break;
                case(13):
                    num += 'd';
                    break;
                case(14):
                    num += 'e';
                    break;
                case(15):
                    num += 'f';
                    break;
            }
        } else {
            num += tmp;
        }
    }

    return num;
}

export const getTimeAndRandom = () => {
    return createHexRandom() + new Date().getTime();
};

export const getCoordinate = (parts) => {
    if (parts < 1) return [];
    const angle = 360 / parts;
    const radian = 2 * Math.PI / 360;
    const radius = 1000;
    let coordinates = [];
    for (let i = 0; i < parts; i++) {
        coordinates.push({
            x: Math.round(radius * Math.cos(angle * i * radian)),
            y: Math.round(radius * Math.sin(angle * i * radian))
        })
    }
    return coordinates;
};

export const arrOrder = (arr, indicator = 'key') => {
    arr.sort(function orderFunc(a, b) {
        return a[indicator] > b[indicator];
    });
    return arr;
};