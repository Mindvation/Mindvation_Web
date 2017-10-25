import createHistory from 'history/createBrowserHistory';
import errorMsg from '../res/data/errorMessage.json';

const history = createHistory();

// Get the current location.
const location = history.location;

function request(method, url, body) {
    method = method.toUpperCase();
    if (method === 'GET') {
        if (body) {
            let paramsArray = [];
            //拼接参数
            Object.keys(body).forEach(key => paramsArray.push(body[key]))
            url += '/' + paramsArray.join('/')
        }
    } else {
        body = body && JSON.stringify(body);
    }

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Token': sessionStorage.getItem('access_token') || ''
        },
        body
    })
        .then((res) => {
            if (res.status === 401) {
                let redirect = '';
                if (location.pathname !== "/login" && location.pathname !== "/") {
                    redirect = location.pathname + location.search;
                    redirect = '/login?language=login&redirect_uri=' + encodeURIComponent(redirect);
                }

                let url = redirect ? redirect : '/login';
                history.push(url);
                return Promise.reject('Unauthorized.');
            } else {
                const token = res.headers.get('access-token');
                if (token) {
                    sessionStorage.setItem('access_token', token);
                }
                return res.json();
            }
        })
        .then(res => {
            let errorInfo = _respHandle(res);
            return errorInfo ? Promise.reject(errorInfo) : Promise.resolve(res);
        })
        .catch(error => {
            let errorInfo = _errorHandle(error);
            return Promise.reject(errorInfo);
        });
}

function _respHandle(res) {
    if (res.responseCode !== "000") {
        return {
            'responseCode': res.responseCode,
            'message': errorMsg[res.responseCode] ? errorMsg[res.responseCode] : errorMsg.default
        };
    }
    return null;
}

function _errorHandle(error) {
    if (error.message) {
        return {
            'responseCode': 'A001',
            'message': error.message
        }
    }

    return {
        'responseCode': 'A001',
        'message': '系统错误'
    }
}

export const get = (url, body) => request('GET', url, body);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);
