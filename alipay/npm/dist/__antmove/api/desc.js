"use strict";

var utils = require("./utils");

var infoObj = {
  canIUse: {
    status: 0,
    desc: "判断小程序的 API，回调，参数，组件等是否在当前版本可用",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/wx.canIUse.html",
      alipay: "https://docs.alipay.com/mini/api/can-i-use"
    },
    body: {}
  },
  getSystemInfoSync: {
    status: 1,
    desc: "获取系统信息同步版本",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/wx.getSystemInfoSync.html",
      alipay: "https://docs.alipay.com/mini/api/system-info"
    },
    body: {
      msg: "返回值属性值缺失",
      returnValue: {
        props: {
          safeArea: {
            type: 0,
            desc: "安全区位置信息"
          },
          SDKVersion: {
            type: 0,
            desc: "客户端基础库版本"
          },
          benchmarkLevel: {
            type: 0,
            desc: "仅 Android 小游戏 设备性能等级取值为：-2 或 0"
          },
          albumAuthorized: {
            type: 0,
            desc: "允许微信使用相册的开关 仅 iOS 有效"
          },
          cameraAuthorized: {
            type: 0,
            desc: "允许微信使用摄像头的开关"
          },
          locationAuthorized: {
            type: 0,
            desc: "允许微信使用定位的开关"
          },
          microphoneAuthorized: {
            type: 0,
            desc: "允许微信使用麦克风的开关"
          },
          notificationAuthorized: {
            type: 0,
            desc: "允许微信通知的开关"
          },
          notificationAlertAuthorized: {
            type: 0,
            desc: "允许微信通知带有提醒的开关 仅 iOS 有效"
          },
          notificationBadgeAuthorized: {
            type: 0,
            desc: "允许微信通知带有标记的开关 仅 iOS 有效"
          },
          notificationSoundAuthorized: {
            type: 0,
            desc: "允许微信通知带有声音的开关 仅 iOS 有效"
          },
          bluetoothEnabled: {
            type: 0,
            desc: "蓝牙的系统开关"
          },
          locationEnabled: {
            type: 0,
            desc: "地理位置的系统开关"
          },
          wifiEnabled: {
            type: 0,
            desc: "Wi-Fi 的系统开关"
          }
        }
      }
    }
  },
  getSystemInfo: {
    status: 1,
    desc: "获取系统信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfo.html",
      alipay: "https://docs.alipay.com/mini/api/system-info"
    },
    body: {
      msg: "返回值属性值缺失",
      returnValue: {
        props: {
          SDKVersion: {
            type: 0,
            desc: "客户端基础库版本"
          },
          benchmarkLevel: {
            type: 0,
            desc: "仅 Android 小游戏 设备性能等级取值为：-2 或 0"
          },
          albumAuthorized: {
            type: 0,
            desc: "允许微信使用相册的开关 仅 iOS 有效"
          },
          cameraAuthorized: {
            type: 0,
            desc: "允许微信使用摄像头的开关"
          },
          locationAuthorized: {
            type: 0,
            desc: "允许微信使用定位的开关"
          },
          microphoneAuthorized: {
            type: 0,
            desc: "允许微信使用麦克风的开关"
          },
          notificationAuthorized: {
            type: 0,
            desc: "允许微信通知的开关 仅 iOS 有效"
          },
          notificationAlertAuthorized: {
            type: 0,
            desc: "允许微信通知带有提醒的开关 仅 iOS 有效"
          },
          notificationBadgeAuthorized: {
            type: 0,
            desc: "允许微信通知带有标记的开关 仅 iOS 有效"
          },
          notificationSoundAuthorized: {
            type: 0,
            desc: "允许微信通知带有声音的开关 仅 iOS 有效"
          },
          bluetoothEnabled: {
            type: 0,
            desc: "蓝牙的系统开关"
          },
          locationEnabled: {
            type: 0,
            desc: "地理位置的系统开关"
          },
          wifiEnabled: {
            type: 0,
            desc: "Wi-Fi 的系统开关"
          }
        }
      }
    }
  },
  getUpdateManager: {
    status: 0,
    desc: "获取全局唯一的版本更新管理器",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/update/wx.getUpdateManager.html",
      alipay: "https://opendocs.alipay.com/mini/api/zdblqg"
    },
    body: {}
  },
  getLaunchOptionsSync: {
    status: 2,
    desc: "获取小程序启动时的参数",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html",
      alipay: ""
    },
    body: {}
  },
  onPageNotFound: {
    status: 2,
    desc: "监听小程序要打开的页面不存在事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onPageNotFound.html",
      alipay: ""
    },
    body: {}
  },
  onError: {
    status: 2,
    desc: "监听小程序错误事件。如脚本错误或 API 调用报错等。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onError.html",
      alipay: ""
    },
    body: {}
  },
  onAudioInterruptionBegin: {
    status: 2,
    desc: "监听音频因为受到系统占用而被中断开始事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAudioInterruptionBegin.html",
      alipay: ""
    },
    body: {}
  },
  onAudioInterruptionEnd: {
    status: 2,
    desc: "监听音频中断结束事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAudioInterruptionEnd.html",
      alipay: ""
    },
    body: {}
  },
  onAppShow: {
    status: 2,
    desc: "监听小程序切前台事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAppShow.html",
      alipay: ""
    },
    body: {}
  },
  onAppHide: {
    status: 2,
    desc: "监听小程序切后台事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAppHide.html",
      alipay: ""
    },
    body: {}
  },
  offPageNotFound: {
    status: 2,
    desc: "取消监听小程序要打开的页面不存在事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offPageNotFound.html",
      alipay: ""
    },
    body: {}
  },
  offError: {
    status: 2,
    desc: "监听小程序切前台事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offError.html",
      alipay: ""
    },
    body: {}
  },
  offAudioInterruptionBegin: {
    status: 2,
    desc: "取消监听音频因为受到系统占用而被中断开始事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAudioInterruptionBegin.html",
      alipay: ""
    },
    body: {}
  },
  offAudioInterruptionEnd: {
    status: 2,
    desc: "取消监听音频中断结束事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAudioInterruptionEnd.html",
      alipay: ""
    },
    body: {}
  },
  offAppShow: {
    status: 2,
    desc: "取消监听小程序切前台事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAppShow.html",
      alipay: ""
    },
    body: {}
  },
  offAppHide: {
    status: 2,
    desc: "取消监听小程序切后台事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAppHide.html",
      alipay: ""
    },
    body: {}
  },
  setEnableDebug: {
    status: 2,
    desc: "设置是否打开调试开关。此开关对正式版也能生效",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.setEnableDebug.html",
      alipay: ""
    },
    body: {}
  },
  getLogManager: {
    status: 2,
    desc: "获取日志管理器对象。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getLogManager.html",
      alipay: ""
    },
    body: {}
  },
  createCameraContext: {
    status: 0,
    desc: "创建 camera 上下文 CameraContext 对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/camera/wx.createCameraContext.html",
      alipay: ""
    },
    body: {}
  },
  base64ToArrayBuffer: {
    status: 2,
    desc: "将 Base64 字符串转成 ArrayBuffer 对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/wx.base64ToArrayBuffer.html",
      alipay: ""
    },
    body: {}
  },
  arrayBufferToBase64: {
    status: 2,
    desc: "将 ArrayBuffer 字符串转成 Base64 对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/wx.arrayBufferToBase64.html",
      alipay: ""
    },
    body: {}
  },
  updateWeChatApp: {
    status: 2,
    desc: "更新客户端版本",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/update/wx.updateWeChatApp.html",
      alipay: ""
    },
    body: {}
  },
  getEnterOptionsSync: {
    status: 2,
    desc: "获取本次小程序启动时的参数",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getEnterOptionsSync.html",
      alipay: ""
    },
    body: {}
  },
  onUnhandledRejection: {
    status: 0,
    desc: "监听未处理的 Promise 拒绝事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onUnhandledRejection.html",
      alipay: "https://opendocs.alipay.com/mini/00nd0f"
    },
    body: {}
  },
  onThemeChange: {
    status: 2,
    desc: "监听系统主题改变事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onThemeChange.html",
      alipay: ""
    },
    body: {}
  },
  offUnhandledRejection: {
    status: 0,
    desc: "取消监听未处理的 Promise 拒绝事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offUnhandledRejection.html",
      alipay: "https://opendocs.alipay.com/mini/00nfnd"
    },
    body: {}
  },
  offThemeChange: {
    status: 2,
    desc: "取消监听系统主题改变事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offThemeChange.html",
      alipay: ""
    },
    body: {}
  },
  getRealtimeLogManager: {
    status: 2,
    desc: "获取实时日志管理器对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getRealtimeLogManager.html",
      alipay: ""
    },
    body: {}
  },
  createCanvasContext: {
    status: 0,
    desc: "创建 canvas 的绘图上下文 CanvasContext 对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.createCanvasContext.html",
      alipay: "https://docs.alipay.com/mini/api/ui-canvas#a-namez4dtttamycreatecanvascontextcanvasid"
    },
    body: {}
  },
  canvasToTempFilePath: {
    status: 0,
    desc: "把当前画布指定区域的内容导出生成指定大小的图片",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html",
      alipay: "https://docs.alipay.com/mini/api/ui-canvas#a-namez4dtttamycreatecanvascontextcanvasid"
    },
    body: {}
  },
  canvasPutImageData: {
    status: 0,
    desc: "将像素数据绘制到画布",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasPutImageData.html",
      alipay: "https://docs.alipay.com/mini/api/ui-canvas#a-namez4dtttamycreatecanvascontextcanvasid"
    },
    body: {}
  },
  canvasGetImageData: {
    status: 0,
    desc: "获取 canvas 区域隐含的像素数据。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasGetImageData.html",
      alipay: "https://docs.alipay.com/mini/api/ui-canvas#a-namez4dtttamycreatecanvascontextcanvasid"
    },
    body: {}
  },
  createOffscreenCanvas: {
    status: 2,
    desc: "创建离屏 canvas 实例",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.createOffscreenCanvas.html",
      alipay: ""
    },
    body: {}
  },
  stopBeaconDiscovery: {
    status: 0,
    desc: "停止搜索附近的 iBeacon 设备",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.stopBeaconDiscovery.html",
      alipay: "https://docs.alipay.com/mini/api/yp5owa"
    },
    body: {}
  },
  startBeaconDiscovery: {
    status: 1,
    desc: "开始搜索附近的 iBeacon 设备",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.startBeaconDiscovery.html",
      alipay: "https://docs.alipay.com/mini/api/cy1g7k"
    },
    body: {
      msg: "参数缺失",
      params: {
        props: {
          ignoreBluetoothAvailable: {
            type: 0,
            desc: "是否校验蓝牙开关，仅在 iOS 下有效"
          }
        }
      }
    }
  },
  onBeaconUpdate: {
    status: 0,
    desc: "监听 iBeacon 设备更新事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.onBeaconUpdate.html",
      alipay: "https://docs.alipay.com/mini/api/kvdg9y"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  onBeaconServiceChange: {
    status: 1,
    desc: "监听 iBeacon 服务状态变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.onBeaconServiceChange.html",
      alipay: "https://docs.alipay.com/mini/api/rq1dl7"
    },
    body: {
      msg: "参数类型不同，wx: Function , alipay: Object"
    }
  },
  getBeacons: {
    status: 0,
    desc: "获取所有已搜索到的 iBeacon 设备",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.getBeacons.html",
      alipay: "https://docs.alipay.com/mini/api/yqleyc"
    },
    body: {}
  },
  stopWifi: {
    status: 2,
    desc: "关闭 Wi-Fi 模块",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.stopWifi.html",
      alipay: ""
    },
    body: {}
  },
  startWifi: {
    status: 2,
    desc: "初始化 Wi-Fi 模块",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.startWifi.html",
      alipay: ""
    },
    body: {}
  },
  setWifiList: {
    status: 2,
    desc: "设置 wifiList 中 AP 的相关信息。在 onGetWifiList 回调后调用，iOS特有接口",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.setWifiList.html",
      alipay: ""
    },
    body: {}
  },
  onWifiConnected: {
    status: 2,
    desc: "监听连接上 Wi-Fi 的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.onWifiConnected.html",
      alipay: ""
    },
    body: {}
  },
  onGetWifiList: {
    status: 2,
    desc: "监听获取到 Wi-Fi 列表数据事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.onGetWifiList.html",
      alipay: ""
    },
    body: {}
  },
  getWifiList: {
    status: 2,
    desc: "监听连接上 Wi-Fi 的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.getWifiList.html",
      alipay: ""
    },
    body: {}
  },
  getConnectedWifi: {
    status: 2,
    desc: "监听连接上 Wi-Fi 的事件。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.getConnectedWifi.html",
      alipay: ""
    },
    body: {}
  },
  connectWifi: {
    status: 2,
    desc: "连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.connectWifi.html",
      alipay: ""
    },
    body: {}
  },
  writeBLECharacteristicValue: {
    status: 0,
    desc: "读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持 read 才可以成功调用",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.writeBLECharacteristicValue.html",
      alipay: "https://docs.alipay.com/mini/api/vmp2r4"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  readBLECharacteristicValue: {
    status: 0,
    desc: "读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持 read 才可以成功调用。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.readBLECharacteristicValue.html",
      alipay: "https://docs.alipay.com/mini/api/zro0ka"
    },
    body: {}
  },
  onBLEConnectionStateChange: {
    status: 0,
    desc: "监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.onBLEConnectionStateChange.html",
      alipay: "https://docs.alipay.com/mini/api/utgyiu"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  onBLECharacteristicValueChange: {
    status: 0,
    desc: "监听低功耗蓝牙设备的特征值变化事件。必须先启用 notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.onBLECharacteristicValueChange.html",
      alipay: "https://docs.alipay.com/mini/api/cdu501"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  notifyBLECharacteristicValueChange: {
    status: 1,
    desc: "监听低功耗蓝牙设备的特征值变化事件。必须先启用 notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.onBLECharacteristicValueChange.html",
      alipay: "https://docs.alipay.com/mini/api/pdzk44"
    },
    body: {
      msg: "wx中state为必填参数"
    }
  },
  getBLEDeviceServices: {
    status: 0,
    desc: "获取蓝牙设备所有服务(service)",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.getBLEDeviceServices.html",
      alipay: "https://docs.alipay.com/mini/api/uzsg75"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  getBLEDeviceCharacteristics: {
    status: 0,
    desc: "获取蓝牙设备某个服务中所有特征值(characteristic)。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.getBLEDeviceCharacteristics.html",
      alipay: "https://docs.alipay.com/mini/api/fmg9gg"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  createBLEConnection: {
    status: 2,
    desc: "连接低功耗蓝牙设备。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.createBLEConnection.html",
      alipay: ""
    },
    body: {}
  },
  closeBLEConnection: {
    status: 2,
    desc: "断开与低功耗蓝牙设备的连接。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.closeBLEConnection.html",
      alipay: ""
    },
    body: {}
  },
  addPhoneContact: {
    status: 0,
    desc: "添加手机通讯录联系人。用户可以选择将该表单以「新增联系人」或「添加到已有联系人」的方式，写入手机系统通讯录。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/contact/wx.addPhoneContact.html",
      alipay: "https://docs.alipay.com/mini/api/contact"
    },
    body: {
      msg: "参数名不同"
    }
  },
  stopBluetoothDevicesDiscovery: {
    status: 0,
    desc: "停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.stopBluetoothDevicesDiscovery.html",
      alipay: "https://docs.alipay.com/mini/api/syb4mi"
    },
    body: {}
  },
  startBluetoothDevicesDiscovery: {
    status: 0,
    desc: "开始搜寻附近的蓝牙外围设备",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.startBluetoothDevicesDiscovery.html",
      alipay: "https://docs.alipay.com/mini/api/ksew43"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  openBluetoothAdapter: {
    status: 0,
    desc: "初始化蓝牙模块",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.openBluetoothAdapter.html",
      alipay: "https://docs.alipay.com/mini/api/kunuy4"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  onBluetoothDeviceFound: {
    status: 1,
    desc: "监听寻找到新设备的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.onBluetoothDeviceFound.html",
      alipay: "https://docs.alipay.com/mini/api/mhzls9"
    },
    body: {
      msg: "参数类型不同, 返回值缺失",
      params: {
        props: {
          advertisData: {
            type: 3,
            desc: "当前蓝牙设备的广播数据段中的 ManufacturerData 数据段。wx: ArrayBuffer, alipay: Hex String"
          }
        }
      },
      returnValue: {
        props: {
          advertisServiceUUIDs: {
            type: 0,
            desc: "当前蓝牙设备的广播数据段中的ServiceUUIDs 数据段"
          },
          serviceData: {
            type: 0,
            desc: "当前蓝牙设备的广播数据段中的 ServiceData 数据段"
          }
        }
      }
    }
  },
  onBluetoothAdapterStateChange: {
    status: 0,
    desc: "监听蓝牙适配器状态变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.onBluetoothAdapterStateChange.html",
      alipay: "https://docs.alipay.com/mini/api/eegfbk"
    },
    body: {}
  },
  getConnectedBluetoothDevices: {
    status: 1,
    desc: "根据 uuid 获取处于已连接状态的设备。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.getConnectedBluetoothDevices.html",
      alipay: "https://docs.alipay.com/mini/api/ge8nue"
    },
    body: {
      msg: "参数名差异",
      params: {
        props: {
          services: {
            type: 1,
            desc: "蓝牙设备主 service 的 uuid 列表, wx: services, alipay: deviceId"
          }
        }
      }
    }
  },
  getBluetoothDevices: {
    status: 1,
    desc: "获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.getBluetoothDevices.html",
      alipay: "https://docs.alipay.com/mini/api/pelizr"
    },
    body: {
      msg: "返回值属性类型差异/缺失",
      returnValue: {
        props: {
          advertisData: {
            type: 3,
            desc: "设备的广播内容, wx: ArrayBuffer, alipay: Hex String"
          },
          advertisServiceUUIDs: {
            type: 0,
            desc: "当前蓝牙设备的广播数据段中的ServiceUUIDs 数据段"
          },
          serviceData: {
            type: 0,
            desc: "当前蓝牙设备的广播数据段中的 ServiceData 数据段"
          }
        }
      }
    }
  },
  getBluetoothAdapterState: {
    status: 0,
    desc: "获取本机蓝牙适配器状态。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.getBluetoothAdapterState.html",
      alipay: "https://docs.alipay.com/mini/api/eid4o6"
    },
    body: {}
  },
  closeBluetoothAdapter: {
    status: 0,
    desc: "关闭蓝牙模块。调用该方法将断开所有已建立的连接并释放系统资源。建议在使用蓝牙流程后，与 wx.openBluetoothAdapter 成对调用。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.closeBluetoothAdapter.html",
      alipay: "https://docs.alipay.com/mini/api/wvko0w"
    },
    body: {}
  },
  getBatteryInfoSync: {
    status: 2,
    desc: "wx.getBatteryInfo 的同步版本",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfoSync.html",
      alipay: ""
    },
    body: {}
  },
  getBatteryInfo: {
    status: 2,
    desc: "获取设备电量。同步 API wx.getBatteryInfoSync 在 iOS 上不可用。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfo.html",
      alipay: ""
    },
    body: {}
  },
  stopHCE: {
    status: 2,
    desc: "关闭 NFC 模块。仅在安卓系统下有效。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.stopHCE.html",
      alipay: ""
    },
    body: {}
  },
  startHCE: {
    status: 2,
    desc: "初始化 NFC 模块。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.startHCE.html",
      alipay: ""
    },
    body: {}
  },
  sendHCEMessage: {
    status: 2,
    desc: "发送 NFC 消息。仅在安卓系统下有效。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.sendHCEMessage.html",
      alipay: ""
    },
    body: {}
  },
  onHCEMessage: {
    status: 2,
    desc: "监听接收 NFC 设备消息事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.onHCEMessage.html",
      alipay: ""
    },
    body: {}
  },
  getHCEState: {
    status: 2,
    desc: "判断当前设备是否支持 HCE 能力。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.getHCEState.html",
      alipay: ""
    },
    body: {}
  },
  onNetworkStatusChange: {
    status: 0,
    desc: "监听网络状态变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/network/wx.onNetworkStatusChange.html",
      alipay: "https://docs.alipay.com/mini/api/ympi0l"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  getNetworkType: {
    status: 0,
    desc: "获取网络类型",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/network/wx.getNetworkType.html",
      alipay: "https://docs.alipay.com/mini/api/network-status#mygetnetworktype"
    },
    body: {
      msg: "返回值属性差异",
      returnValue: {
        props: {
          networkType: {
            type: 1,
            desc: "wx: wifi/2g/3g/4g/unknown/none, alipay: WIFI/2G/3G/4G/UNKNOWN/NOTREACHABLE"
          }
        }
      }
    }
  },
  setScreenBrightness: {
    status: 0,
    desc: "设置屏幕亮度",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.setScreenBrightness.html",
      alipay: "https://docs.alipay.com/mini/api/ccf32t"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  setKeepScreenOn: {
    status: 0,
    desc: "设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.setKeepScreenOn.html",
      alipay: "https://docs.alipay.com/mini/api/qx0sap"
    },
    body: {}
  },
  onUserCaptureScreen: {
    status: 0,
    desc: "监听用户主动截屏事件。用户使用系统截屏按键截屏时触发",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.onUserCaptureScreen.html",
      alipay: "https://docs.alipay.com/mini/api/user-capture-screen"
    },
    body: {}
  },
  getScreenBrightness: {
    status: 0,
    desc: "获取屏幕亮度",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.getScreenBrightness.html",
      alipay: "https://docs.alipay.com/mini/api/screen-brightness"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  makePhoneCall: {
    status: 1,
    desc: "拨打电话",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/phone/wx.makePhoneCall.html",
      alipay: "https://docs.alipay.com/mini/api/macke-call"
    },
    body: {
      msg: "封装后不支持回调",
      params: {
        props: {
          success: {
            type: 0,
            desc: "接口调用成功的回调函数"
          },
          fail: {
            type: 0,
            desc: "接口调用失败的回调函数"
          },
          complete: {
            type: 0,
            desc: "接口调用结束的回调函数（调用成功、失败都会执行）"
          }
        }
      }
    }
  },
  onAccelerometerChange: {
    status: 0,
    desc: "监听加速度数据事件。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.onAccelerometerChange.html",
      alipay: "https://docs.alipay.com/mini/api/accelerometer"
    },
    body: {}
  },
  startAccelerometer: {
    status: 2,
    desc: "开始监听罗盘数据",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.startAccelerometer.html",
      alipay: ""
    },
    body: {}
  },
  stopAccelerometer: {
    status: 1,
    desc: "停止监听加速度数据。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.stopAccelerometer.html",
      alipay: "https://docs.alipay.com/mini/api/accelerometer"
    },
    body: {
      msg: "名称不同wx: stopAccelerometer, alipay: offAccelerometerChange, 参数缺失",
      params: {
        props: {
          success: {
            type: 0,
            desc: "接口调用成功的回调函数"
          },
          fail: {
            type: 0,
            desc: "接口调用失败的回调函数"
          },
          complete: {
            type: 0,
            desc: "接口调用结束的回调函数（调用成功、失败都会执行）"
          }
        }
      }
    }
  },
  onCompassChange: {
    status: 1,
    desc: "监听罗盘数据变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/compass/wx.onCompassChange.html",
      alipay: "https://docs.alipay.com/mini/api/compass#a-name5i0ewaamyoncompasschangefunction-callback"
    },
    body: {
      msg: "返回值属性缺失",
      returnValue: {
        props: {
          accuracy: {
            type: 0,
            desc: "精度"
          }
        }
      }
    }
  },
  startCompass: {
    status: 2,
    desc: "开始监听罗盘数据",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/compass/wx.startCompass.html",
      alipay: ""
    },
    body: {}
  },
  stopCompass: {
    status: 1,
    desc: "停止监听罗盘数据",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/compass/wx.stopCompass.html",
      alipay: "https://docs.alipay.com/mini/api/xf671t"
    },
    body: {
      msg: "命名不同wx: stopCompass, alipay: offCompassChange, 参数缺失",
      params: {
        props: {
          success: {
            type: 0,
            desc: "接口调用成功的回调函数"
          },
          fail: {
            type: 0,
            desc: "接口调用失败的回调函数"
          },
          complete: {
            type: 0,
            desc: "接口调用结束的回调函数（调用成功、失败都会执行）"
          }
        }
      }
    }
  },
  onDeviceMotionChange: {
    status: 2,
    desc: "监听设备方向变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.onDeviceMotionChange.html",
      alipay: ""
    },
    body: {}
  },
  startDeviceMotionListening: {
    status: 2,
    desc: "开始监听设备方向的变化",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.startDeviceMotionListening.html",
      alipay: ""
    },
    body: {}
  },
  stopDeviceMotionListening: {
    status: 2,
    desc: "停止监听设备方向的变化",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.stopDeviceMotionListening.html",
      alipay: ""
    },
    body: {}
  },
  onGyroscopeChange: {
    status: 0,
    desc: "监听陀螺仪数据变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.onGyroscopeChange.html",
      alipay: "https://docs.alipay.com/mini/api/gyroscope#a-namep1rwcgamyoffgyroscopechange"
    },
    body: {}
  },
  startGyroscope: {
    status: 2,
    desc: "开始监听陀螺仪数据",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.startGyroscope.html",
      alipay: ""
    },
    body: {}
  },
  stopGyroscope: {
    status: 1,
    desc: "停止监听陀螺仪数据。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.stopGyroscope.html",
      alipay: "https://docs.alipay.com/mini/api/cpt55i"
    },
    body: {
      msg: "命名不同wx: stopGyroscope, alipay: offGyroscopeChange, 参数缺失",
      params: {
        props: {
          success: {
            type: 0,
            desc: "接口调用成功的回调函数"
          },
          fail: {
            type: 0,
            desc: "接口调用失败的回调函数"
          },
          complete: {
            type: 0,
            desc: "接口调用结束的回调函数（调用成功、失败都会执行）"
          }
        }
      }
    }
  },
  onMemoryWarning: {
    status: 2,
    desc: "监听内存不足告警事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/performance/wx.onMemoryWarning.html",
      alipay: ""
    },
    body: {}
  },
  scanCode: {
    status: 1,
    desc: "调起客户端扫码界面进行扫码",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/scan/wx.scanCode.html",
      alipay: "https://docs.alipay.com/mini/api/scan"
    },
    body: {
      msg: " 参数差异, 返回值差异/缺失",
      params: {
        props: {
          onlyFromCamera: {
            type: 1,
            desc: "是否只能从相机扫码，不允许从相册选择图片, wx: onlyFromCamera, alipay: hideAlbum"
          },
          scanType: {
            type: 1,
            desc: "扫码类型, wx: scanType 支持数组类型；默认值是['barCode', 'qrCode']；取值范围：barCode、qrCode、datamatrix、pdf417, alipay: type 不支持数组类型；默认值是qr；取值范围：qr、bar"
          }
        }
      },
      returnValue: {
        props: {
          scanType: {
            type: 0,
            desc: "所扫码的类型"
          },
          charSet: {
            type: 0,
            desc: "所扫码的字符集"
          },
          path: {
            type: 0,
            desc: "当所扫的码为当前小程序二维码时，会返回此字段，内容为二维码携带的 path"
          },
          rawData: {
            type: 0,
            desc: "原始数据，base64编码"
          }
        }
      }
    }
  },
  vibrateLong: {
    status: 0,
    desc: "使手机发生较长时间的振动",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html",
      alipay: "https://docs.alipay.com/mini/api/ucm2he"
    },
    body: {}
  },
  vibrateShort: {
    status: 0,
    desc: "使手机发生较长时间的振动",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/vibrate/wx.vibrateShort.html",
      alipay: "https://docs.alipay.com/mini/api/ad6c10"
    },
    body: {
      msg: "震动时间不同wx: 15ms, alipay: 40ms"
    }
  },
  onBLEPeripheralConnectionStateChanged: {
    status: 2,
    desc: "监听当前外围设备被连接或断开连接事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/wx.onBLEPeripheralConnectionStateChanged.html",
      alipay: ""
    },
    body: {}
  },
  offBLEPeripheralConnectionStateChanged: {
    status: 2,
    desc: "取消监听当前外围设备被连接或断开连接事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/wx.offBLEPeripheralConnectionStateChanged.html",
      alipay: ""
    },
    body: {}
  },
  createBLEPeripheralServer: {
    status: 2,
    desc: "建立本地作为外围设备的服务端，可创建多个",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/wx.createBLEPeripheralServer.html",
      alipay: ""
    },
    body: {}
  },
  offHCEMessage: {
    status: 2,
    desc: "接收 NFC 设备消息事件，取消事件监听",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.offHCEMessage.html",
      alipay: ""
    },
    body: {}
  },
  getNFCAdapter: {
    status: 2,
    desc: "获取 NFC 实例",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.getNFCAdapter.html",
      alipay: ""
    },
    body: {}
  },
  offWifiConnected: {
    status: 2,
    desc: "取消监听连接上 Wi-Fi 的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.offWifiConnected.html",
      alipay: ""
    },
    body: {}
  },
  offGetWifiList: {
    status: 2,
    desc: "取消监听获取到 Wi-Fi 列表数据事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.offGetWifiList.html",
      alipay: ""
    },
    body: {}
  },
  setBLEMTU: {
    status: 2,
    desc: "设置蓝牙最大传输单元",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.setBLEMTU.html",
      alipay: ""
    },
    body: {}
  },
  offBLEConnectionStateChange: {
    status: 0,
    desc: "取消监听低功耗蓝牙连接状态的改变事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLEConnectionStateChange.html",
      alipay: "https://opendocs.alipay.com/mini/api/xfuy7k"
    },
    body: {}
  },
  offBLECharacteristicValueChange: {
    status: 0,
    desc: "取消监听低功耗蓝牙设备的特征值变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLECharacteristicValueChange.html",
      alipay: "https://opendocs.alipay.com/mini/api/dlxobk"
    },
    body: {}
  },
  makeBluetoothPair: {
    status: 2,
    desc: "蓝牙配对接口，仅安卓使用",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.makeBluetoothPair.html",
      alipay: ""
    },
    body: {}
  },
  getBLEDeviceRSSI: {
    status: 2,
    desc: "获取蓝牙设备的信号强度",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.getBLEDeviceRSSI.html",
      alipay: ""
    },
    body: {}
  },
  checkIsOpenAccessibility: {
    status: 2,
    desc: "检测是否开启视觉无障碍功能",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/accessibility/wx.checkIsOpenAccessibility.html",
      alipay: ""
    },
    body: {}
  },
  offBluetoothAdapterStateChange: {
    status: 0,
    desc: "取消监听蓝牙适配器状态变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.offBluetoothAdapterStateChange.html",
      alipay: "https://opendocs.alipay.com/mini/api/ocgwfe"
    },
    body: {}
  },
  setClipboardData: {
    status: 2,
    desc: "设置系统剪贴板的内容",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/clipboard/wx.setClipboardData.html",
      alipay: ""
    },
    body: {}
  },
  getClipboardData: {
    status: 2,
    desc: "获取系统剪贴板的内容",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/clipboard/wx.getClipboardData.html",
      alipay: ""
    },
    body: {}
  },
  offNetworkStatusChange: {
    status: 0,
    desc: "取消监听网络状态变化事件，参数为空，则取消所有的事件监听",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/network/wx.offNetworkStatusChange.html",
      alipay: "https://opendocs.alipay.com/mini/api/gxpg1w"
    },
    body: {}
  },
  offUserCaptureScreen: {
    status: 0,
    desc: "用户主动截屏事件。取消事件监听",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.offUserCaptureScreen.html",
      alipay: "https://opendocs.alipay.com/mini/api/umdxbg"
    },
    body: {}
  },
  offDeviceMotionChange: {
    status: 2,
    desc: "取消监听设备方向变化事件，参数为空，则取消所有的事件监听",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.offDeviceMotionChange.html",
      alipay: ""
    },
    body: {}
  },
  offMemoryWarning: {
    status: 0,
    desc: "取消监听内存不足告警事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/device/performance/wx.offMemoryWarning.html",
      alipay: "https://opendocs.alipay.com/mini/api/hszexr"
    },
    body: {}
  },
  getExtConfig: {
    status: 2,
    desc: "获取第三方平台自定义的数据字段。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ext/wx.getExtConfig.html",
      alipay: ""
    },
    body: {}
  },
  getExtConfigSync: {
    status: 2,
    desc: "wx.getExtConfig 的同步版本。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ext/wx.getExtConfigSync.html",
      alipay: ""
    },
    body: {}
  },
  saveFile: {
    status: 0,
    desc: "保存文件到本地",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.saveFile.html",
      alipay: "https://docs.alipay.com/mini/api/xbll1q"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  removeSavedFile: {
    status: 0,
    desc: "删除本地缓存文件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.removeSavedFile.html",
      alipay: "https://docs.alipay.com/mini/api/dgi1fr"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  openDocument: {
    status: 2,
    desc: "新开页面打开文档",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.openDocument.html",
      alipay: ""
    },
    body: {}
  },
  getSavedFileList: {
    status: 0,
    desc: "获取保存的所有文件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getSavedFileList.html",
      alipay: "https://docs.alipay.com/mini/api/cgohg1"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  getSavedFileInfo: {
    status: 0,
    desc: "获取保存的文件信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getSavedFileInfo.html",
      alipay: "https://docs.alipay.com/mini/api/qrx6ze"
    },
    body: {
      msg: "封装后支持"
    }
  },
  getFileSystemManager: {
    status: 2,
    desc: "获取全局唯一的文件管理器",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getFileSystemManager.html",
      alipay: ""
    },
    body: {}
  },
  getFileInfo: {
    status: 0,
    desc: "获取文件信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getFileInfo.html",
      alipay: "https://docs.alipay.com/mini/api/file"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  saveFileToDisk: {
    status: 2,
    desc: "保存文件系统的文件到用户磁盘，仅在 PC 端支持",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.saveFileToDisk.html",
      alipay: ""
    },
    body: {}
  },
  openLocation: {
    status: 0,
    desc: "打开位置",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.openLocation.html",
      alipay: "https://docs.alipay.com/mini/api/as9kin"
    },
    body: {}
  },
  getLocation: {
    status: 1,
    desc: "获取位置",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html",
      alipay: "https://docs.alipay.com/mini/api/mkxuqd"
    },
    body: {
      msg: "参数缺失, 参数type的取值/默认值差异, 返回值缺失/差异",
      params: {
        props: {
          altitude: {
            type: 0,
            desc: "传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度"
          },
          type的取值: {
            type: 4,
            desc: "wx: 默认值wgs84, alipay: 默认值0"
          }
        }
      },
      returnValue: {
        props: {
          speed: {
            type: 0,
            desc: "速度，单位 m/s"
          },
          altitude: {
            type: 0,
            desc: "高度，单位 m"
          },
          verticalAccuracy: {
            type: 0,
            desc: "垂直精度，单位 m（Android 无法获取，返回 0）"
          },
          error返回值差异: {
            type: 3,
            desc: "app未授权定位：alipay返回错误码11, wx返回errMsg：'getLocation:fail 1', app授权，小程序弹框询问权限时拒绝：alipay返回错误码2001；wx返回errMsg: “getLocation:fail authorize no response”"
          }
        }
      }
    }
  },
  chooseLocation: {
    status: 0,
    desc: "打开地图选择位置",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.chooseLocation.html",
      alipay: "https://docs.alipay.com/mini/api/location#a-namesnvqutamychooselocation"
    },
    body: {}
  },
  stopLocationUpdate: {
    status: 2,
    desc: "关闭监听实时位置变化，前后台都停止消息接收",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.stopLocationUpdate.html",
      alipay: ""
    },
    body: {}
  },
  startLocationUpdateBackground: {
    status: 2,
    desc: "开启小程序进入前后台时均接收位置消息，需引导用户开启授权",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.startLocationUpdateBackground.html",
      alipay: ""
    },
    body: {}
  },
  startLocationUpdate: {
    status: 2,
    desc: "开启小程序进入前台时接收位置消息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.startLocationUpdate.html",
      alipay: ""
    },
    body: {}
  },
  onLocationChange: {
    status: 2,
    desc: "监听实时地理位置变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.onLocationChange.html",
      alipay: ""
    },
    body: {}
  },
  offLocationChange: {
    status: 2,
    desc: "取消监听实时地理位置变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.offLocationChange.html",
      alipay: ""
    },
    body: {}
  },
  createMapContext: {
    status: 1,
    desc: "创建 map 上下文 MapContext 对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/map/wx.createMapContext.html",
      alipay: "https://docs.alipay.com/mini/api/ui-map"
    },
    body: {
      msg: "返回值对象方法缺失",
      returnValue: {
        props: {
          getRegion: {
            type: 0,
            desc: "获取当前地图的视野范围"
          },
          getScale: {
            type: 0,
            desc: "获取当前地图的缩放级别"
          },
          includePoints: {
            type: 0,
            desc: "缩放视野展示所有经纬度"
          }
        }
      }
    }
  },
  saveImageToPhotosAlbum: {
    status: 0,
    desc: "保存图片到系统相册不支持网络图片路径",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.saveImageToPhotosAlbum.html",
      alipay: "https://docs.alipay.com/mini/api/izfoiz"
    },
    body: {
      msg: "完全支持"
    }
  },
  previewImage: {
    status: 0,
    desc: "在新页面中全屏预览图片",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html",
      alipay: "https://docs.alipay.com/mini/api/eei0av"
    },
    body: {}
  },
  getImageInfo: {
    status: 0,
    desc: "获取图片信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html",
      alipay: "https://docs.alipay.com/mini/api/yv9n6t"
    },
    body: {}
  },
  compressImage: {
    status: 0,
    desc: "压缩图片接口，可选压缩质量",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.compressImage.html",
      alipay: "https://docs.alipay.com/mini/api/ehndze"
    },
    body: {
      msg: "封装后可完全支持"
    }
  },
  chooseMessageFile: {
    status: 2,
    desc: "从客户端会话选择文件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseMessageFile.html",
      alipay: ""
    },
    body: {}
  },
  chooseImage: {
    status: 1,
    desc: "从本地相册选择图片或使用相机拍照",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html",
      alipay: "https://docs.alipay.com/mini/api/media-image#a-nameeh9ddfamychooseimage"
    },
    body: {
      msg: "返回值属性缺失",
      returnValue: {
        props: {
          tempFiles: {
            type: 0,
            desc: "图片的本地临时文件列表"
          }
        }
      }
    }
  },
  saveVideoToPhotosAlbum: {
    status: 0,
    desc: "保存视频到系统相册",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.saveVideoToPhotosAlbum.html",
      alipay: ""
    },
    body: {}
  },
  createVideoContext: {
    status: 1,
    desc: "创建 video 上下文 VideoContext 对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.createVideoContext.html",
      alipay: ""
    },
    body: {
      msg: "返回值方法缺失",
      returnValue: {
        props: {
          sendDanmu: {
            type: 0,
            desc: "发送弹幕"
          }
        }
      }
    }
  },
  chooseVideo: {
    status: 0,
    desc: "拍摄视频或从手机相册中选视频",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseVideo.html",
      alipay: ""
    },
    body: {}
  },
  stopVoice: {
    status: 0,
    desc: "结束播放语音",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.stopVoice.html",
      alipay: ""
    },
    body: {}
  },
  setInnerAudioOption: {
    status: 2,
    desc: "设置 InnerAudioContext 的播放选项",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.setInnerAudioOption.html",
      alipay: ""
    },
    body: {}
  },
  playVoice: {
    status: 0,
    desc: "开始播放语音",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.playVoice.html",
      alipay: ""
    },
    body: {}
  },
  pauseVoice: {
    status: 0,
    desc: "暂停正在播放的语音",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.pauseVoice.html",
      alipay: ""
    },
    body: {}
  },
  getAvailableAudioSources: {
    status: 2,
    desc: "https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.getAvailableAudioSources.html",
    url: {
      wechat: ""
    },
    body: {}
  },
  createInnerAudioContext: {
    status: 2,
    desc: "创建内部 audio 上下文 InnerAudioContext 对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createInnerAudioContext.html",
      alipay: ""
    },
    body: {}
  },
  createAudioContext: {
    status: 0,
    desc: "创建 audio 上下文 AudioContext 对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createAudioContext.html",
      alipay: ""
    },
    body: {}
  },
  stopBackgroundAudio: {
    status: 2,
    desc: "停止播放音乐",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.stopBackgroundAudio.html",
      alipay: ""
    },
    body: {}
  },
  seekBackgroundAudio: {
    status: 2,
    desc: "控制音乐播放进度",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.seekBackgroundAudio.html",
      alipay: ""
    },
    body: {}
  },
  playBackgroundAudio: {
    status: 2,
    desc: "使用后台播放器播放音乐",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.playBackgroundAudio.html",
      alipay: ""
    },
    body: {}
  },
  pauseBackgroundAudio: {
    status: 2,
    desc: "暂停播放音乐",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.pauseBackgroundAudio.html",
      alipay: ""
    },
    body: {}
  },
  onBackgroundAudioStop: {
    status: 2,
    desc: "监听音乐停止事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioStop.html",
      alipay: ""
    },
    body: {}
  },
  onBackgroundAudioPlay: {
    status: 2,
    desc: "监听音乐播放事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioPlay.html",
      alipay: ""
    },
    body: {}
  },
  onBackgroundAudioPause: {
    status: 2,
    desc: "监听音乐暂停事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioPause.html",
      alipay: ""
    },
    body: {}
  },
  getBackgroundAudioPlayerState: {
    status: 2,
    desc: "获取后台音乐播放状态",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioPlayerState.html",
      alipay: ""
    },
    body: {}
  },
  getBackgroundAudioManager: {
    status: 2,
    desc: "获取全局唯一的背景音频管理器",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html",
      alipay: ""
    },
    body: {}
  },
  createLivePusherContext: {
    status: 2,
    desc: "创建 live-pusher 上下文 LivePusherContext 对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/live/wx.createLivePusherContext.html",
      alipay: ""
    },
    body: {}
  },
  createLivePlayerContext: {
    status: 2,
    desc: "创建 live-player 上下文 LivePlayerContext 对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/live/wx.createLivePlayerContext.html",
      alipay: ""
    },
    body: {}
  },
  stopRecord: {
    status: 0,
    desc: "停止录音",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.stopRecord.html",
      alipay: ""
    },
    body: {}
  },
  startRecord: {
    status: 0,
    desc: "开始录音",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.startRecord.html",
      alipay: ""
    },
    body: {}
  },
  getRecorderManager: {
    status: 1,
    desc: "获取全局唯一的录音管理器 RecorderManager",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.getRecorderManager.html",
      alipay: ""
    },
    body: {
      msg: "返回值方法缺失",
      returnValue: {
        props: {
          pause: {
            type: 0,
            desc: "暂停录音"
          },
          resume: {
            type: 0,
            desc: "继续录音"
          },
          onpause: {
            type: 0,
            desc: "监听录音暂停事件"
          },
          onresume: {
            type: 0,
            desc: "监听录音继续事件"
          },
          onFrameRecorded: {
            type: 0,
            desc: "监听已录制完指定帧大小的文件事件。如果设置了 frameSize，则会回调此事件"
          },
          onInterruptionEnd: {
            type: 0,
            desc: "监听录音中断结束事件。在收到 interruptionBegin 事件之后，小程序内所有录音会暂停，收到此事件之后才可再次录音成功"
          },
          onInterruptionBegin: {
            type: 0,
            desc: "监听录音因为受到系统占用而被中断开始事件。以下场景会触发此事件：微信语音聊天、微信视频聊天。此事件触发后，录音会被暂停。pause 事件在此事件后触发"
          }
        }
      }
    }
  },
  previewMedia: {
    status: 2,
    desc: "预览图片和视频",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewMedia.html",
      alipay: ""
    },
    body: {}
  },
  openVideoEditor: {
    status: 2,
    desc: "打开视频编辑器",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.openVideoEditor.html",
      alipay: ""
    },
    body: {}
  },
  getVideoInfo: {
    status: 2,
    desc: "获取视频详细信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.getVideoInfo.html",
      alipay: ""
    },
    body: {}
  },
  compressVideo: {
    status: 2,
    desc: "压缩视频",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.compressVideo.html",
      alipay: ""
    },
    body: {}
  },
  chooseMedia: {
    status: 2,
    desc: "拍摄或从手机相册中选择图片或视频",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html",
      alipay: ""
    },
    body: {}
  },
  createMediaContainer: {
    status: 2,
    desc: "创建音视频处理容器，最终可将容器中的轨道合成一个视频",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/wx.createMediaContainer.html",
      alipay: ""
    },
    body: {}
  },
  updateVoIPChatMuteConfig: {
    status: 2,
    desc: "更新实时语音静音设置",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.updateVoIPChatMuteConfig.html",
      alipay: ""
    },
    body: {}
  },
  subscribeVoIPVideoMembers: {
    status: 2,
    desc: "订阅视频画面成员",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.subscribeVoIPVideoMembers.html",
      alipay: ""
    },
    body: {}
  },
  setEnable1v1Chat: {
    status: 2,
    desc: "开启双人通话",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.setEnable1v1Chat.html",
      alipay: ""
    },
    body: {}
  },
  onVoIPVideoMembersChanged: {
    status: 2,
    desc: "监听实时语音通话成员视频状态变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onVoIPVideoMembersChanged.html",
      alipay: ""
    },
    body: {}
  },
  onVoIPChatSpeakersChanged: {
    status: 2,
    desc: "监听实时语音通话成员通话状态变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onVoIPChatSpeakersChanged.html",
      alipay: ""
    },
    body: {}
  },
  onVoIPChatMembersChanged: {
    status: 2,
    desc: "监听实时语音通话成员在线状态变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onVoIPChatMembersChanged.html",
      alipay: ""
    },
    body: {}
  },
  onVoIPChatInterrupted: {
    status: 2,
    desc: "监听被动断开实时语音通话事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onVoIPChatInterrupted.html",
      alipay: ""
    },
    body: {}
  },
  offVoIPVideoMembersChanged: {
    status: 2,
    desc: "取消监听实时语音通话成员视频状态变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.offVoIPVideoMembersChanged.html",
      alipay: ""
    },
    body: {}
  },
  offVoIPChatMembersChanged: {
    status: 2,
    desc: "取消监听实时语音通话成员在线状态变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.offVoIPChatMembersChanged.html",
      alipay: ""
    },
    body: {}
  },
  offVoIPChatInterrupted: {
    status: 2,
    desc: "取消监听被动断开实时语音通话事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.offVoIPChatInterrupted.html",
      alipay: ""
    },
    body: {}
  },
  joinVoIPChat: {
    status: 2,
    desc: "加入 (创建) 实时语音通话",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.joinVoIPChat.html",
      alipay: ""
    },
    body: {}
  },
  join1v1Chat: {
    status: 2,
    desc: "加入（创建）双人通话",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.join1v1Chat.html",
      alipay: ""
    },
    body: {}
  },
  exitVoIPChat: {
    status: 2,
    desc: "退出（销毁）实时语音通话",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.exitVoIPChat.html",
      alipay: ""
    },
    body: {}
  },
  createMediaRecorder: {
    status: 2,
    desc: "创建 WebGL 画面录制器",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/wx.createMediaRecorder.html",
      alipay: ""
    },
    body: {}
  },
  createVideoDecoder: {
    status: 2,
    desc: "创建视频解码器",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/wx.createVideoDecoder.html",
      alipay: ""
    },
    body: {}
  },
  request: {
    status: 1,
    desc: "发起 HTTPS 网络请求",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html",
      alipay: "https://docs.alipay.com/mini/api/owycmh"
    },
    body: {
      msg: "入参参数名称差异/参数缺失/返回值名称差异",
      params: {
        props: {
          header: {
            type: 1,
            desc: "设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json, wx: header, alipay: headers"
          },
          responseType: {
            type: 0,
            desc: "响应的数据类型, alipay缺失: responseType"
          },
          method合法值: {
            type: 0,
            desc: "OPTIONS,HEAD,PUT,DELETE,TRACE,CONNECT"
          }
        }
      },
      returnValue: {
        props: {
          statusCode: {
            type: 1,
            desc: "wx: statusCode, alipay: status"
          },
          header: {
            type: 1,
            desc: "wx: header, alipay: headers"
          }
        }
      }
    }
  },
  downloadFile: {
    status: 1,
    desc: "下载文件资源到本地",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/download/wx.downloadFile.html",
      alipay: "https://docs.alipay.com/mini/api/xr054r"
    },
    body: {
      msg: "参数缺失, 返回值属性值/方法缺失, 返回值名称差异",
      params: {
        props: {
          filePath: {
            type: 0,
            desc: "指定文件下载后存储的路径"
          }
        }
      },
      returnValue: {
        props: {
          tempFilePath: {
            type: 1,
            desc: "临时文件路径, wx: tempFilePath, alipay: apFilePath"
          },
          filePath: {
            type: 0,
            desc: "用户文件路径。传入 filePath 时会返回，跟传入的 filePath 一致"
          },
          statusCode: {
            type: 0,
            desc: "开发者服务器返回的 HTTP 状态码"
          },
          abort: {
            type: 0,
            desc: "中断下载任务"
          },
          offHeadersReceived: {
            type: 0,
            desc: "监听下载进度变化事件"
          },
          offProgressUpdate: {
            type: 0,
            desc: "取消监听下载进度变化事件"
          },
          onHeadersReceived: {
            type: 0,
            desc: "监听 HTTP Response Header 事件。会比请求完成事件更早"
          },
          onProgressUpdate: {
            type: 0,
            desc: "取消监听 HTTP Response Header 事件"
          }
        }
      }
    }
  },
  uploadFile: {
    status: 1,
    desc: "上传本地资源到开发者服务器",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html",
      alipay: "https://docs.alipay.com/mini/api/kmq4hc"
    },
    body: {
      msg: "参数名称差异, 返回值方法缺失",
      params: {
        props: {
          name: {
            type: 1,
            desc: "文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容, wx: name, alipay: fileName"
          }
        }
      },
      returnValue: {
        props: {
          abort: {
            type: 0,
            desc: "missing"
          },
          offHeadersReceived: {
            type: 0,
            desc: "missing"
          },
          offProgressUpdate: {
            type: 0,
            desc: "missing"
          },
          onHeadersReceived: {
            type: 0,
            desc: "missing"
          },
          onProgressUpdate: {
            type: 0,
            desc: "missing"
          }
        }
      }
    }
  },
  connectSocket: {
    status: 1,
    desc: "创建一个 WebSocket 的连接",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.connectSocket.html",
      alipay: "https://docs.alipay.com/mini/api/vx19c3"
    },
    body: {
      msg: "参数缺失, 返回值缺失",
      params: {
        props: {
          protocols: {
            type: 0,
            desc: "子协议数组"
          },
          tcpNoDelay: {
            type: 0,
            desc: "建立 TCP 连接的时候的 TCP_NODELAY 设置"
          }
        }
      },
      returnValue: {
        props: {
          close: {
            type: 0,
            desc: "missing"
          },
          cloonClosese: {
            type: 0,
            desc: "missing"
          },
          onError: {
            type: 0,
            desc: "missing"
          },
          onMessage: {
            type: 0,
            desc: "missing"
          },
          onOpen: {
            type: 0,
            desc: "missing"
          },
          send: {
            type: 0,
            desc: "missing"
          }
        }
      }
    }
  },
  onSocketOpen: {
    status: 1,
    desc: "监听WebSocket连接打开事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketOpen.html",
      alipay: "https://docs.alipay.com/mini/api/itm5og"
    },
    body: {
      msg: "返回值属性值缺失",
      returnValue: {
        props: {
          header: {
            type: 0,
            desc: "连接成功的 HTTP 响应 Header"
          }
        }
      }
    }
  },
  sendSocketMessage: {
    status: 0,
    desc: "通过 WebSocket 连接发送数据",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.sendSocketMessage.html",
      alipay: "https://docs.alipay.com/mini/api/mr91d1"
    },
    body: {}
  },
  onSocketMessage: {
    status: 0,
    desc: "监听WebSocket接受到服务器的消息事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketMessage.html",
      alipay: "https://docs.alipay.com/mini/api/gecnap"
    },
    body: {}
  },
  onSocketError: {
    status: 0,
    desc: "监听WebSocket错误",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketError.html",
      alipay: "https://docs.alipay.com/mini/api/giu3c2"
    },
    body: {}
  },
  onSocketClose: {
    status: 0,
    desc: "监听WebSocket关闭",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketClose.html",
      alipay: "https://docs.alipay.com/mini/api/foqk6g"
    },
    body: {}
  },
  closeSocket: {
    status: 1,
    desc: "关闭 WebSocket 连接",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.closeSocket.html",
      alipay: "https://docs.alipay.com/mini/api/network"
    },
    body: {
      msg: "参数缺失",
      params: {
        props: {
          code: {
            type: 0,
            desc: "一个数字值表示关闭连接的状态号，表示连接被关闭的原因。"
          },
          reason: {
            type: 0,
            desc: "一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于 123 字节的 UTF-8 文本（不是字符）"
          }
        }
      }
    }
  },
  stopLocalServiceDiscovery: {
    status: 2,
    desc: "停止搜索 mDNS 服务",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.stopLocalServiceDiscovery.html",
      alipay: ""
    },
    body: {}
  },
  startLocalServiceDiscovery: {
    status: 2,
    desc: "开始搜索局域网下的 mDNS 服务",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.startLocalServiceDiscovery.html",
      alipay: ""
    },
    body: {}
  },
  onLocalServiceResolveFail: {
    status: 2,
    desc: "监听 mDNS 服务解析失败的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceResolveFail.html",
      alipay: ""
    },
    body: {}
  },
  onLocalServiceLost: {
    status: 2,
    desc: "监听 mDNS 服务离开的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceLost.html",
      alipay: ""
    },
    body: {}
  },
  onLocalServiceFound: {
    status: 2,
    desc: "监听 mDNS 服务发现的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceFound.html",
      alipay: ""
    },
    body: {}
  },
  onLocalServiceDiscoveryStop: {
    status: 2,
    desc: "监听 mDNS 服务停止搜索的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceDiscoveryStop.html",
      alipay: ""
    },
    body: {}
  },
  offLocalServiceResolveFail: {
    status: 2,
    desc: "取消监听 mDNS 服务解析失败的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceResolveFail.html",
      alipay: ""
    },
    body: {}
  },
  offLocalServiceLost: {
    status: 2,
    desc: "取消监听 mDNS 服务离开的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceLost.html",
      alipay: ""
    },
    body: {}
  },
  offLocalServiceFound: {
    status: 2,
    desc: "取消监听 mDNS 服务发现的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceFound.html",
      alipay: ""
    },
    body: {}
  },
  offLocalServiceDiscoveryStop: {
    status: 2,
    desc: "取消监听 mDNS 服务停止搜索的事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceDiscoveryStop.html",
      alipay: ""
    },
    body: {}
  },
  createUDPSocket: {
    status: 2,
    desc: "创建一个 UDP Socket 实例",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/wx.createUDPSocket.html",
      alipay: ""
    },
    body: {}
  },
  login: {
    status: 0,
    desc: "调用接口获取登录凭证（code）",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html",
      alipay: "https://docs.alipay.com/mini/api/openapi-authorize"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  checkSession: {
    status: 2,
    desc: "检查登录态是否过期",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.checkSession.html",
      alipay: ""
    },
    body: {}
  },
  navigateToMiniProgram: {
    status: 0,
    desc: "打开另一个小程序",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html",
      alipay: "https://docs.alipay.com/mini/api/open-miniprogram"
    },
    body: {}
  },
  navigateBackMiniProgram: {
    status: 0,
    desc: "返回到上一个小程序",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/wx.navigateBackMiniProgram.html",
      alipay: "https://docs.alipay.com/mini/api/open-miniprogram"
    },
    body: {}
  },
  getAccountInfoSync: {
    status: 2,
    desc: "获取当前帐号信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/account-info/wx.getAccountInfoSync.html",
      alipay: ""
    },
    body: {}
  },
  getUserInfo: {
    status: 1,
    desc: "获取用户信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html",
      alipay: "https://docs.alipay.com/mini/api/userinfo"
    },
    body: {
      msg: "命名不同, 参数缺失, 返回值属性缺失",
      params: {
        props: {
          getUserInfo: {
            type: 1,
            desc: "wx: getUserInfo, alipay: getAuthUserInfo"
          },
          withCredentials: {
            type: 0,
            desc: "是否带上登录态信息"
          },
          lang: {
            type: 0,
            desc: "显示用户信息的语言"
          }
        }
      },
      returnValue: {
        props: {
          userInfo: {
            type: 0,
            desc: "用户信息对象，不包含 openid 等敏感信息"
          },
          rawData: {
            type: 0,
            desc: "不包括敏感信息的原始数据字符串，用于计算签名"
          },
          signature: {
            type: 0,
            desc: "使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息"
          },
          encryptedData: {
            type: 0,
            desc: "包括敏感数据在内的完整用户信息的加密数据"
          },
          iv: {
            type: 0,
            desc: "加密算法的初始向量"
          },
          cloudID: {
            type: 0,
            desc: "敏感数据对应的云 ID，开通云开发的小程序才会返回，可通过云调用直接获取开放数据"
          }
        }
      }
    }
  },
  UserInfo: {
    status: 2,
    desc: "用户信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/UserInfo.html",
      alipay: ""
    },
    body: {}
  },
  reportMonitor: {
    status: 2,
    desc: "自定义业务数据监控上报接口",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/report/wx.reportMonitor.html",
      alipay: ""
    },
    body: {}
  },
  reportAnalytics: {
    status: 0,
    desc: "自定义分析数据上报接口",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/data-analysis/wx.reportAnalytics.html",
      alipay: "https://docs.alipay.com/mini/api/report"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  requestPayment: {
    status: 2,
    desc: "发起支付",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html",
      alipay: ""
    },
    body: {
      msg: "支付宝与微信支付功能差异较大，请参考支付宝支付文档做兼容处理",
      params: {
        props: {
          timeStamp: {
            type: 0,
            desc: "时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间"
          },
          nonceStr: {
            type: 0,
            desc: "随机字符串，长度为32个字符以下"
          },
          "package": {
            type: 0,
            desc: "统一下单接口返回的 prepay_id 参数值"
          },
          signType: {
            type: 0,
            desc: "签名算法，应与后台下单时的值一致"
          },
          paySign: {
            type: 0,
            desc: "签名"
          },
          success: {
            type: 7,
            desc: "接口调用成功的回调函数"
          },
          fail: {
            type: 7,
            desc: "接口调用失败的回调函数"
          },
          complete: {
            type: 7,
            desc: "接口调用结束的回调函数"
          }
        }
      }
    }
  },
  authorize: {
    status: 1,
    desc: "提前向用户发起授权请求",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/authorize/wx.authorize.html",
      alipay: "https://docs.alipay.com/mini/api/openapi-authorize"
    },
    body: {
      msg: "命名不同wx: authorize, alipay: getAuthCode, 参数差异",
      params: {
        props: {
          scope: {
            type: 1,
            desc: "授权类型, wx: scope, alipay: scopes, 且取值不同"
          }
        }
      }
    }
  },
  openSetting: {
    status: 0,
    desc: "调起客户端小程序设置界面",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.openSetting.html",
      alipay: "https://docs.alipay.com/mini/api/qflu8f"
    },
    body: {}
  },
  getSetting: {
    status: 0,
    desc: "获取用户的当前设置",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html",
      alipay: "https://docs.alipay.com/mini/api/xmk3ml"
    },
    body: {}
  },
  AuthSetting: {
    status: 2,
    desc: "用户授权设置信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/AuthSetting.html",
      alipay: ""
    },
    body: {}
  },
  chooseAddress: {
    status: 1,
    desc: "打开地图选择位置",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/address/wx.chooseAddress.html",
      alipay: "https://yuque.antfin-inc.com/mpaas-tiny-site/api/choose-address"
    },
    body: {
      msg: "支付宝端需要在项目作出相应配置，并需要服务端的支持"
    }
  },
  openCard: {
    status: 1,
    desc: "查看微信卡包中的卡券",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/card/wx.openCard.html",
      alipay: "https://docs.alipay.com/mini/api/qxxpsh"
    },
    body: {
      msg: "命名不同wx: openCard, alipay: openCardList, 参数缺失",
      params: {
        props: {
          cardList: {
            type: 0,
            desc: "需要打开的卡券列表"
          },
          success: {
            type: 0,
            desc: "接口调用成功的回调函数"
          },
          fail: {
            type: 0,
            desc: "接口调用失败的回调函数"
          },
          complete: {
            type: 0,
            desc: "接口调用结束的回调函数（调用成功、失败都会执行)"
          }
        }
      }
    }
  },
  addCard: {
    status: 1,
    desc: "添加卡券",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/card/wx.addCard.html",
      alipay: "https://docs.alipay.com/mini/api/add-card-auth"
    },
    body: {
      msg: "命名不同wx: addCard, alipay: addCardAuth, 参数缺失, 返回值差异",
      params: {
        props: {
          cardList: {
            type: 0,
            desc: "需要添加的卡券列表"
          }
        },
        returnValue: {
          props: {
            cardList: {
              type: 1,
              desc: "wx: cardList Array.<Object>, alipay: result Object"
            }
          }
        }
      }
    }
  },
  chooseInvoiceTitle: {
    status: 2,
    desc: "选择用户的发票抬头",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/invoice/wx.chooseInvoiceTitle.html",
      alipay: ""
    },
    body: {}
  },
  chooseInvoice: {
    status: 2,
    desc: "选择用户已有的发票",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/invoice/wx.chooseInvoice.html",
      alipay: ""
    },
    body: {}
  },
  startSoterAuthentication: {
    status: 1,
    desc: "开始 SOTER 生物认证",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.startSoterAuthentication.html",
      alipay: "https://docs.alipay.com/mini/api/alipay-face-verify"
    },
    body: {
      msg: "命名不同wx: startSoterAuthentication, alipay: ap.faceVerify, 参数缺失",
      params: {
        props: {
          requestAuthModes: {
            type: 0,
            desc: "请求使用的可接受的生物认证方式"
          },
          challenge: {
            type: 0,
            desc: "挑战因子"
          },
          authContent: {
            type: 0,
            desc: "验证描述，即识别过程中显示在界面上的对话框提示内容"
          },
          complete: {
            type: 0,
            desc: "接口调用结束的回调函数（调用成功、失败都会执行）"
          }
        }
      }
    }
  },
  checkIsSupportSoterAuthentication: {
    status: 2,
    desc: "获取本机支持的 SOTER 生物认证方式",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSupportSoterAuthentication.html",
      alipay: ""
    },
    body: {}
  },
  checkIsSoterEnrolledInDevice: {
    status: 2,
    desc: "获取设备内是否录入如指纹等生物信息的接口",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSoterEnrolledInDevice.html",
      alipay: ""
    },
    body: {}
  },
  getWeRunData: {
    status: 2,
    desc: "获取用户过去三十天微信运动步数",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/werun/wx.getWeRunData.html",
      alipay: ""
    },
    body: {}
  },
  reportPerformance: {
    status: 2,
    desc: "小程序测速上报",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/performance/wx.reportPerformance.html",
      alipay: ""
    },
    body: {}
  },
  getPerformance: {
    status: 2,
    desc: "获取当前小程序性能相关的信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/performance/wx.getPerformance.html",
      alipay: ""
    },
    body: {}
  },
  requestSubscribeMessage: {
    status: 2,
    desc: "调起客户端小程序订阅消息界面，返回用户订阅消息的操作结果",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html",
      alipay: ""
    },
    body: {}
  },
  showRedPackage: {
    status: 2,
    desc: "拉取h5领取红包封面页",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/redpackage/wx.showRedPackage.html",
      alipay: ""
    },
    body: {}
  },
  getGroupEnterInfo: {
    status: 2,
    desc: "获取群工具小程序启动信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/open-api/group/wx.getGroupEnterInfo.html",
      alipay: ""
    },
    body: {}
  },
  switchTab: {
    status: 0,
    desc: "跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html",
      alipay: "https://docs.alipay.com/mini/api/ui-tabbar"
    },
    body: {}
  },
  reLaunch: {
    status: 1,
    desc: "关闭所有页面，打开到应用内的某个页面",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.reLaunch.html",
      alipay: "https://docs.alipay.com/mini/api/hmn54z"
    },
    body: {
      msg: "alipay: url 为 tabbar 页面时不支持传参"
    }
  },
  redirectTo: {
    status: 0,
    desc: "关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html",
      alipay: "https://docs.alipay.com/mini/api/fh18ky"
    },
    body: {}
  },
  navigateTo: {
    status: 0,
    desc: "保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html",
      alipay: "https://docs.alipay.com/mini/api/zwi8gx"
    },
    body: {}
  },
  navigateBack: {
    status: 0,
    desc: "关闭当前页面，返回上一页面或多级页面",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html",
      alipay: "https://docs.alipay.com/mini/api/kc5zbx"
    },
    body: {}
  },
  updateShareMenu: {
    status: 2,
    desc: "更新转发属性",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.updateShareMenu.html",
      alipay: ""
    },
    body: {}
  },
  showShareMenu: {
    status: 2,
    desc: "显示当前页面的转发按钮",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.showShareMenu.html",
      alipay: ""
    },
    body: {}
  },
  hideShareMenu: {
    status: 0,
    desc: "隐藏转发按钮",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.hideShareMenu.html",
      alipay: "https://docs.alipay.com/mini/api/share_app#a-namev4x7pramyhidesharemenuobject"
    },
    body: {}
  },
  getShareInfo: {
    status: 2,
    desc: "获取转发详细信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.getShareInfo.html",
      alipay: ""
    },
    body: {}
  },
  authPrivateMessage: {
    status: 2,
    desc: "验证私密消息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.authPrivateMessage.html",
      alipay: ""
    },
    body: {}
  },
  setStorageSync: {
    status: 0,
    desc: "将数据存储在本地缓存中指定的 key 中",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html",
      alipay: "https://docs.alipay.com/mini/api/cog0du"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  setStorage: {
    status: 0,
    desc: "将数据存储在本地缓存中指定的 key 中异步接口",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorage.html",
      alipay: "https://docs.alipay.com/mini/api/eocm6v"
    },
    body: {}
  },
  removeStorageSync: {
    status: 0,
    desc: "从本地缓存中同步移除指定 key",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorageSync.html",
      alipay: "https://docs.alipay.com/mini/api/ytfrk4"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  removeStorage: {
    status: 0,
    desc: "从本地缓存中移除指定 key",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorage.html",
      alipay: "https://docs.alipay.com/mini/api/of9hze"
    },
    body: {}
  },
  getStorageSync: {
    status: 0,
    desc: "获取缓存数据",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html",
      alipay: "https://docs.alipay.com/mini/api/ox0wna"
    },
    body: {
      msg: "封装后完全支持"
    }
  },
  getStorageInfoSync: {
    status: 0,
    desc: "获取当前storage的相关信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageInfoSync.html",
      alipay: "https://docs.alipay.com/mini/api/uw5rdl"
    },
    body: {}
  },
  getStorageInfo: {
    status: 0,
    desc: "异步获取当前storage的相关信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageInfo.html",
      alipay: "https://docs.alipay.com/mini/api/zvmanq"
    },
    body: {}
  },
  getStorage: {
    status: 1,
    desc: "从本地缓存中异步获取指定 key 的内容",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorage.html",
      alipay: "https://docs.alipay.com/mini/api/azfobl"
    },
    body: {
      msg: "返回值的类型",
      returnValue: {
        props: {
          data: {
            type: 3,
            desc: "key对应的内容, wx: any, alipay: Object/String"
          }
        }
      }
    }
  },
  clearStorageSync: {
    status: 0,
    desc: "同步清理本地数据缓存",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorageSync.html",
      alipay: "https://docs.alipay.com/mini/api/ulv85u"
    },
    body: {}
  },
  clearStorage: {
    status: 0,
    desc: "清理本地数据缓存",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorage.html",
      alipay: "https://docs.alipay.com/mini/api/storage#a-nameaaulpuamyclearstorage"
    },
    body: {}
  },
  setBackgroundFetchToken: {
    status: 2,
    desc: "设置自定义登录态",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.setBackgroundFetchToken.html",
      alipay: ""
    },
    body: {}
  },
  onBackgroundFetchData: {
    status: 2,
    desc: "监听收到 backgroundFetch 数据时的回调",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.onBackgroundFetchData.html",
      alipay: ""
    },
    body: {}
  },
  getBackgroundFetchToken: {
    status: 2,
    desc: "获取设置过的自定义登录态",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.getBackgroundFetchToken.html",
      alipay: ""
    },
    body: {}
  },
  getBackgroundFetchData: {
    status: 2,
    desc: "拉取 backgroundFetch 客户端缓存数据",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.getBackgroundFetchData.html",
      alipay: ""
    },
    body: {}
  },
  createSelectorQuery: {
    status: 1,
    desc: "返回一个 SelectorQuery 对象实例",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html",
      alipay: "https://docs.alipay.com/mini/api/selector-query"
    },
    body: {
      msg: "返回值方法缺失",
      returnValue: {
        props: {
          "in": {
            type: 0,
            desc: "将选择器的选取范围更改为自定义组件 component 内。（初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点）"
          }
        }
      }
    }
  },
  createIntersectionObserver: {
    status: 2,
    desc: "创建并返回一个 IntersectionObserver 对象实例",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createIntersectionObserver.html",
      alipay: ""
    },
    body: {}
  },
  IntersectionObserver: {
    status: 2,
    desc: "IntersectionObserver 对象，用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/wxml/IntersectionObserver.html",
      alipay: ""
    },
    body: {}
  },
  NodesRef: {
    status: 2,
    desc: "用于获取 WXML 节点信息的对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.html",
      alipay: ""
    },
    body: {}
  },
  SelectorQuery: {
    status: 0,
    desc: "查询节点信息的对象",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.html",
      alipay: "https://docs.alipay.com/mini/api/selector-query"
    },
    body: {}
  },
  showToast: {
    status: 1,
    desc: "显示消息提示框",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html",
      alipay: "https://docs.alipay.com/mini/api/fhur8f"
    },
    body: {
      msg: "入参参数差异/缺失",
      params: {
        props: {
          title: {
            type: 1,
            desc: "提示的内容, wx: title, alipay: content"
          },
          icon: {
            type: 1,
            desc: "图标, wx: icon, alipay: type"
          },
          image: {
            type: 0,
            desc: "自定义图标的本地路径，image 的优先级高于 icon"
          },
          mask: {
            type: 0,
            desc: "是否显示透明蒙层，防止触摸穿透"
          },
          icon的合法值: {
            type: 0,
            desc: "显示加载图标，此时 title 文本最多显示 7 个汉字长度"
          }
        }
      }
    }
  },
  showModal: {
    status: 1,
    desc: "显示模态对话框",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html",
      alipay: "https://docs.alipay.com/mini/api/lt3uqc"
    },
    body: {
      msg: "入参参数名称差异/参数缺失/返回值名称差异",
      params: {
        props: {
          confirmText: {
            type: 1,
            desc: "确认按钮的文字，最多 4 个字符, wx: confirmText, alipay: confirmButtonText"
          },
          cancelText: {
            type: 1,
            desc: "取消按钮的文字，最多 4 个字符, wx: cancelText, alipay: cancelButtonText"
          },
          showCancel: {
            type: 0,
            desc: "是否显示取消按钮"
          },
          cancelColor: {
            type: 0,
            desc: "取消按钮的文字颜色，必须是 16 进制格式的颜色字符串"
          },
          confirmColor: {
            type: 0,
            desc: "确认按钮的文字颜色，必须是 16 进制格式的颜色字符串"
          }
        }
      },
      returnValue: {
        props: {
          confirm: {
            type: 1,
            desc: "wx: 为true时，表示用户点击了确定按钮, alipay: 点击confirm返回true，点击cancel返回false"
          },
          cancel: {
            type: 1,
            desc: "wx: 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）"
          }
        }
      }
    }
  },
  showLoading: {
    status: 1,
    desc: "显示 loading 提示框",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html",
      alipay: "https://docs.alipay.com/mini/api/bm69kb"
    },
    body: {
      msg: "入参参数名称差异/参数缺失",
      params: {
        props: {
          title: {
            type: 1,
            desc: "提示的内容, wx: title, alipay: content"
          },
          mask: {
            type: 0,
            desc: "是否显示透明蒙层，防止触摸穿透"
          }
        }
      }
    }
  },
  showActionSheet: {
    status: 1,
    desc: "显示操作菜单",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showActionSheet.html",
      alipay: "https://docs.alipay.com/mini/api/hr092g"
    },
    body: {
      msg: "入参参数名称差异/参数缺失",
      params: {
        props: {
          itemList: {
            type: 1,
            desc: "按钮的文字数组, wx: itemList(数组长度最大为6), alipay: items"
          },
          itemColor: {
            type: 0,
            desc: "按钮的文字颜色"
          }
        }
      }
    }
  },
  hideToast: {
    status: 0,
    desc: "隐藏消息提示框",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideToast.html",
      alipay: "https://docs.alipay.com/mini/api/iygd4e"
    },
    body: {}
  },
  hideLoading: {
    status: 0,
    desc: "隐藏 loading 提示框",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideLoading.html",
      alipay: "https://docs.alipay.com/mini/api/nzf540"
    },
    body: {}
  },
  showNavigationBarLoading: {
    status: 0,
    desc: "在当前页面显示导航条加载动画",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.showNavigationBarLoading.html",
      alipay: "https://docs.alipay.com/mini/api/lydg2a"
    },
    body: {}
  },
  setNavigationBarTitle: {
    status: 0,
    desc: "动态设置当前页面的标题",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html",
      alipay: "https://docs.alipay.com/mini/api/xwq8e6"
    },
    body: {}
  },
  setNavigationBarColor: {
    status: 2,
    desc: "设置页面导航条颜色",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarColor.html",
      alipay: ""
    },
    body: {}
  },
  hideNavigationBarLoading: {
    status: 0,
    desc: "在当前页面隐藏导航条加载动画",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.hideNavigationBarLoading.html",
      alipay: "https://docs.alipay.com/mini/api/ncgsga"
    },
    body: {}
  },
  hideHomeButton: {
    status: 1,
    desc: "隐藏返回首页按钮",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.hideHomeButton.html",
      alipay: "https://docs.alipay.com/mini/api/ui-navigate"
    },
    body: {
      msg: "封装后不支持回调",
      params: {
        props: {
          success: {
            type: 0,
            desc: "接口调用成功的回调函数"
          },
          fail: {
            type: 0,
            desc: "接口调用失败的回调函数"
          },
          complete: {
            type: 0,
            desc: "接口调用结束的回调函数（调用成功、失败都会执行）"
          }
        }
      }
    }
  },
  setBackgroundTextStyle: {
    status: 0,
    desc: "动态设置下拉背景字体、loading 图的样式",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/background/wx.setBackgroundTextStyle.html",
      alipay: "https://docs.alipay.com/mini/api/aamqae"
    },
    body: {}
  },
  setBackgroundColor: {
    status: 0,
    desc: "动态设置窗口的背景色",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/background/wx.setBackgroundColor.html",
      alipay: "https://docs.alipay.com/mini/api/set-background#mysetBackgroundColor"
    },
    body: {}
  },
  showTabBarRedDot: {
    status: 0,
    desc: "显示tabBar某一项的右上角的红点",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.showTabBarRedDot.html",
      alipay: "https://docs.alipay.com/mini/api/dquxiq"
    },
    body: {}
  },
  showTabBar: {
    status: 0,
    desc: "显示 tabBar",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.showTabBar.html",
      alipay: "https://docs.alipay.com/mini/api/dpq5dh"
    },
    body: {}
  },
  setTabBarStyle: {
    status: 0,
    desc: "动态设置 tabBar 的整体样式",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.setTabBarStyle.html",
      alipay: "https://docs.alipay.com/mini/api/wcf0sv"
    },
    body: {}
  },
  setTabBarItem: {
    status: 0,
    desc: "动态设置 tabBar 某一项的内容",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.setTabBarItem.html",
      alipay: "https://docs.alipay.com/mini/api/zu37bk"
    },
    body: {}
  },
  setTabBarBadge: {
    status: 0,
    desc: "为 tabBar 某一项的右上角添加文本",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.setTabBarBadge.html",
      alipay: "https://docs.alipay.com/mini/api/qm7t3v"
    },
    body: {}
  },
  removeTabBarBadge: {
    status: 0,
    desc: "移除 tabBar 某一项右上角的文本",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.removeTabBarBadge.html",
      alipay: "https://docs.alipay.com/mini/api/lpbp5g"
    },
    body: {}
  },
  hideTabBarRedDot: {
    status: 0,
    desc: "隐藏 tabBar 某一项的右上角的红点",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.hideTabBarRedDot.html",
      alipay: "https://docs.alipay.com/mini/api/mg428a"
    },
    body: {}
  },
  hideTabBar: {
    status: 0,
    desc: "隐藏 tabBar",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.hideTabBar.html",
      alipay: "https://docs.alipay.com/mini/api/at18z8"
    },
    body: {}
  },
  loadFontFace: {
    status: 0,
    desc: "动态加载网络字体",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html",
      alipay: "https://docs.alipay.com/mini/api/ggawf0"
    },
    body: {}
  },
  stopPullDownRefresh: {
    status: 0,
    desc: "停止当前页面下拉刷新",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.stopPullDownRefresh.html",
      alipay: "https://docs.alipay.com/mini/api/pmhkbb"
    },
    body: {}
  },
  startPullDownRefresh: {
    status: 0,
    desc: "开始下拉刷新。调用后触发下拉刷新动画，效果与用户手动下拉刷新一致",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.startPullDownRefresh.html",
      alipay: "https://docs.alipay.com/mini/api/ui-pulldown"
    },
    body: {}
  },
  pageScrollTo: {
    status: 1,
    desc: "将页面滚动到目标位置",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/scroll/wx.pageScrollTo.html",
      alipay: "https://docs.alipay.com/mini/api/scroll#mypagescrollto"
    },
    body: {
      msg: "参数缺失",
      params: {
        props: {
          duration: {
            type: 0,
            desc: "滚动动画的时长，单位 ms"
          }
        }
      }
    }
  },
  createAnimation: {
    status: 0,
    desc: "创建一个动画实例 animation",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/animation/wx.createAnimation.html",
      alipay: "https://docs.alipay.com/mini/api/ui-animation#a-namen93ndhamycreateanimation"
    },
    body: {}
  },
  setTopBarText: {
    status: 2,
    desc: "动态设置置顶栏文字内容",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/sticky/wx.setTopBarText.html",
      alipay: ""
    },
    body: {}
  },
  nextTick: {
    status: 2,
    desc: "延迟一部分操作到下一个时间片再执行",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/custom-component/wx.nextTick.html",
      alipay: ""
    },
    body: {}
  },
  getMenuButtonBoundingClientRect: {
    status: 2,
    desc: "获取菜单按钮（右上角胶囊按钮）的布局位置信息",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html",
      alipay: ""
    },
    body: {}
  },
  onWindowResize: {
    status: 2,
    desc: "监听窗口尺寸变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/window/wx.onWindowResize.html",
      alipay: ""
    },
    body: {}
  },
  offWindowResize: {
    status: 2,
    desc: "取消监听窗口尺寸变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/window/wx.offWindowResize.html",
      alipay: ""
    },
    body: {}
  },
  enableAlertBeforeUnload: {
    status: 2,
    desc: "开启小程序页面返回询问对话框",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.enableAlertBeforeUnload.html",
      alipay: ""
    },
    body: {}
  },
  disableAlertBeforeUnload: {
    status: 2,
    desc: "关闭小程序页面返回询问对话框",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.disableAlertBeforeUnload.html",
      alipay: ""
    },
    body: {}
  },
  setWindowSize: {
    status: 2,
    desc: "设置窗口大小，该接口仅适用于 PC 平台",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/window/wx.setWindowSize.html",
      alipay: ""
    },
    body: {}
  },
  onKeyboardHeightChange: {
    status: 2,
    desc: "监听键盘高度变化",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/keyboard/wx.onKeyboardHeightChange.html",
      alipay: ""
    },
    body: {}
  },
  offKeyboardHeightChange: {
    status: 2,
    desc: "取消监听键盘高度变化事件",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/keyboard/wx.offKeyboardHeightChange.html",
      alipay: ""
    },
    body: {}
  },
  hideKeyboard: {
    status: 0,
    desc: "在input、textarea等focus拉起键盘之后，手动调用此接口收起键盘",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/keyboard/wx.hideKeyboard.html",
      alipay: ""
    },
    body: {
      msg: "参数缺失",
      params: {
        props: {
          success: {
            type: 0,
            desc: "接口调用成功的回调函数"
          },
          fail: {
            type: 0,
            desc: "接口调用失败的回调函数"
          },
          complete: {
            type: 0,
            desc: "接口调用结束的回调函数"
          }
        }
      }
    }
  },
  getSelectedTextRange: {
    status: 2,
    desc: "在input、textarea等focus之后，获取输入框的光标位置",
    url: {
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/api/ui/keyboard/wx.getSelectedTextRange.html",
      alipay: ""
    },
    body: {}
  }
};
module.exports = infoObj;