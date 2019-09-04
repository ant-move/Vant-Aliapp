export const basic = Behavior({
    methods: {
        $emit(...args) {
            this.triggerEvent(...args);
        },
      getRect(selector, all) {
        return new Promise(resolve => {
          let res = wx.createSelectorQuery();
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
