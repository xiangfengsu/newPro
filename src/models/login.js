import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { getCookie, setCookie, delCookie } from '../utils/cookie';
import { encodeHandle, decodeHandle } from '../utils/base64';
import storage from '../utils/storage.js';
export default {
    namespace: 'login',

    state: {
        status: undefined,
        menuData: []
    },

    effects: {
        *login({ payload }, { call, put }) {
            yield put({
                type: 'changeSubmitting',
                payload: true,
            });
            const pathname = payload.from.pathname;
            delete payload.from;
            const response = yield call(fakeAccountLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });

            // Login successfully
            const { status = -1, body } = response;
            if (status === 200) {
                setCookie(encodeHandle('name'), encodeHandle('name'));
                yield put({
                    type: 'updateMenuData',
                    payload: body,
                });

                yield put(routerRedux.push(pathname));
            }
        },
        *logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false,
                },
            });
            delCookie(encodeHandle('name'));
            yield put(routerRedux.push('/user/login'));
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            return {
                ...state,
                status: payload.status,
                type: payload.type,
                submitting: false,
            };
        },
        changeSubmitting(state, { payload }) {
            return {
                ...state,
                submitting: payload,
            };
        },
        updateMenuData(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    },
};
