const _tt = require("../../__antmove/api/index.js")(tt);
function Behavior(behavior) {
    behavior.$id = Number(new Date()) + String(Math.random()).substring(2, 7);
    return behavior;
}

export const basic = Behavior({
    methods: {
        $emit(...args) {
            this.triggerEvent(...args);
        },

        getRect(selector, all) {
            return new Promise(resolve => {
                let res = _tt.createSelectorQuery();

                res.in(this)
                    [all ? "selectAll" : "select"](selector)
                    .boundingClientRect(rect => {
                        if (all && Array.isArray(rect) && rect.length) {
                            if (rect[0] && Array.isArray(rect[0])) {
                                resolve(rect[0]);
                            } else {
                                resolve(rect);
                            }
                        }

                        if (!all && rect) {
                            if (rect[0] && Array.isArray(rect[0])) {
                                resolve(rect[0]);
                            } else {
                                resolve(rect);
                            }
                        }
                    })
                    .exec();
            });
        }
    }
});
