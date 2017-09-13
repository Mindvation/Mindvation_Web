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
    if (text === null || text === undefined || text === "") {
        return true;
    }
    return false;
};

export const updateGobalData = (key, options) => {
    global[key] = global[key] || {};
    Object.assign(global[key], options);
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

export const getRandomColor = () => {
    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
};