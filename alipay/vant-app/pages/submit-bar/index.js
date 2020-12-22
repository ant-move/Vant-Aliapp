import Page from "../../common/page";
import Toast from "vant-aliapp/dist/dist/toast/toast";
Page({
  onClickButton() {
    Toast("点击按钮");
  },

  onClickLink() {
    Toast("修改地址");
  },

  antmoveAction: function () {
    //执行时动态赋值，请勿删除
  }
});