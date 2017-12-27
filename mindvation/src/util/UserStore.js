const userItem = 'Mindvation_user';

export function setUser(user) {
    sessionStorage.setItem(userItem, JSON.stringify(user));
}

export function getUser() {
    let user = sessionStorage.getItem(userItem);
    if (user) return JSON.parse(user);
    return {};
}

export function checkUser(history) {
    if (!getUser().staffInfo || !getUser().staffInfo.id) {
        history.push('/login')
    }
}

export function removeUser() {
    sessionStorage.removeItem(userItem);
}

export function getStaffId() {
    return getUser().staffInfo.id;
}