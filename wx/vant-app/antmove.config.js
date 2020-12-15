module.exports = {
    "env": "production",
    "platform": "alipay",
    "component2": true,
    "scope": true,
    "type": "wx-alipay",
    "error": false,
    "empty": false,
    "fromId": 0,
    "isReport": true,
    "useRuntimeLog": false,
    "watch": false,
    "ignoreNpm": true,
    "input": "./",
    "output": "../out"
,
    "hooks": {
        "appJson": function plugin(appJson) {
          return appJson
        }

    },
    "babel": {
        "plugins": function() {
          return []
        }
    },
        "plugins": []
}