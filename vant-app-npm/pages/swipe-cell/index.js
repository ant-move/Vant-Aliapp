import createPage from "vant-aliapp/dist/common/page";
import Dialog from "vant-aliapp/dist/dist/dialog/dialog";
createPage({
    onClose(event) {
        const { position, instance } = event.detail;

        switch (position) {
            case "left":
            case "cell":
                instance.close();
                break;

            case "right":
                Dialog.confirm({
                    message: "确定删除吗？"
                }).then(() => {
                    instance.close();
                });
                break;
        }
    }
});
