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
    "libraryName": "vant-aliapp/dist",
    "input": "./",
    "output": "../../alipay/npm/dist"
,
    "hooks": {
        "appJson": function plugin(appJson) {
      return appJson
    }

    },
    "babel": {
        "plugins": function () {
      return []
    }
    },
        "plugins": []
}