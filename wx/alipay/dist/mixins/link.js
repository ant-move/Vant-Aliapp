const _my = require("../../__antmove/api/index.js")(my);
function Behavior(behavior) {
    behavior.$id = Number(new Date()) + String(Math.random()).substring(2, 7);
    return behavior;
}

export const link = Behavior({
    properties: {
        url: String,
        linkType: {
            type: String,
            value: "navigateTo"
        }
    },
    methods: {
        jumpLink(urlKey = "url") {
            const url = this.data[urlKey];

            if (url) {
                _my[this.data.linkType]({
                    url
                });
            }
        }
    }
});
