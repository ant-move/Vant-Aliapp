import Page from '../../common/page'
import Toast from '../../dist/toast/toast'
import database from '../../database_area'
let db

if (wx.__target__ === 'wx') {
  db = wx.cloud.database()
}

Page({
  data: {
    areaList: {},
    loading: true,
    value: 330302,
  },

  onShow() {
    if (wx.__target__ === 'wx') {
      db.collection('region')
        .limit(1)
        .get()
        .then((res) => {
          if (res.data && res.data.length > 0) {
            this.setData({
              loading: false,
              areaList: res.data[0],
            })
          }
        })
        .catch((err) => {
          console.log(err)
          this.setData({
            loading: false,
          })
        })
    }
    if (wx.__target__ === 'alipay') {
      this.setData({
        loading: false,
        areaList: database,
      })
    }
  },

  onChange(event) {
    const { values } = event.detail

    Toast(values.map((item) => item.name).join('-'))
  },

  onConfirm(event) {
    console.log(event)
  },

  onCancel(event) {
    console.log(event)
  },
})
