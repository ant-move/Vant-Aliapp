my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/dist/goods-action/index"
    }
});
import { VantComponent } from "../common/component";
import { safeArea } from "../mixins/safe-area";
VantComponent({
    mixins: [safeArea()]
});
