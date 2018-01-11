import { Icon } from 'antd';
import { AssessmentStatus } from '../../../utils/constants'
export const PageConfig = {
  name: 'test页',
  path: 'table-test',
  tableColumns: [{
    title: '序号',
    dataIndex: 'id'
  }, {
    title: '订单号',
    dataIndex: 'ordernum'
  }, {
    title: '评估人员',
    dataIndex: 'assessmentname'
  }, {
    title: '评估价格（元）',
    dataIndex: 'assessmentprice'
  }, {
    title: '创建时间',
    dataIndex: 'createtime'
  }, {
    title: '状态',
    dataIndex: 'status',
    // render: (text, record, index) => {
    //   if (text == 1) {
    //     return (<Icon type="check-circle" style={{ color: '#52c41a' }} />);
    //   } else {
    //     return (<Icon type="close-circle" style={{ color: '#f5222d' }} />);
    //   }
    // }
  },],
  searchForms: [{
    formType: 'input',
    disabled: false,
    isRequired: false,
    key: 'ordernum',
    label: '订单号',
    placeholder: '订单号'
  }, {
    formType: 'input',
    disabled: false,
    isRequired: false,
    key: 'channelname',
    label: '评估人员',
    placeholder: '评估人员'
  }, {
    formType: 'select',
    disabled: false,
    isRequired: false,
    key: 'cooperationstatus',
    label: '评估状态',
    placeholder: '评估状态',
    dataType: 'static',
    selectOptions: AssessmentStatus,
    popupContainer: 'scorllArea'

  }, {
    formType: 'rangePicker',
    disabled: false,
    isRequired: false,
    key: 'createtime',
    label: '创建时间',
    placeholder: '请选择日期',
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
      value: '直营'
    }, {
      text: '非直营',
      value: '非直营'
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
    action: 'http://localhost:1337/192.168.3.15:7001/form',
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