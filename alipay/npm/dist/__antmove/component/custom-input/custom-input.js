"use strict";

var processDataSet = require('../utils/processDataSet');

Component({
  props: {
    value: '',
    type: '',
    password: false,
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: '',
    disabled: false,
    maxlength: 140,
    focus: false,
    confirmType: 'done',
    confirmHold: false,
    cursor: 0,
    selectionStart: -1,
    selectionEnd: -1,
    name: '',
    onInput: function onInput() {},
    onFocus: function onFocus() {},
    onBlur: function onBlur() {},
    onConfirm: function onConfirm() {},
    onTap: function onTap() {},
    catchTap: function catchTap() {}
  },
  methods: {
    inputHandler: function inputHandler(e) {
      if (this.props.onInput) {
        var tapEvent = processDataSet(e, this.props);
        this.props.onInput(tapEvent);
      }
    },
    focusHandler: function focusHandler(e) {
      if (this.props.onFocus) {
        var tapEvent = processDataSet(e, this.props);
        this.props.onFocus(tapEvent);
      }
    },
    blurHandler: function blurHandler(e) {
      if (this.props.onBlur) {
        var tapEvent = processDataSet(e, this.props);
        this.props.onBlur(tapEvent);
      }
    },
    bindconfirmHandler: function bindconfirmHandler(e) {
      if (this.props.onConfirm) {
        var tapEvent = processDataSet(e, this.props);
        this.props.onConfirm(tapEvent);
      }
    },
    tapHandler: function tapHandler(e) {
      var tapEvent = processDataSet(e, this.props);
      this.props.onTap && this.props.onTap(tapEvent);
    },
    catchtapHandler: function catchtapHandler(e) {
      var tapEvent = processDataSet(e, this.props);
      this.props.catchTap && this.props.catchTap(tapEvent);
    }
  }
});