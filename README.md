<p align="center">
  <img alt="logo" src="https://img.yzcdn.cn/vant/logo.png" width="120" style="margin-bottom: 10px;">
</p>
<h3 align="center">轻量、可靠的小程序 UI 组件库</h3>

## 介绍

Vant Aliapp 是移动端 Vue 组件库 [Vant](https://github.com/youzan/vant) 的支付宝小程序版本，两者基于相同的视觉规范，提供一致的 API 接口，助力开发者快速搭建小程序应用。

> Vant Aliapp 通过 [Antmove](https://ant-move.github.io/website/) 小程序转换器基于 [Vant-Weapp](https://youzan.github.io/vant-weapp/#/intro) 转换得到，并做了少量的兼容适配调整。

## 文档

* [Vant Aliapp 官网](https://ant-move.github.io/vant-ailapp-docs/#/intro)
* [Vant Weapp 官网](https://youzan.github.io/vant-weapp/#/intro)

## 使用之前

在开始使用 Vant Aliapp 之前，你需要先阅读 [支付宝小程序自定义组件](https://docs.alipay.com/mini/framework/custom-component-overview) 的相关文档。

## 安装

### 通过 npm 安装使用

* 通过 npm 安装
```bash
npm i vant-aliapp -S --production
```

* 通过 yarn 安装

```bash
yarn add vant-aliapp --production
```

> npm 使用 [example（vant-alipay-area）](https://github.com/ant-move/Vant-Aliapp/blob/master/alipay/vant-app/pages/area/index.json)。

### 下载代码使用

直接通过 git 下载 Vant Aliapp 源代码，并将`dist`目录拷贝到自己的项目中
```bash
git clone https://github.com/ant-move/Vant-Aliapp.git
```

## 使用组件

以按钮组件为例，只需要在 json 文件中引入按钮对应的自定义组件即可

```json
{
  "usingComponents": {
    "van-button": "/path/to/vant-weapp/dist/button/index"
  }
}
```

> npm 地址：`vant-aliapp/dist/dist/button/index`

接着就可以在 axml 中直接使用组件

```html
<van-button type="primary">按钮</van-button>
```

## 预览

<img width='200' src='https://cache.amap.com/ecology/tool/antmove/web/assets/dashboard.png'/>

<img width='200' src='https://cache.amap.com/ecology/tool/antmove/web/assets/qr/qr.jpg'/>



## 在开发者工具中预览

下载本项目到本地，使用支付宝 IDE 打开 `alipay/vant-app` 即可预览。

> 预览时请在项目详情设置中开启 `component2` 编译，详情可参考[支付宝小程序自定义组件使用介绍](https://docs.alipay.com/mini/framework/custom-component-overview#%E4%BD%BF%E7%94%A8%E9%A1%BB%E7%9F%A5)。


## 联系

如果您在使用的过程中碰到问题，可以通过下面几个途径寻求帮助。

* 钉钉微信交流群： <img width='200px' src='https://ant-move.github.io/website/img/contact-dingding.jpg'/> <img width='200px' src='https://cache.amap.com/ecology/tool/antmove/web/assets/wx-qrcode.JPG'/>
* 邮件：amap-appx@service.autonavi.com

## 链接

* [更新日志](https://ant-move.github.io/vant-ailapp-docs/#/changelog)
* [意见反馈](https://github.com/ant-move/Vant-Aliapp/issues)

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)协议，请自由地享受和参与开源。

[vant-weapp]: https://github.com/youzan/vant-weapp
[MIT]: http://opensource.org/licenses/MIT
[小程序简易教程]: https://mp.weixin.qq.com/debug/wxadoc/dev/
[小程序框架介绍]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html
[微信开发者工具]: https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html

## 感谢

感谢 vant 团队对 vant-weapp 的贡献，本项目基于 vant-weapp 转换而来，并做了支付宝小程序平台的适配兼容。
