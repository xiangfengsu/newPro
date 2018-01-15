import { Icon } from 'antd';
export const PageConfig = {
  name: 'test页',
  path: 'table-test',
  tableColumns: [{
    title: '序号',
    dataIndex: 'id'
  }, {
    title: '渠道名称',
    dataIndex: 'channelname'
  }, {
    title: '合作状态',
    dataIndex: 'cooperationstatus'
  }, {
    title: '渠道类型',
    dataIndex: 'channeltype'
  }, {
    title: '渠道来源',
    dataIndex: 'channelsource'
  }, {
    title: '地区名称',
    dataIndex: 'city'
  }, {
    title: '渠道性质',
    dataIndex: 'channelnature',
    render: (text, record, index) => {
      if (text == 0) {
        return '直营';
      } else {
        return '非直营';
      }
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    render: (text, record, index) => {
      if (text == 1) {
        return (<Icon type="check-circle" style={{ color: '#52c41a' }} />);
      } else {
        return (<Icon type="close-circle" style={{ color: '#f5222d' }} />);
      }
    }
  }, {
    title: '创建时间',
    dataIndex: 'createtime'
  },],
  searchForms: [{
    formType: 'input',
    disabled: false,
    isRequired: false,
    key: 'channelname',
    label: '渠道名称',
    placeholder: '渠道名称'
  }, {
    formType: 'select',
    disabled: false,
    isRequired: false,
    key: 'cooperationstatus',
    label: '合作状态',
    placeholder: '合作状态',
    dataType: 'static',
    selectOptions: [{
      text: '直营',
      value: '直营'
    }, {
      text: '小商户',
      value: '小商户'
    }],
    popupContainer: 'scorllArea'

  }, {
    formType: 'selectDynamic',
    disabled: false,
    isRequired: false,
    key: 'channeltype',
    label: '渠道类型',
    placeholder: '渠道类型',
    dataType: 'dynamic',
    dictionaryKey: 'selectLists2',
    fetchUrl: '/api/selectLists2'
  }, {
    formType: 'select',
    disabled: false,
    isRequired: false,
    key: 'channelsource',
    label: '渠道来源',
    placeholder: '渠道来源',
    dataType: 'static',
    selectOptions: [{
      text: '官网',
      value: '官网'
    }, {
      text: '百度',
      value: '百度'
    }, {
      text: '400介绍',
      value: '400介绍'
    }, {
      text: '老客户',
      value: '老客户'
    }],
    popupContainer: 'scorllArea'

  }, {
    formType: 'select',
    disabled: false,
    isRequired: false,
    key: 'channelnature',
    label: '渠道性质',
    placeholder: '渠道性质',
    dataType: 'static',
    selectOptions: [{
      text: '直营',
      value: 0
    }, {
      text: '非直营',
      value: 1
    }],
    popupContainer: 'scorllArea'


  }, {
    formType: 'datePicker',
    disabled: false,
    isRequired: false,
    key: 'createtime',
    label: '创建时间',
    placeholder: '请选择日期',
    popupContainer: 'scorllArea'
  }, {
    formType: 'select',
    disabled: false,
    isRequired: false,
    key: 'status',
    label: '状态',
    placeholder: '状态',
    dataType: 'static',
    selectOptions: [{
      text: '通过',
      value: 1
    }, {
      text: '拒绝',
      value: 0
    }],
    popupContainer: 'scorllArea'

  }
  ],
  detailFormItems: [{
    formType: 'input',
    disabled: false,
    isRequired: true,
    key: 'channelname',
    label: '渠道名称',
    placeholder: '渠道名称',
    colSpan: 8
  }, {
    formType: 'select',
    disabled: false,
    isRequired: true,
    key: 'cooperationstatus',
    label: '合作状态',
    placeholder: '合作状态',
    dataType: 'static',
    selectOptions: [{
      text: '直营',
      value: '直营'
    }, {
      text: '小商户',
      value: '小商户'
    }],
    colSpan: 8

  }, {
    formType: 'select',
    disabled: false,
    isRequired: true,
    key: 'channeltype',
    label: '渠道类型',
    placeholder: '渠道类型',
    dataType: 'static',
    selectOptions: [{
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
    colSpan: 8

  }, {
    formType: 'select',
    disabled: false,
    isRequired: true,
    key: 'channelsource',
    label: '渠道来源',
    placeholder: '渠道来源',
    dataType: 'static',
    selectOptions: [{
      text: '官网',
      value: '官网'
    }, {
      text: '百度',
      value: '百度'
    }, {
      text: '400介绍',
      value: '400介绍'
    }, {
      text: '老客户',
      value: '老客户'
    }],
    colSpan: 8

  }, {
    formType: 'select',
    disabled: false,
    isRequired: true,
    key: 'channelnature',
    label: '渠道性质',
    placeholder: '渠道性质',
    dataType: 'static',
    selectOptions: [{
      text: '直营',
      value: 0
    }, {
      text: '非直营',
      value: 1
    }],
    colSpan: 8

  }, {
    formType: 'select',
    disabled: false,
    isRequired: true,
    key: 'status',
    label: '状态',
    placeholder: '状态',
    dataType: 'static',
    selectOptions: [{
      text: '通过',
      value: 1
    }, {
      text: '拒绝',
      value: 0
    }],
    colSpan: 8

  },
  {
    formType: 'inputMoney',
    disabled: false,
    isRequired: false,
    pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
    maxLen: 100000,
    errorText: '请输入合法金额数字',
    key: 'money',
    label: 'money',
    placeholder: 'money',
    colSpan: 8
  },
  {
    formType: 'textArea',
    disabled: false,
    isRequired: true,
    key: 'description',
    label: '备注',
    placeholder: '备注',
    autosize: { minRows: 5, maxRows: 10 },
    colSpan: 24
  },
  {
    formType: 'upload',
    disabled: false,
    isRequired: true,
    key: 'uploadImg',
    label: '上传图片',
    placeholder: '上传图片',
    action: 'http://192.168.3.15:7001/form',
    multiple: true,
    acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'picture-card', // 1:text  2:picture 3:picture-card
    maxFileSize: 1,// 单位是M
    maxLength: 10,
    colSpan: 24
  },

    // {
    //     formType: 'selectDynamic',
    //     disabled: false,
    //     isRequired: false,
    //     key: 'test1',
    //     label: '异步sele1',
    //     placeholder: 'selectDynamic1',
    //     dataType: 'dynamic',
    //     dictionaryKey: 'selectLists2',
    //     fetchUrl: '/api/selectLists2'

    // },
  ],
};
// export const FormItems = [{
//   title: '申请类',
//   items: [{
//     formType: 'upload',
//     disabled: false,
//     isRequired: false,
//     key: 'car1001',
//     label: '借款人身份证正面',
//     placeholder: '借款人身份证正面',
// action: 'http://192.168.3.15:7001/form',
// multiple: true,
// acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
// listType: 'picture-card', // 1:text  2:picture 3:picture-card
// maxFileSize: 1,// 单位是M
// maxLength: 10,
// colSpan: 24
//   }],
// }];
export const FormItems = [{
  title: '申请类',
  items: [{
    formType: 'upload',
    disabled: false,
    isRequired: false,
    key: 'car1001',
    label: '借款人身份证正面',
    placeholder: '借款人身份证正面',
    action: 'http://192.168.3.15:7001/form',
    multiple: true,
    acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'picture-card', // 1:text  2:picture 3:picture-card
    maxFileSize: 1,// 单位是M
    maxLength: 10,
    colSpan: 24
  }, {
    formType: 'upload',
    disabled: false,
    isRequired: false,
    key: 'car1002',
    label: '借款人身份证背面',
    placeholder: '借款人身份证背面',
    action: 'http://192.168.3.15:7001/form',
    multiple: true,
    acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'picture-card', // 1:text  2:picture 3:picture-card
    maxFileSize: 1,// 单位是M
    maxLength: 10,
    colSpan: 24
  }, {
    formType: 'upload',
    disabled: false,
    isRequired: false,
    key: 'car1003',
    label: '借款人手持身份证照片',
    placeholder: '借款人手持身份证照片',
    action: 'http://192.168.3.15:7001/form',
    multiple: true,
    acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'picture-card', // 1:text  2:picture 3:picture-card
    maxFileSize: 1,// 单位是M
    maxLength: 10,
    colSpan: 24
  }, {
    formType: 'upload',
    disabled: false,
    isRequired: false,
    key: 'car1004',
    label: '借款申请表',
    placeholder: '借款申请表',
    action: 'http://192.168.3.15:7001/form',
    multiple: true,
    acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'picture-card', // 1:text  2:picture 3:picture-card
    maxFileSize: 1,// 单位是M
    maxLength: 10,
    colSpan: 24
  }, {
    formType: 'upload',
    disabled: false,
    isRequired: false,
    key: 'car1005',
    label: '人行征信查询授权书',
    placeholder: '人行征信查询授权书',
    action: 'http://192.168.3.15:7001/form',
    multiple: true,
    acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'picture-card', // 1:text  2:picture 3:picture-card
    maxFileSize: 1,// 单位是M
    maxLength: 10,
    colSpan: 24
  }, {
    formType: 'upload',
    disabled: false,
    isRequired: false,
    key: 'car1006',
    label: '借款人手持申请表和征信查询授权书',
    placeholder: '借款人手持申请表和征信查询授权书',
    action: 'http://192.168.3.15:7001/form',
    multiple: true,
    acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'picture-card', // 1:text  2:picture 3:picture-card
    maxFileSize: 1,// 单位是M
    maxLength: 10,
    colSpan: 24
  }, {
    formType: 'upload',
    disabled: false,
    isRequired: false,
    key: 'car1007',
    label: '配偶提供证件照（如有）',
    placeholder: '配偶提供证件照（如有）',
    action: 'http://192.168.3.15:7001/form',
    multiple: true,
    acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'picture-card', // 1:text  2:picture 3:picture-card
    maxFileSize: 1,// 单位是M
    maxLength: 10,
    colSpan: 24
  }],
}];