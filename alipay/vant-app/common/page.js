export default function(options = {}) {
    return Page({
        onShareAppMessage() {
            return {
                title: "Vant Aliapp 组件库演示"
            };
        },

        ...options
    });
}
