
Component({
    props: {
        hidden: true,
        duration: 1500,
        textContent: "",
        onLoadChange: () => { }
    },
    methods: {
        watchHidden () {
            const num = Number(this.props.duration);
            if (!this.props.hidden) {
                const that = this;
                setTimeout(() => {
                    const e = {
                        type: "change"
                    };
                    that.props.onLoadChange(e);
                }, num);
            }
        }
    },
    didUpdate () {
        this.watchHidden();
    },
    didMounted () {
        setTimeout(()=>{
            if (this.props._parent_ref && !this.isInitRelation) {
                if (this.props.onChildRef) {
                    this.isInitRelation = true;
                    this.props.onChildRef(this);
                }
            }
        }, 0)
    }
});