const utils = require("./utils");
const propsPolyfill = require("./propsPolyfill");
const descObj = require("./desc.js");
const apiObj = {startBeaconDiscovery:{fn: function fn(obj = {}) {
      const startBeaconDiscoveryParams = descObj.startBeaconDiscovery.body.params.props
      const params = utils.defineGetter(obj, startBeaconDiscoveryParams, (_obj, prop) => {
        utils.warn(
          `startBeaconDiscovery的参数不支持 ${prop} 属性!`,
          {
            apiName: `startBeaconDiscovery/${prop}`,
            errorType: startBeaconDiscoveryParams[prop].type,
            type: 'api',
          },
        )
      })
      return my.startBeaconDiscovery(params)
    },},stopBeaconDiscovery:{fn: function fn(obj = {}) {
      my.stopBeaconDiscovery(obj)
    },},onBeaconUpdate:{fn: function fn(cb) {
      return my.onBeaconUpdate({
        success: cb,
        fail: cb,
      })
    },},onBeaconServiceChange:{fn: function fn(cb) {
      return my.onBeaconServiceChange({
        success: cb,
        fail: cb,
        complete: cb,
      })
    },},getBeacons:{fn: function fn(obj = {}) {
      return my.getBeacons(obj)
    },},writeBLECharacteristicValue:{fn: function fn(obj = {}) {
      if (obj.value) {
        obj.value = utils.ab2hex(obj.value)
      }
      my.writeBLECharacteristicValue(obj)
    },},createBLEConnection:{fn: function fn(obj = {}) {
      return my.connectBLEDevice(obj)
    },},closeBLEConnection:{fn: function fn(obj = {}) {
      return my.disconnectBLEDevice(obj)
    },},onBLEConnectionStateChange:{fn: function fn(obj = {}) {
      return my.onBLEConnectionStateChanged(obj)
    },},onBLECharacteristicValueChange:{fn: function fn(cb) {
      my.onBLECharacteristicValueChange((res) => {
        res.value = utils.changeType(res.value)
        cb && cb(res)
      })
    },},getBLEDeviceServices:{fn: function fn(obj = {}) {
      my.getBLEDeviceServices({
        ...obj,
        success: (res) => {
          if (res.services) {
            res.services.forEach((item) => {
              item.uuid = item.serviceId
              delete item.serviceId
            })
          }
          obj.success && obj.success(res)
        },
      })
    },},getBLEDeviceCharacteristics:{fn: function fn(obj = {}) {
      my.getBLEDeviceCharacteristics({
        ...obj,
        success: (res) => {
          if (res.characteristics) {
            res.characteristics.forEach((item) => {
              item.uuid = item.characteristicId
              delete item.characteristicId
            })
          }
          obj.success && obj.success(res)
        },
      })
    },},addPhoneContact:{fn: function fn(obj = {}) {
      if (obj.weChatNumber) {
        obj.alipayAccount = obj.weChatNumber
      }
      my.addPhoneContact(obj)
    },},startBluetoothDevicesDiscovery:{fn: function fn(obj = {}) {
      if (obj.interval) {
        obj.interval = Math.round(obj.interval)
      }
      my.startBluetoothDevicesDiscovery(obj)
    },},onBluetoothDeviceFound:{fn: function fn(cb) {
      const onBluetoothDeviceFoundProps = descObj.onBluetoothDeviceFound.body.returnValue.props
      my.onBluetoothDeviceFound((res) => {
        const arr = res.devices.map((item) => {
          item.advertisData = utils.changeType(item.advertisData)
          return utils.defineGetter(item, onBluetoothDeviceFoundProps, (obj, prop) => {
            utils.warn(
              `onBluetoothDeviceFound的返回值不支持 ${prop} 属性!`,
              {
                apiName: `onBluetoothDeviceFound/${prop}`,
                errorType: onBluetoothDeviceFoundProps[prop].type,
                type: 'api',
              },
            )
          })
        })
        res.devices = arr
        cb && cb(res)
      })
    },},getBluetoothDevices:{fn: function fn(obj = {}) {
      const getBluetoothDevicesProps = descObj.getBluetoothDevices.body.returnValue.props.devices.props
      my.getBluetoothDevices({
        ...obj,
        success: (res) => {
          const arr = res.devices.map((item) => {
            item.advertisData = utils.changeType(item.advertisData)
            return utils.defineGetter(item, getBluetoothDevicesProps, (_obj, prop) => {
              utils.warn(
                `getBluetoothDevices的返回值不支持 ${prop} 属性!`,
                {
                  apiName: `getBluetoothDevices/${prop}`,
                  errorType: getBluetoothDevicesProps[prop].type,
                  type: 'api',
                },
              )
            })
          })
          res.devices = arr
          obj.success && obj.success(res)
        },
      })
    },},setClipboardData:{fn: function fn(obj = {}) {
      if (obj.data) {
        obj.text = obj.data
        delete obj.data
      }
      my.setClipboard(obj)
    },},getClipboardData:{fn: function fn(obj = {}) {
      my.getClipboard({
        ...obj,
        success: (res) => {
          res.data = res.text
          delete res.text
          obj.success && obj.success(res)
        },
      })
    },},onNetworkStatusChange:{fn: function fn(cb) {
      my.onNetworkStatusChange((res) => {
        res.networkType = res.networkType.toLowerCase()
        const typeObjMap = {
          unknown: 'unknown',
          wifi: 'wifi',
          '2g': '2g',
          '3g': '3g',
          '4g': '4g',
        }
                    
        if (res && !res.isConnected) {
          res.networkType = 'none'
        } else {
          res.networkType = typeObjMap[res.networkType] || res.networkType
        }
        cb && cb(res)
      })
    },},setScreenBrightness:{fn: function fn(obj = {}) {
      if (obj.value) {
        obj.brightness = obj.value
        delete obj.value
      }
      my.setScreenBrightness(obj)
    },},getScreenBrightness:{fn: function fn(obj = {}) {
      my.getScreenBrightness({
        success: (res) => {
          res.value = res.brightness
          delete res.brightness
          obj.success && obj.success(res)
        },
        fail: (res) => {
          obj.fail && obj.fail(res)
        },
      })
    },},scanCode:{fn: function fn(obj = {}) {
      obj.hideAlbum = obj.onlyFromCamera || false
      my.scan(obj)
    },},stopGyroscope:{fn: function fn(obj = {}) {
      const stopGyroscopeParams = descObj.stopGyroscope.body.params.props
      const params = utils.defineGetter(obj, stopGyroscopeParams, (_obj, prop) => {
        utils.warn(
          `stopGyroscope的参数不支持 ${prop} 属性!`,
          {
            apiName: `stopGyroscope${prop}`,
            errorType: stopGyroscopeParams[prop].type,
            type: 'api',
          },
        )
      })
      return my.offGyroscopeChange(params)
    },},onCompassChange:{fn: function fn(cb) {
      const onCompassChangeReturnValue = descObj.onCompassChange.body.returnValue.props
      my.onCompassChange((res) => {
        const _res = utils.defineGetter(res, onCompassChangeReturnValue, (obj, prop) => {
          utils.warn(
            `onCompassChange的返回值不支持 ${prop} 属性!`,
            {
              apiName: `onCompassChange/${prop}`,
              errorType: onCompassChangeReturnValue[prop].type,
              type: 'api',
            },
          )
        })
        cb && cb(_res)
      })
    },},stopCompass:{fn: function fn(obj = {}) {
      const stopCompassParams = descObj.stopCompass.body.params.props
      const params = utils.defineGetter(obj, stopCompassParams, (_obj, prop) => {
        utils.warn(
          `stopCompass的参数不支持 ${prop} 属性!`,
          {
            apiName: `stopCompass/${prop}`,
            errorType: stopCompassParams[prop].type,
            type: 'api',
          },
        )
      })
      return my.offCompassChange(params)
    },},stopAccelerometer:{fn: function fn(obj = {}) {
      const stopAccelerometerParams = descObj.stopAccelerometer.body.params.props
      const params = utils.defineGetter(obj, stopAccelerometerParams, (_obj, prop) => {
        utils.warn(
          `stopAccelerometer的参数不支持 ${prop} 属性!`,
          {
            apiName: `stopCompass/${prop}`,
            errorType: stopAccelerometerParams[prop].type,
            type: 'api',
          },
        )
      })
      return my.offAccelerometerChange(params)
    },},makePhoneCall:{fn: function fn(obj = {}) {
      const makePhoneCallParams = descObj.makePhoneCall.body.params.props
      if (obj.phoneNumber) {
        obj.number = obj.phoneNumber
        delete obj.phoneNumber
      }
      const params = utils.defineGetter(obj, makePhoneCallParams, (_obj, prop) => {
        utils.warn(
          `makePhoneCall的参数不支持 ${prop} 属性!`,
          {
            apiName: `makePhoneCall/${prop}`,
            errorType: makePhoneCallParams[prop].type,
            type: 'api',
          },
        )
      })
      return my.makePhoneCall(params)
    },},canIUse:{fn: function fn(params) {
      const paramsList = params.split('.')
      if (paramsList[1] && paramsList[1] === 'success') {
        paramsList[1] = 'return'
      }
      const str = paramsList.join('.')
      return my.canIUse(str)
    },},getSystemInfoSync:{fn: function fn() {
      let ret = my.getSystemInfoSync()
      const getSystemInfoSyncProps
        = descObj.getSystemInfoSync.body.returnValue.props
      ret = utils.defineGetter(ret, getSystemInfoSyncProps, (obj, prop) => {
        utils.warn(`getSystemInfoSync的返回值不支持 ${prop} 属性!`, {
          apiName: `getSystemInfoSync/${prop}`,
          errorType: getSystemInfoSyncProps[prop].type,
          type: 'api',
        })
      })

      /**
       * 处理Android屏幕宽度返回值
       */
      if (ret.platform.toLowerCase() === 'android') {
        ret.platform = 'android'
        ret.screenWidth /= ret.pixelRatio
        ret.screenHeight /= ret.pixelRatio
      } else if (ret.platform.toLowerCase() === 'ios') {
        ret.platform = 'ios'
        // mock的安全区位置信息（模拟器iphonex screenHeight:812）
        if (ret.screenHeight >= propsPolyfill.screenHeight) {
          ret.safeArea = propsPolyfill.safeArea
          ret.safeArea.bottom = ret.screenHeight - propsPolyfill.safeHeight
        } else {
          ret.safeArea = {
            bottom: ret.screenHeight,
            height: ret.screenHeight,
            left: 0,
            right: ret.screenWidth,
            top: ret.statusBarHeight,
            width: ret.screenWidth,
          }
        }
      }
      // mock的版本，确保微信小程序源码里读取后和目标版本匹配都能通过
      ret.SDKVersion = '10.0.0'

      return ret
    },},getSystemInfo:{fn: function fn(obj = {}) {
      const getSystemInfoProps = descObj.getSystemInfo.body.returnValue.props
      my.getSystemInfo({
        ...obj,
        success: (res) => {
          res = utils.defineGetter(res, getSystemInfoProps, (_obj, prop) => {
            utils.warn(`getSystemInfo的返回值不支持 ${prop} 属性!`, {
              apiName: `getSystemInfo/${prop}`,
              errorType: getSystemInfoProps[prop].type,
              type: 'api',
            })
          })

          /**
           * 处理Android屏幕宽度返回值
           */
          if (res.platform.toLowerCase() === 'android') {
            res.platform = 'android'
            res.screenWidth /= res.pixelRatio
            res.screenHeight /= res.pixelRatio
          } else if (res.platform.toLowerCase() === 'ios') {
            res.platform = 'ios'
            if (res.screenHeight >= propsPolyfill.screenHeight) {
              res.safeArea = propsPolyfill.safeArea
              res.safeArea.bottom = res.screenHeight - propsPolyfill.safeHeight
            } else {
              res.safeArea = {
                bottom: res.screenHeight,
                height: res.screenHeight,
                left: 0,
                right: res.screenWidth,
                top: res.statusBarHeight,
                width: res.screenWidth,
              }
            }
          }

          // mock的版本，确保微信小程序源码里读取后和目标版本匹配都能通过
          res.SDKVersion = '10.0.0'
          obj.success && obj.success(res)
        },
      })
    },},showToast:{fn: function fn(obj = {}) {
      const showToastProps = descObj.showToast.body.params.props
      if (obj.title) {
        obj.content = obj.title
        delete obj.title
      }
      if (!obj.duration) {
        obj.duration = 2000
      }
      if (obj.icon) {
        if (obj.icon === 'success') {
          obj.type = 'success'
        } else if (obj.icon === 'loading') {
          obj.type = 'none'
          utils.warn('showToast暂不支持loading', {
            apiName: 'showToast/loading',
            errorType: 0,
            type: 'api',
          })
        } else {
          obj.type = 'none'
        }
        delete obj.icon
      } else {
        obj.type = 'success'
      }

      const params = utils.defineGetter(obj, showToastProps, (_obj, prop) => {
        utils.warn(`showToast的参数不支持 ${prop} 属性!`, {
          apiName: `showToast/${prop}`,
          errorType: showToastProps[prop].type,
          type: 'api',
        })
      })

      my.showToast(params)
    },},showModal:{fn: function fn(obj = {}) {
      const showModalProps = descObj.showModal.body.params.props
      if (obj.cancelText !== undefined) {
        obj.cancelButtonText = obj.cancelText
        delete obj.cancelText
      }

      if (obj.confirmText !== undefined) {
        obj.confirmButtonText = obj.confirmText
        delete obj.confirmText
      }

      const params = utils.defineGetter(obj, showModalProps, (_obj, prop) => {
        utils.warn(`showModal的参数不支持 ${prop} 属性!`, {
          apiName: `showModal/${prop}`,
          errorType: showModalProps[prop].type,
          type: 'api',
        })
      })

      my.confirm({
        ...params,
        success(res) {
          if (res.confirm) {
            res.cancel = false
          } else {
            res.cancel = true
          }
          obj.success && obj.success(res)
        },
      })
    },},showLoading:{fn: function fn(obj = {}) {
      const showLoadingProps = descObj.showLoading.body.params.props
      if (obj.title) {
        obj.content = obj.title
        delete obj.title
      }
      const params = utils.defineGetter(obj, showLoadingProps, (_obj, prop) => {
        utils.warn(`showLoading的参数不支持 ${prop} 属性!`, {
          apiName: `showLoading/${prop}`,
          errorType: showLoadingProps[prop].type,
          type: 'api',
        })
      })
      my.showLoading(params)
    },},showActionSheet:{fn: function fn(obj = {}) {
      const showActionSheetProps = descObj.showActionSheet.body.params.props
      if (obj.itemList) {
        obj.items = obj.itemList
        delete obj.itemList
      }
      const params = utils.defineGetter(
        obj,
        showActionSheetProps,
        (_obj, prop) => {
          utils.warn(`showActionSheet的参数不支持 ${prop} 属性!`, {
            apiName: `showActionSheet/${prop}`,
            errorType: showActionSheetProps[prop].type,
            type: 'api',
          })
        },
      )
      my.showActionSheet({
        ...params,
        success: (res) => {
          res.tapIndex = res.index
          delete res.index
          obj.success && obj.success(res)
        },
      })
    },},hideToast:{fn: function fn(obj) {
      try {
        my.hideToast()
        obj.success
          && obj.success({
            errMsg: 'hideToast: ok',
          })
      } catch (err) {
        obj.fail && obj.fail(err)
      } finally {
        obj.complete
          && obj.complete({
            errMsg: 'hideToast: ok',
          })
      }
    },},hideLoading:{fn: function fn(obj) {
      try {
        my.hideLoading()
        obj.success
          && obj.success({
            errMsg: 'hideLoading: ok',
          })
      } catch (err) {
        obj.fail && obj.fail(err)
      } finally {
        obj.complete
          && obj.complete({
            errMsg: 'hideLoading: ok',
          })
      }
    },},showNavigationBarLoading:{fn: function fn(obj = {}) {
      try {
        my.showNavigationBarLoading()
        obj.success
          && obj.success({
            errMsg: 'showNavigationBarLoading: ok',
          })
      } catch (err) {
        obj.fail && obj.fail(err)
      } finally {
        obj.complete
          && obj.complete({
            errMsg: 'showNavigationBarLoading: ok',
          })
      }
    },},setNavigationBarTitle:{fn: function fn(obj = {}) {
      return my.setNavigationBar(obj)
    },},setNavigationBarColor:{fn: function fn(obj = {}) {
      return my.setNavigationBar(obj)
    },},hideNavigationBarLoading:{fn: function fn(obj = {}) {
      try {
        my.hideNavigationBarLoading()
        obj.success
          && obj.success({
            errMsg: 'hideNavigationBarLoading: ok',
          })
      } catch (err) {
        obj.fail && obj.fail(err)
      } finally {
        obj.complete
          && obj.complete({
            errMsg: 'hideNavigationBarLoading: ok',
          })
      }
    },},setTabBarStyle:{fn: function fn(obj = {}) {
      if (obj.color && obj.color.length === 4) {
        const color = obj.color.slice(1)
        obj.color = `#${color}${color}`
      }
      my.setTabBarStyle(obj)
    },},setTabBarItem:{fn: function fn(obj = {}) {
      if (!obj.iconPath || !obj.selectedIconPath) {
        utils.warn('setTabBarItem的iconPath和selectedIconPath是必传的!', {
          apiName: 'setTabBarItem/iconPath和selectedIconPath',
          errorType: 0,
          type: 'api',
        })
      }
      my.setTabBarItem(obj)
    },},stopPullDownRefresh:{fn: function fn(obj = {}) {
      try {
        my.stopPullDownRefresh()
        obj.success
          && obj.success({
            errMsg: 'stopPullDownRefresh: ok',
          })
      } catch (err) {
        obj.fail && obj.fail(err)
      } finally {
        obj.complete
          && obj.complete({
            errMsg: 'stopPullDownRefresh: ok',
          })
      }
    },},pageScrollTo:{fn: function fn(obj = {}) {
      const pageScrollToParams = descObj.pageScrollTo.body.params.props
      const params = utils.defineGetter(
        obj,
        pageScrollToParams,
        (_obj, prop) => {
          utils.warn(`pageScrollTo的参数不支持 ${prop} 属性!`, {
            apiName: `pageScrollTo/${prop}`,
            errorType: pageScrollToParams[prop].type,
            type: 'api',
          })
        },
      )
      my.pageScrollTo(params)
      try {
        my.pageScrollTo()
        obj.success
          && obj.success({
            errMsg: 'pageScrollTo: ok',
          })
      } catch (err) {
        obj.fail && obj.fail(err)
      } finally {
        obj.complete
          && obj.complete({
            errMsg: 'pageScrollTo: ok',
          })
      }
    },},request:{fn: function fn(obj = {}) {
      if (obj.header) {
        obj.headers = obj.header
        delete obj.header
      }

      obj.method = obj.method || ''

      obj.method = obj.method.toUpperCase()

      if (obj.method !== 'GET' && obj.method !== 'POST') {
        utils.warn(`request暂不支持${obj.method}请求方式`, {
          apiName: `request/${obj.method}`,
          errorType: 0,
          type: 'api',
        })
        obj.method = 'GET'
      }

      if (obj.responseType) {
        utils.warn('支付宝暂不支持responseType', {
          apiName: 'request/responseType',
          errorType: 0,
          type: 'api',
        })
      }
      let task = my.request({
        ...obj,
        success(res) {
          res.header = res.headers
          res.statusCode = res.status
          delete res.headers
          delete res.status
          obj.success && obj.success(res)
        },
        fail(err) {
          const errMsg = 'request:fail abort'
          if (err.errorMessage === errMsg) {
            err = {
              errMsg,
            }
          }
          obj.fail && obj.fail(err)
        },
        complete(res) {
          obj.complete && obj.complete(res)
        },
      })
      task = task || {}
      task.onHeadersReceived = function() {}
      task.offHeadersReceived = function() {}
      return task
    },},createMapContext:{fn: function fn(obj = {}) {
      const createMapContextProps
        = descObj.createMapContext.body.returnValue.props
      const data = my.createMapContext(obj)
      for (const key in createMapContextProps) {
        if (createMapContextProps[key].type === 0) {
          data[key] = () => {}
        }
      }
      return utils.defineGetter(data, createMapContextProps, (_obj, prop) => {
        utils.warn(`createMapContext的返回值不支持 ${prop} 属性!`, {
          apiName: `createMapContext/${prop}`,
          errorType: createMapContextProps[prop].type,
          type: 'api',
        })
      })
    },},createVideoContext:{fn: function fn(id, that) {
      if (that) {
        utils.warn('createVideoContext暂不支持传递实例this', {
          apiName: 'createVideoContext',
          errorType: 0,
          type: 'api',
        })
      }
      return my.createVideoContext(id)
    },},createCameraContext:{fn: function fn(id = '') {
      const res = my.createCameraContext(id)
      res.setZoom = () => {
        utils.warn('支付宝暂不支持setZoom', {
          apiName: 'createCameraContext/setZoom',
          errorType: 0,
          type: 'api',
        })
      }
      return res
    },},previewImage:{fn: function fn(obj = {}) {
      const imgList = obj.urls || []
      const index = imgList.indexOf(obj.current)
      obj.current = index
      return my.previewImage(obj)
    },},compressImage:{fn: function fn(obj = {}) {
      if (obj.src) {
        obj.apFilePaths = [obj.src]
        delete obj.src
      }
      my.compressImage({
        ...obj,
        success(res) {
          res.tempFilePath = res.apFilePaths[0]
          delete res.apFilePath
          obj.success && obj.success(res)
        },
      })
    },},chooseImage:{fn: function fn(obj = {}) {
      if (!obj.count) {
        obj.count = 9
      }
      my.chooseImage({
        ...obj,
        success(res) {
          res.tempFilePaths = res.apFilePaths
          delete res.apFilePath
          utils.warn('暂不支持tempFiles', {
            apiName: 'chooseImage/tempFiles',
            errorType: 0,
            type: 'api',
          })
          obj.success && obj.success(res)
        },
      })
    },},saveImageToPhotosAlbum:{fn: function fn(obj = {}) {
      if (obj.filePath) {
        obj.url = obj.filePath
      }
      return my.saveImage(obj)
    },},openLocation:{fn: function fn(obj = {}) {
      if (obj.scale) {
        utils.warn('支付宝scale的取值为3-19，默认15', {
          apiName: 'openLocation/scale',
          errorType: 4,
          type: 'api',
        })

        if (obj.scale > 19) {
          obj.scale = 19
        } else if (obj.scale < 3) {
          obj.scale = 3
        }
      }
      return my.openLocation(obj)
    },},getLocation:{fn: function fn(obj = {}) {
      const type = obj.type || 'wgs84'
      const getLocationProps = descObj.getLocation.body.returnValue.props
      my.getLocation({
        ...obj,
        type: 0,
        success(res) {
          let data = res
          if (type === 'wgs84') {
            const lnglat = utils.gcj02towgs84(res.longitude, res.latitude)

            data = Object.assign(res, {
              longitude: lnglat[0],
              latitude: lnglat[1],
            })
          }
          data = utils.defineGetter(data, getLocationProps, (_obj, prop) => {
            utils.warn(`getLocation的返回值不支持 ${prop} 属性!`, {
              apiName: `getLocation/${prop}`,
              errorType: getLocationProps[prop].type,
              type: 'api',
            })
          })
          obj.success && obj.success(data)
        },
      })
    },},openCard:{fn: function fn(obj) {
      const openCardParams = descObj.openCard.body.params.props
      const params = utils.defineGetter(obj, openCardParams, (_obj, prop) => {
        utils.warn(
          `openCard的参数不支持 ${prop} 属性!`,
          {
            apiName: `openCard/${prop}`,
            errorType: openCardParams[prop].type,
            type: 'api',
          },
        )
      })
      return my.openCardList(params)
    },},login:{fn: function fn(obj = {}) {
      my.getAuthCode({
        scopes: 'auth_base',
        success: (res) => {
          const resObj = {
            code: res.authCode,
          }
          if (res.authCode) {
            resObj.errMsg = 'login:ok'
            if (obj.success) {
              obj.success(resObj)
            }
          } else {
            resObj.errMsg = 'login:fail'
            if (obj.success) {
              obj.success(resObj)
            }
          }
        },
        fail: (err) => {
          if (obj.fail) {
            obj.fail(err)
          }
        },
        complete: (res) => {
          if (res.authCode) {
            const resObj = {
              code: res.authCode,
              errMsg: 'login:ok',
            }
            if (obj.complete) {
              obj.complete(resObj)
            }
          } else if (obj.complete) {
            obj.complete(res)
          }
        },
      })
    },},hideKeyboard:{fn: function fn(obj = {}) {
      my.hideKeyboard(obj)

      if (typeof obj.success === 'function') {
        obj.success()
      }

      if (typeof obj.complete === 'function') {
        obj.complete()
      }
    },},getNetworkType:{fn: function fn(obj = {}) {
      my.getNetworkType({
        ...obj,
        success(res) {
          res.networkType = res.networkType.toLowerCase()
          const typeObjMap = {
            unknown: 'unknown',
            wifi: 'wifi',
            '2g': '2g',
            '3g': '3g',
            '4g': '4g',
          }

          if (res && !res.networkAvailable) {
            res.networkType = 'none'
          } else {
            res.networkType = typeObjMap[res.networkType] || res.networkType
          }
          obj.success && obj.success(res)
        },
      })
    },},canvasToTempFilePath:{fn: function fn(obj = {}) {
      const ctx = my.createCanvasContext(obj.canvasId)
      ctx.toTempFilePath({
        ...obj,
        success(res) {
          res.tempFilePath = res.apFilePath
          delete res.apFilePath
          obj.success && obj.success(res)
        },
      })
    },},canvasPutImageData:{fn: function fn(obj = {}) {
      const ctx = my.createCanvasContext(obj.canvasId)
      ctx.putImageData({
        ...obj,
        success(res) {
          obj.success && obj.success(res)
        },
      })
    },},canvasGetImageData:{fn: function fn(obj = {}) {
      const ctx = my.createCanvasContext(obj.canvasId)
      ctx.getImageData({
        ...obj,
        success(res) {
          obj.success && obj.success(res)
        },
      })
    },},saveFile:{fn: function fn(obj = {}) {
      if (obj.tempFilePath) {
        obj.apFilePath = obj.tempFilePath
        delete obj.tempFilePath
      }
      my.saveFile({
        ...obj,
        success(res) {
          res.savedFilePath = res.apFilePath
          delete res.apFilePath
          obj.success && obj.success(res)
        },
      })
    },},removeSavedFile:{fn: function fn(obj = {}) {
      if (obj.filePath) {
        obj.apFilePath = obj.filePath
        delete obj.filePath
      }
      return my.removeSavedFile(obj)
    },},getSavedFileList:{fn: function fn(obj = {}) {
      my.getSavedFileList({
        success(res) {
          if (res.fileList.length) {
            const ret = res.fileList.map((item) => {
              item.filePath = item.apFilePath
              delete item.apFilePath
              return item
            })
            res.fileList = ret
            obj.success && obj.success(res)
          } else {
            obj.success && obj.success(res)
          }
        },
      })
    },},getSavedFileInfo:{fn: function fn(obj = {}) {
      if (obj.filePath) {
        obj.apFilePath = obj.filePath
        delete obj.filePath
      }
      return my.getSavedFileInfo(obj)
    },},getFileInfo:{fn: function fn(obj = {}) {
      if (obj.filePath) {
        obj.apFilePath = obj.filePath
        delete obj.filePath
      }
      return my.getFileInfo(obj)
    },},downloadFile:{fn: function fn(obj = {}) {
      const downloadFileReturnValue
        = descObj.downloadFile.body.returnValue.props
      if (obj.filePath !== undefined) {
        utils.warn('支付宝暂不支持 filePath', {
          apiName: 'downloadFile/filePath',
          errorType: 0,
          type: 'api',
        })
      }
      my.downloadFile({
        ...obj,
        success(res) {
          res.tempFilePath = res.apFilePath
          if (res.apFilePath) {
            res.statusCode = 200
          }
          delete res.apFilePath
          if (!res.statusCode) {
            utils.warn('支付宝暂不支持statusCode', {
              apiName: 'downloadFile/statusCode',
              errorType: 0,
              type: 'api',
            })
          }
          obj.success && obj.success(res)
        },
      })
      const task = {
        abort() {},
        offHeadersReceived() {},
        offProgressUpdate() {},
        onHeadersReceived() {},
        onProgressUpdate() {},
      }
      return utils.defineGetter(task, downloadFileReturnValue, (_obj, prop) => {
        utils.warn(`downloadFile的返回值不支持 ${prop} 属性!`, {
          apiName: `downloadFile/${prop}`,
          errorType: downloadFileReturnValue[prop].type,
          type: 'api',
        })
      })
    },},uploadFile:{fn: function fn(obj = {}) {
      const uploadFileValue = descObj.uploadFile.body.returnValue.props
      if (obj.name) {
        obj.fileName = obj.name
        delete obj.name
      }
      const pathArr = obj.filePath.split('.')
      obj.fileType = 'image'
      const fileType = {
        video: ['ogg', 'avi', 'wma', 'rmvb', 'rm', 'flash', 'mp4', '3gp'],
        audio: ['wav', 'mp3'],
      }
      const typeName = pathArr[pathArr.length - 1]
      Object.keys(fileType).forEach((key) => {
        fileType[key].forEach((item) => {
          if (typeName.toLowerCase() === item) {
            obj.fileType = key
          }
        })
      })
      my.uploadFile(obj)
      const task = {
        abort() {},
        offHeadersReceived() {},
        offProgressUpdate() {},
        onHeadersReceived() {},
        onProgressUpdate() {},
      }
      return utils.defineGetter(task, uploadFileValue, (_obj, prop) => {
        utils.warn(`uploadFile的返回值不支持 ${prop} 属性!`, {
          apiName: `uploadFile/${prop}`,
          errorType: uploadFileValue[prop].type,
          type: 'api',
        })
      })
    },},connectSocket:{fn: function fn(obj = {}) {
      const connectSocketParams = descObj.connectSocket.body.params.props
      const params = utils.defineGetter(
        obj,
        connectSocketParams,
        (_obj, prop) => {
          utils.warn(`connectSocket的参数不支持 ${prop} 属性!`, {
            apiName: `connectSocket/${prop}`,
            errorType: connectSocketParams[prop].type,
            type: 'api',
          })
        },
      )
      my.connectSocket(params)
      const task = {
        close(_obj = {}) {
          my.closeSocket(_obj)
        },
        onClose(fn) {
          my.onSocketClose(fn)
        },
        onError(fn) {
          my.offSocketOpen(fn)
        },
        onMessage(fn) {
          my.onSocketMessage(fn)
        },
        onOpen(fn) {
          my.onSocketOpen((res) => {
            fn(res)
          })
        },
        send(_obj = {}) {
          my.sendSocketMessage(_obj)
        },
      }
      return task
    },},onSocketOpen:{fn: function fn(obj) {
      my.onSocketOpen((res) => {
        utils.warn('onSocketOpen 成功回调缺少header', {
          apiName: 'onSocketOpen/header',
          errorType: 0,
          type: 'api',
        })
        obj(res)
      })
    },},closeSocket:{fn: function fn(obj = {}) {
      const closeSocketParams = descObj.closeSocket.body.params.props
      const params = utils.defineGetter(
        obj,
        closeSocketParams,
        (_obj, prop) => {
          utils.warn(`closeSocket的参数不支持 ${prop} 属性!`, {
            apiName: `closeSocket/${prop}`,
            errorType: closeSocketParams[prop].type,
            type: 'api',
          })
        },
      )
      my.closeSocket(params)
    },},getRecorderManager:{fn: function fn() {
      const getRecorderManagerProps
        = descObj.getRecorderManager.body.returnValue.props
      const RecorderManager = my.getRecorderManager()
      for (const key in getRecorderManagerProps) {
        if (getRecorderManagerProps[key].type === 0) {
          RecorderManager[key] = () => {}
        }
      }
      return utils.defineGetter(
        RecorderManager,
        getRecorderManagerProps,
        (obj, prop) => {
          utils.warn(`getRecorderManager的返回值不支持 ${prop} 属性!`, {
            apiName: `getRecorderManager/${prop}`,
            errorType: getRecorderManagerProps[prop].type,
            type: 'api',
          })
        },
      )
    },},setStorageSync:{fn:function fn(key = '', data = '') {
      return my.setStorageSync({
        key,
        data,
      })
    },},getStorage:{fn:function fn(obj) {
      return my.getStorage({
        key: obj.key,
        success: (res) => {
          if (
            res.message
            && res.message === '查无此key'
            && typeof obj.fail === 'function'
          ) {
            const Msg = {
              errMsg: 'getStorage:fail data not found',
            }
            obj.fail(Msg)
          } else if (typeof obj.success === 'function') {
            obj.success(res)
          }
        },
        complete: (res) => {
          if (typeof obj.complete === 'function') {
            if (res.message && res.message === '查无此key') {
              const Msg = {
                errMsg: 'getStorage:fail data not found',
              }
              obj.complete(Msg)
            } else {
              obj.complete(res)
            }
          }
        },
      })
    },},getStorageSync:{fn: function fn(key = '') {
      const storeData = my.getStorageSync({
        key,
      })

      return storeData.data || ''
    },},removeStorageSync:{fn: function fn(key = '') {
      return my.removeStorageSync({
        key,
      })
    },},removeStorage:{fn:function fn(obj) {
      const Msg = {
        errMsg: 'removeStorage:ok',
      }
      return my.removeStorage({
        ...obj,
        success: () => {
          if (typeof obj.success === 'function') {
            obj.success(Msg)
          }
        },
        complete: () => {
          if (typeof obj.complete === 'function') {
            obj.complete(Msg)
          }
        },
      })
    },},createSelectorQuery:{fn: function fn() {
      const SQ = my.createSelectorQuery()

      function Query() {
        this.query = SQ
        this._selectType = 0 // 0: array, 1: object
        this.in = function(p) {
          if (typeof this.query.in === 'function') {
            this.query.in(p)
            return this
          } else {
            return this
          }
        }
        this.select = function(p) {
          const s = utils.parseSelector(p)
          this.query.select(s)
          this._selectType = 1
          return this
        }

        this.node = () => {
          utils.warn('支付宝暂不支持使用SelectorQuery NodesRef.node', {
            apiName: 'SelectorQuery NodesRef.node',
            errorType: 0,
            type: 'api',
          })
          return this
        }

        this.selectAll = function(p) {
          const s = utils.parseSelector(p)
          this.query.selectAll(s)
          return this
        }

        this.selectViewport = function(p) {
          this.query.selectViewport(p)
          return this
        }

        this.boundingClientRect = function(p) {
          this.query.boundingClientRect()
          this.exec(p)
          return this
        }

        this.scrollOffset = function(p) {
          const self = this
          this.query.scrollOffset().exec((ret) => {
            if (self._selectType) {
              self._selectType = 0
              if (Array.isArray(ret) && ret.length === 1) {
                ret = ret[0]
              }
            }

            p && p(ret)
          })
          return this
        }

        this.exec = function(p) {
          this.query.exec((ret) => {
            if (Array.isArray(ret)) {
              ret = ret.map((obj) => {
                return Array.isArray(obj)
                  ? obj.map((item) => ({
                    ...item,
                    id: utils.nextUid(),
                  }))
                  : {
                    ...obj,
                    id: utils.nextUid(),
                  }
              })
            }
            if (this._selectType) {
              this._selectType = 0
              if (Array.isArray(ret)) {
                if (ret.length === 1) {
                  ret = ret[0]
                } else if (ret.length > 1) {
                  utils.warn(
                    '支付宝SelectorQuery.exec查询结果按请求次序构成数组，数组中每项为一次查询的结果',
                    {
                      apiName: 'boundingClientRect',
                      errorType: 1,
                      type: 'api',
                    },
                  )
                }
              }
            }
            p && p(ret)
          })
          return this
        }
      }

      Query.prototype = SQ

      const res = new Query()

      return res
    },},createIntersectionObserver:{fn: function fn(...p) {
      const OB = my.createIntersectionObserver(...p)

      function Observer() {
        this.observer = OB
        this.relativeTo = function(...args) {
          const t = utils.parseSelector(args[0])
          const o = args[1]
          this.observer.relativeTo(t, o)
          return this
        }
        this.relativeToViewport = function(...args) {
          this.observer.relativeToViewport(...args)
          return this
        }
        this.observe = function(...args) {
          const t = utils.parseSelector(args[0])
          const cb = args[1]
          this.observer.observe(t, (ret) => {
            cb && cb(ret)
          })
        }
      }

      Observer.prototype = OB

      const res = new Observer()

      return res
    },},createAnimation:{fn: function fn(obj = {}) {
      if (obj.timingFunction) {
        obj.timeFunction = obj.timingFunction
        delete obj.timingFunction
      }
      const animation = my.createAnimation(obj)
      animation.config.delay = animation.config.delay || 0
      animation.option = {
        transition: animation.config,
        transformOrigin: animation.config.transformOrigin,
      }
      return animation
    },},showShareMenu:{fn: function fn() {
      return my.showSharePanel()
    },},saveVideoToPhotosAlbum:{fn: function fn(obj = {}) {
      const params = {
        ...obj,
        src: obj.filePath,
      }
      return my.saveVideoToPhotosAlbum(params)
    },},chooseAddress:{fn: function fn(obj = {}) {
      my.getAddress({
        success(_res) {
          const result = {}
          const res = _res.result
          result.cityName = res.city
          result.countyName = res.area
          result.detailInfo = res.street
          result.errMsg = 'chooseAddress:ok'
          result.nationalCode = ''
          result.postalCode = ''
          result.provinceName = res.prov
          result.telNumber = res.mobilePhone
          result.userName = res.fullname

          obj.success && obj.success(result)
        },
      })
    },},chooseVideo:{fn: function fn(obj = {}) {
      my.chooseVideo({
        success(result) {
          result.tempFilePath = result.apFilePath
          delete result.apFilePath
          obj.success && obj.success(result)
        },
      })
    },},getUserInfo:{fn: function fn(obj) {
      const getUserInfoSuccessRes = descObj.getUserInfo.body.params.props
      if (obj.withCredentials || obj.lang) {
        utils.warn(
          'GetAuthUserInfo不支持 withCredentials 或 lang 参数.',
          {
            apiName: 'getUserInfo/withCredentials 或 getUserInfo/lang',
            errorType: 0,
            type: 'api',
          },
        )
      }

      my.getAuthCode({
        scopes: 'auth_user',
        success: () => {
          my.getAuthUserInfo({
            ...obj,
            success(res) {
              utils.defineGetter(res, getUserInfoSuccessRes, (_obj, prop) => {
                utils.warn(
                  `getUserInfo的参数不支持 ${prop} 属性!`,
                  {
                    apiName: `getUserInfo/${prop}`,
                    errorType: getUserInfoSuccessRes[prop].type,
                    type: 'api',
                  },
                )
              })

              const _res = {}
              _res.userInfo = res
              _res.userInfo.avatarUrl = res.avatar
              obj.success && obj.success(_res)
            },
          })
        },
      })
    },},reportAnalytics:{fn: function fn(key, value) {
      if (typeof value !== 'object') {
        if (!(value instanceof Object)) {
          value = {
            data: value,
          }
        }
      }
      return my.reportAnalytics(key, value)
    },},requestPayment:{fn: function fn(obj = {}) {
      const requestPaymentParams = descObj.requestPayment.body.params.props
      const params = utils.defineGetter(obj, requestPaymentParams, (_obj, prop) => {
        utils.warn(
          `requestPayment的参数不支持 ${prop} 属性!`,
          {
            apiName: `requestPayment/${prop}`,
            errorType: requestPaymentParams[prop].type,
            type: 'api',
          },
        )
      })
      return my.tradePay(params)
    },},authorize:{fn: function fn(obj = {}) {
      const authorizeParams = descObj.authorize.body.params.props
      if (obj.scope) {
        delete obj.scope
        obj.scopes = 'auth_user'
      }
      const params = utils.defineGetter(obj, authorizeParams, (_obj, prop) => {
        utils.warn(
          `authorize的参数不支持 ${prop} 属性!`,
          {
            apiName: `authorize/${prop}`,
            errorType: authorizeParams[prop].type,
            type: 'api',
          },
        )
      })
      return my.getAuthCode(params)
    },},addCard:{fn: function fn(obj) {
      const addCardParams = descObj.addCard.body.params.props
      const params = utils.defineGetter(obj, addCardParams, (_obj, prop) => {
        utils.warn(
          `addCard的参数不支持 ${prop} 属性!`,
          {
            apiName: `startSoterAuthentication/${prop}`,
            errorType: addCardParams[prop].type,
            type: 'api',
          },
        )
      })
      return my.addCardAuth(params)
    },},startSoterAuthentication:{fn: function fn(obj) {
      const startSoterAuthenticationParams = descObj.startSoterAuthentication.body.params.props
      const params = utils.defineGetter(obj, startSoterAuthenticationParams, (_obj, prop) => {
        utils.warn(
          `startSoterAuthentication的参数不支持 ${prop} 属性!`,
          {
            apiName: prop,
            errorType: startSoterAuthenticationParams[prop].type,
            type: 'api',
          },
        )
      })
      return my.ap.faceVerify(params)
    },},getSetting:{fn: function fn(options = {}) {
      function setLocation(cb) {
        my.getLocation({
          success(res) {
            res.authSetting['scope.userLocation'] = true
            cb && cb()
          },
        })
      }
      if (my.getSetting) {
        my.getSetting({
          ...options,
          success(res) {
            const { success } = options

            if (!success) { return }

            success({
              authSetting: utils.mapAuthSetting(res.authSetting),
            })
          },
        })
      } else {
        const res = {}
        res.authSetting = {}

        /**
                   * scope=[userInfo, location, album, camera, audioRecord]
                   */

        if (options && options.success) {
          setLocation(() => {
            options.success(res)
          })
        }
      }
    },},openSetting:{fn: function fn(options = {}) {
      my.openSetting({
        ...options,
        success: (res) => {
          const { success } = options

          if (!success) {
            return
          }

          success({
            authSetting: utils.mapAuthSetting(res.authSetting),
          })
        },
      })
    },},hideHomeButton:{fn: function fn(obj = {}) {
      const hideHomeButtonProps = descObj.hideHomeButton.body.params.props
      const param = utils.defineGetter(obj, hideHomeButtonProps, (_obj, prop) => {
        utils.warn(
          `hideHomeButton的返回值不支持 ${prop} 属性!`,
          {
            apiName: `hideHomeButton/${prop}`,
            errorType: hideHomeButtonProps[prop].type,
            type: 'api',
          },
        )
      })
      return my.hideBackHome(param)
    },},cloud:{init: function init() {
      utils.warn(
        '支付宝暂不支持init',
        {
          apiName: 'cloud/init',
          errorType: 0,
          type: 'api',
        },
      )
    },},nextTick:function nextTick(fn, delay = 0) {
  if (typeof fn === 'function') {
    if (!delay) {
      Promise.resolve().then(fn)
    } else {
      setTimeout(fn, delay)
    }
  }
},}
module.exports = apiObj;