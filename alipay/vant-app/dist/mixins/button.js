function Behavior(behavior) {
    behavior.$id = Number(new Date()) + String(Math.random()).substring(2, 7);
    return behavior;
}

export const button = Behavior({
    externalClasses: ["hover-class"],
    properties: {
        id: String,
        lang: {
            type: String,
            value: "en"
        },
        businessId: Number,
        sessionFrom: String,
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean,
        appParameter: String,
        ariaLabel: String
    }
});
