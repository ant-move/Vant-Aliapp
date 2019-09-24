"use strict";

Component({
  props: {
    hidden: true,
    duration: 1500,
    textContent: "",
    onLoadChange: function onLoadChange() {}
  },
  methods: {
    watchHidden: function watchHidden() {
      var num = Number(this.props.duration);

      if (!this.props.hidden) {
        var that = this;
        setTimeout(function () {
          var e = {
            type: "change"
          };
          that.props.onLoadChange(e);
        }, num);
      }
    }
  },
  didUpdate: function didUpdate() {
    this.watchHidden();
  }
});