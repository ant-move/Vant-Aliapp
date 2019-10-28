const _Component = require("../../__antmove/component/componentClass.js")(
    "Component"
);
my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "components/demo-block/index"
    }
});

_Component({
    properties: {
        title: String,
        padding: Boolean
    },
    externalClasses: ["custom-class"]
});
