'use strict';

const qs = require('qs');
const mockjs = require('mockjs');
const jsonQuery = require('json-query');
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
  return currentdate;
}
const uniqueFileds = [];
let helper = {};
// 数据持久
let tableListSys_assessmentReviewData = {};
if (!global.tableListSys_assessmentReviewData) {
  const data = mockjs.mock({
    'data|50': [{
      'id|+1': 1,
      'ordernum|+1': 1001,
      'assessmentname|1': '@cname()',
      'assessmentprice|60000-150000': 70000,
      'status|1': ['已评估', '已检测', '未评估'],
      'createtime|1': '@datetime("2017-12-dd")',
      'description|1': '@csentence'


    }],
    page: {
      total: 50,
      current: 1
    }
  });
  tableListSys_assessmentReviewData = data;
  global.tableListSys_assessmentReviewData = tableListSys_assessmentReviewData;
} else {
  tableListSys_assessmentReviewData = global.tableListSys_assessmentReviewData;
}
module.exports = {
  'GET /api/sys_assessmentReview'(req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize - 0 || 10;
    const currentPage = page.page - 0 || 1;
    let data;
    let newPage;
    if (page[uniqueFileds[0]] || page[uniqueFileds[1]]) {
      let queryKey = '';
      let queryValue = '';
      if (page[uniqueFileds[0]]) {
        queryKey = uniqueFileds[0];
        queryValue = page[uniqueFileds[0]];
      } else {
        queryKey = uniqueFileds[1];
        queryValue = page[uniqueFileds[1]];
      }
      let queryData = jsonQuery(`data[${queryKey}=${queryValue}]`, {
        data: tableListSys_assessmentReviewData
      }).value;
      let resultArray = [];
      if (queryData) {
        resultArray.push(queryData);
      }
      data = resultArray.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      newPage = {
        current: currentPage * 1,
        total: resultArray.length
      };
    } else {
      let keys = [];
      let flag = false;
      for (let o in page) {
        if (page.hasOwnProperty(o) && page[o] && o !== 'page' && o !== 'pageSize') {
          if (!flag) { // 判断如果是第一个参数，就加上一个*（表示查询全部，这个*号只能加一次，否则查询失败）
            // if (o.indexOf('time') > -1) {
            //     helper = {
            //         timeFilter: function (input, arg) {
            //             const realTime = new Date().setTime(new Date(input));
            //             const rangeTimeArray = arg.split('~');
            //             const rangeStart = new Date().setTime(new Date(rangeTimeArray[0]));
            //             const rangeEnd = new Date().setTime(new Date(rangeTimeArray[1]));
            //             return realTime >= rangeStart && realTime <= rangeEnd;
            //         }
            //     }
            //     keys.push(`*${o}:timeFilter(${page[o]})`);
            // } else {
            //     keys.push(`*${o}=${page[o] || ''}`);
            // }
            keys.push(`*${o}=${page[o] || ''}`);

            flag = true;
          } else {
            keys.push(`${o}=${page[o] || ''}`);
          }
        }
      }
      if (keys.length > 0) {
        const queryKeys = keys.join('&');
        let queryData = jsonQuery(`data[${queryKeys}]`, {
          data: tableListSys_assessmentReviewData,
          locals: helper
        }).value;
        data = queryData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        newPage = {
          current: currentPage * 1,
          total: queryData.length
        };
      } else {
        data = tableListSys_assessmentReviewData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        tableListSys_assessmentReviewData.page.current = currentPage * 1;
        newPage = {
          current: tableListSys_assessmentReviewData.page.current,
          total: tableListSys_assessmentReviewData.page.total
        };
        // console.log('newPage',newPage)
      }
    }
    res.json({
      status: 200,
      body: {
        list: data,
        pagination: newPage
      },
      errorMes: ''

    });

  },
  'POST /api/sys_assessmentReview'(req, res) {
    const newData = qs.parse(req.body);
    const pageSize = 10;
    const currentPage = 1;
    let data;
    let newPage;
    newData.id = tableListSys_assessmentReviewData.data.length + 1;
    newData.createtime = mockjs.mock('@datetime("2017-12-dd")');
    newData.city = mockjs.mock('@city()');
    tableListSys_assessmentReviewData.data.unshift(newData);

    data = tableListSys_assessmentReviewData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    tableListSys_assessmentReviewData.page.current = 1;
    tableListSys_assessmentReviewData.page.total = tableListSys_assessmentReviewData.data.length;
    newPage = {
      current: 1,
      total: tableListSys_assessmentReviewData.page.total
    };
    global.tableListSys_assessmentReviewData = tableListSys_assessmentReviewData;
    res.status(201);
    res.json({
      status: 201,
      body: {
        list: data,
        pagination: newPage
      },
      errorMes: ''
    });
  },
  'DELETE /api/sys_assessmentReview'(req, res) {
    const deleteItem = qs.parse(req.body);
    console.log('deleteItem', deleteItem);
    tableListSys_assessmentReviewData.data = tableListSys_assessmentReviewData.data.filter(function (item) {
      if (item.id == deleteItem.id) {
        return false;
      }
      return true;
    });

    tableListSys_assessmentReviewData.page.total = tableListSys_assessmentReviewData.data.length;

    global.tableListSys_assessmentReviewData = tableListSys_assessmentReviewData;
    // res.status(204)
    res.json({
      status: 204,
      body: {},
      errorMes: ''
    });
  },
  'PUT /api/sys_assessmentReview'(req, res) {
    // res.status(403).send({
    //     "timestamp": new Date().getTime(),
    //     "status": 403,
    //     "error": "Unauthorized",
    //     "message": "Unauthorized",
    //     "path": "/generaltable/channel"
    // });
    const editItem = qs.parse(req.body);
    console.log('editItem', editItem)
    tableListSys_assessmentReviewData.data = tableListSys_assessmentReviewData.data.map(function (item) {
      if (item.id == editItem.id) {
        return {
          ...item,
          ...editItem
        };
      }
      return item;
    });

    global.tableListSys_assessmentReviewData = tableListSys_assessmentReviewData;
    res.status(202)
    res.json({
      status: 202,
      body: editItem,
      errorMes: ''

    });
  }
};