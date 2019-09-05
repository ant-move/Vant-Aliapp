import list from '../../config';
import createPage from '../../common/page';

createPage({
  data: {
    list,
    activeName: []
  },

  onChangeCollapse(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  onClick(event) {
    const { switchTab, url } = event.currentTarget.dataset;
    if (switchTab) {
      wx.switchTab({ url });
    }
  }
});
