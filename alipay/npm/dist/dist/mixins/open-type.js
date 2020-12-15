function Behavior(behavior) {
    behavior.$id = Number(new Date()) + String(Math.random()).substring(2, 7);
    return behavior;
} // @ts-nocheck

export const openType = Behavior({
    properties: {
        openType: String
    },
    methods: {
        bindGetUserInfo(event) {
            this.$emit("getuserinfo", event.detail);
        },

        bindContact(event) {
            this.$emit("contact", event.detail);
        },

        bindGetPhoneNumber(event) {
            this.$emit("getphonenumber", event.detail);
        },

        bindError(event) {
            this.$emit("error", event.detail);
        },

        bindLaunchApp(event) {
            this.$emit("launchapp", event.detail);
        },

        bindOpenSetting(event) {
            this.$emit("opensetting", event.detail);
        }
    }
});
