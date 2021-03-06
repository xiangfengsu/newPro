export const menuData = [{
  name: '表单类型',
  icon: 'book',
  path: 'formItemType',
}, {
  name: '评估管理',
  icon: 'book',
  path: 'assessment',
  children: [{
    name: '评估复核管理',
    path: 'assessment-review',
  }, {
    name: '评估复核详情页',
    path: 'assessment-detail/:id',
    hideInMenu: true
  }],
},
{
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '分析页',
    path: 'analysis',
  }, {
    name: '监控页',
    path: 'monitor',
  }, {
    name: '工作台',
    path: 'workplace',
    // hideInMenu: true,
  }],
},
// {
//   name: '表单页',
//   icon: 'form',
//   path: 'form',
//   children: [{
//     name: '基础表单',
//     path: 'basic-form',
//   }, {
//     name: '分步表单',
//     path: 'step-form',
//   }, {
//     name: '高级表单',
//     path: 'advanced-form',
//   }],
// },
//  {
//   name: '列表页',
//   icon: 'table',
//   path: 'list',
//   children: [{
//     name: '查询表格',
//     path: 'table-list',
//   }, {
//     name: '标准列表',
//     path: 'basic-list',
//   }, {
//     name: '卡片列表',
//     path: 'card-list',
//   }, {
//     name: '搜索列表',
//     path: 'search',
//     children: [{
//       name: '搜索列表（文章）',
//       path: 'articles',
//     }, {
//       name: '搜索列表（项目）',
//       path: 'projects',
//     }, {
//       name: '搜索列表（应用）',
//       path: 'applications',
//     }],
//   }],
// }, {
//   name: '详情页',
//   icon: 'profile',
//   path: 'profile',
//   children: [{
//     name: '基础详情页',
//     path: 'basic',
//   }, {
//     name: '高级详情页',
//     path: 'advanced',
//   }],
// }, {
//   name: '结果页',
//   icon: 'check-circle-o',
//   path: 'result',
//   children: [{
//     name: '成功',
//     path: 'success',
//   }, {
//     name: '失败',
//     path: 'fail',
//   }],
// },
{
  name: '通用查询页',
  icon: 'search',
  path: 'generaltable',
  children: [{
    name: '渠道管理',
    path: 'channel'
  }]

},
  // {
  //   name: '异常页',
  //   icon: 'warning',
  //   path: 'exception',
  //   hideInMenu: true,
  //   children: [{
  //     name: '403',
  //     path: '403',
  //   }, {
  //     name: '404',
  //     path: '404',
  //   }, {
  //     name: '500',
  //     path: '500',
  //   }, {
  //     name: '触发异常',
  //     path: 'trigger',
  //   }],
  // }
];

function formatter(data, parentPath = '') {
  const list = [];
  data.forEach((item) => {
    if (item.children) {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
        children: formatter(item.children, `${parentPath}${item.path}/`),
      });
    } else {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
      });
    }
  });
  return list;
}

export const getMenuData = () => formatter(menuData);

