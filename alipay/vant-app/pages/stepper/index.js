import createPage from "../../common/page";
import Toast from "../../dist/toast/toast";
createPage({
    onChange(event) {
        Toast(`change: ${event.detail}`);
    }
});
