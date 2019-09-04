import createPage from '../../common/page';
import Toast from '../../dist/toast/toast';

createPage({
  onClickButton() {
    Toast('点击按钮');
  },
  onClickLink() {
    Toast('修改地址');
  }
});
