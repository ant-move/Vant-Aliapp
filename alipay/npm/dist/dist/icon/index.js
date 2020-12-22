import { VantComponent } from "../common/component";
VantComponent({
  props: {
    dot: Boolean,
    info: null,
    size: null,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: "van-icon"
    },
    score: Number,
    hidden: {
      type: Boolean,
      value: true
    },
    name: String
  },
  methods: {
    onClick(action) {
      this.$emit("click", action);
    }

  }
});