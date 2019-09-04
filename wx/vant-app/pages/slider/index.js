import createPage from '../../common/page';

createPage({
  data: {
    currentValue: 50
  },

  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `当前值：${event.detail}`
    });
  },

  onDrag(event) {
    this.setData({
      currentValue: event.detail.value
    });
  }
});
