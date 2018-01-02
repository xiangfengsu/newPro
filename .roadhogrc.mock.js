import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { imgMap } from './mock/utils';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
    // 支持值为 Object 和 Array
    'GET /api/currentUser': {
        $desc: "获取当前用户接口",
        $params: {
            pageSize: {
                desc: '分页',
                exp: 2,
            },
        },
        $body: {
            name: 'Serati Ma',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            userid: '00000001',
            notifyCount: 12,
        },
    },
    // GET POST 可省略
    'GET /api/users': [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }],
    'GET /api/project/notice': getNotice,
    'GET /api/activities': getActivities,
    'GET /api/rule': getRule,
    'POST /api/rule': {
        $params: {
            pageSize: {
                desc: '分页',
                exp: 2,
            },
        },
        $body: postRule,
    },
    'POST /api/forms': (req, res) => {
        res.send({ message: 'Ok' });
    },
    'GET /api/tags': mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
    }),
    'GET /api/fake_list': getFakeList,
    'GET /api/fake_chart_data': getFakeChartData,
    'GET /api/profile/basic': getProfileBasicData,
    'GET /api/profile/advanced': getProfileAdvancedData,
    'POST /api/login/account': (req, res) => {
        const { password, userName, type } = req.body;
        res.send({
            status: password === '888888' && userName === 'admin' ? 'ok' : 'error',
            type,
        });
    },
    'POST /api/register': (req, res) => {
        res.send({ status: 'ok' });
    },
    'GET /api/notices': getNotices,
    'GET /api/500': (req, res) => {
        res.status(500).send({
            "timestamp": 1513932555104,
            "status": 500,
            "error": "error",
            "message": "error",
            "path": "/base/category/list"
        });
    },
    'GET /api/404': (req, res) => {
        res.status(404).send({
            "timestamp": 1513932643431,
            "status": 404,
            "error": "Not Found",
            "message": "No message available",
            "path": "/base/category/list/2121212"
        });
    },
    'GET /api/403': (req, res) => {
        res.status(403).send({
            "timestamp": 1513932555104,
            "status": 403,
            "error": "Unauthorized",
            "message": "Unauthorized",
            "path": "/base/category/list"
        });
    },
    'GET /api/selectLists': {
        status: 200,
        body: [{
            key: 'select1',
            value: 'select1'
        }, {
            key: 'select2',
            value: 'select2'
        }, {
            key: 'select3',
            value: 'select3'
        }],
        errorMessage: ''
    },
    'GET /api/selectLists2': {
        status: 200,
        body: [{
            text: '广告',
            value: '广告'
        }, {
            text: '网络',
            value: '网络'
        }, {
            text: '中介',
            value: '中介'
        }, {
            text: '其他',
            value: '其他'
        }],
        errorMessage: ''
    },
    'GET /api/selectLists3': {
        status: 200,
        body: [{
            key: 'test31',
            value: 'test31'
        }, {
            key: 'test32',
            value: 'test32'
        }, {
            key: 'test33',
            value: 'test33'
        }],
        errorMessage: ''
    },
};
const mockFileLists = ['channel.js'];
require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function (file) {
    if (mockFileLists.indexOf(file) !== -1) {
        Object.assign(proxy, require('./mock/' + file))
    }

})
export default noProxy ? {} : delay(proxy, 1000);
