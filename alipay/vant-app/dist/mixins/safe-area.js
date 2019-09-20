const _my = require("../../__antmove/api/index.js")(my);
function Behavior(behavior) {
    behavior.$id = Number(new Date()) + String(Math.random()).substring(2, 7);
    return behavior;
}

let cache = null;

function getSafeArea() {
    return new Promise((resolve, reject) => {
        if (cache != null) {
            resolve(cache);
        } else {
            _my.getSystemInfo({
                success: ({ model, screenHeight, statusBarHeight }) => {
                    const iphoneX = /iphone x/i.test(model);
                    const iphoneNew =
                        /iPhone11/i.test(model) && screenHeight === 812;
                    cache = {
                        isIPhoneX: iphoneX || iphoneNew,
                        statusBarHeight
                    };
                    resolve(cache);
                },
                fail: reject
            });
        }
    });
}

export const safeArea = ({
    safeAreaInsetBottom = true,
    safeAreaInsetTop = false
} = {}) =>
    Behavior({
        properties: {
            safeAreaInsetTop: {
                type: Boolean,
                value: safeAreaInsetTop
            },
            safeAreaInsetBottom: {
                type: Boolean,
                value: safeAreaInsetBottom
            }
        },

        created() {
            getSafeArea().then(({ isIPhoneX, statusBarHeight }) => {
                this.set({
                    isIPhoneX,
                    statusBarHeight
                });
            });
        }
    });
