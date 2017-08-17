import createHistory from 'history/createBrowserHistory'

const history = createHistory();

// Get the current location.
const location = history.location;

export default function request(method, url, body) {
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
                    redirect = '/login?message=login&redirect_uri=' + encodeURIComponent(redirect);
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
        });
}

export const get = (url, body) => request('GET', url, body);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);
