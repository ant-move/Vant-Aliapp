"use strict";

var utils = require('../../api/utils');

var processDataSet = require('../utils/processDataSet');

Component({
  data: {},
  props: {
    hoverClass: 'navigator-hover',
    hoverStartTime: 50,
    hoverStayTime: 600,
    url: '',
    className: '',
    openType: '',
    path: ''
  },
  didMount: function didMount() {
    this.props.appId && utils.warn( // `支付宝navigator组件不支持 appId 属性!`
    '请修改对应支付宝小程序id');
  },
  methods: {
    navHandler: function navHandler(e) {
      var _this = this;

      // 支付宝navigator不支持ontap事件
      var tapEvent = processDataSet(e, this.props);
      this.props.onTap && this.props.onTap(tapEvent);

      if (this.props.appId && this.props.appId.toString()) {
        my.navigateToMiniProgram({
          appId: this.props.appId.toString(),
          path: this.props.path,
          extraData: this.props.extraData || {},
          success: function success(res) {
            _this.props.onSuccess && _this.props.onSuccess(res);
          },
          fail: function fail(res) {
            _this.props.onFail && _this.props.onFail(res);
          },
          complete: function complete(res) {
            _this.props.onComplete && _this.props.onComplete(res);
          }
        });
      }
    }
  }
});