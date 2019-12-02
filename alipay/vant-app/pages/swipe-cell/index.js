import createPage from "../../common/page";
import Dialog from "../../dist/dialog/dialog";
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
