import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';
import './index.css';
import 'simditor/styles/simditor.css';
import './components/common/common.css';
import App from './App.js';
import {Provider} from 'react-redux';
import zh_CN from './res/language/zh_CN';
import en_US from './res/language/en_US';
import {IntlProvider, addLocaleData} from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import 'classlist-polyfill';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

const store = configureStore();

const chooseLocale = () => {
    switch (navigator.language.split('-')[0]) {
        case 'en':
            return en_US;
        case 'zh':
            return zh_CN;
        default:
            return en_US;
    }
};

const chooseLocaleForAntd = () => {
    switch (navigator.language.split('-')[0]) {
        case 'en':
            moment.locale('en');
            return enUS;
        case 'zh':
            moment.locale('zh-cn');
            return zhCN;
        default:
            moment.locale('en');
            return enUS;
    }
};

addLocaleData([...en, ...zh]);

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider
            locale={navigator.language}
            messages={chooseLocale()}
        >
            <LocaleProvider locale={chooseLocaleForAntd()}>
                <App/>
            </LocaleProvider>
        </IntlProvider>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

