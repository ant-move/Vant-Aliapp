import createPage from "vant-aliapp/dist/common/page";
import Toast from "vant-aliapp/dist/dist/toast/toast";
createPage({
    onChange(event) {
        Toast(`change: ${event.detail}`);
    }
});
