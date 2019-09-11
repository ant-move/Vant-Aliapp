const globalVar = require('../../api/config').global;
const my = globalVar;

const getUrl = function () {
    let pages = getCurrentPages();
    let url = pages[pages.length - 1].route;
    let _arr = url.split('/');
    let _name = _arr[_arr.length - 1];
    my.setStorageSync({
        key: '_pageMsg',
        data: {
            pageName: _name,
            pagePath: url
        }
    });
    return url;
};
const getLogInfo = function () {
    let num = 0;
    let info = my.getStorageSync({
        key: '__antmove_loginfo'
    }).data.pages;
    info.forEach(function (v, i) {
        num += v.logs.length;
    });
    return num;
};

const watchShakes = function () {
    let pages = getCurrentPages();
    let url = pages[pages.length - 1].route;
    let logUrl = "pages/ant-move-runtime-logs/index"; 
    let specificUrl = "pages/ant-move-runtime-logs/specific/index";
    my.watchShake({
        success: function () { 
            let num = getLogInfo();  
            let ifWatch = my.getStorageSync({
                key: 'ifWatch'
            }).data;
            if (!ifWatch || url === logUrl || url === specificUrl || !num) {
                watchShakes();
                return false;
            }
            my.confirm({
                title: '温馨提示',
                content: `已收集了${num}条问题日志，是否查看?  (该弹窗和问题收集页面的代码由Antmove嵌入，上线时请记得去掉)`,
                confirmButtonText: '赶紧看看',
                cancelButtonText: '暂不需要',
                success: function (res) {
                    if (res.confirm) {
                        my.navigateTo({
                            url: '/pages/ant-move-runtime-logs/index'
                        });
                    }
                },
                complete: function () {
                    watchShakes();
                }
            });
        }
    }); 
};

module.exports = {
    connectNodes: function connectNodes (node, ast, isUpdate) {
        if (!node.$relationNode.$parent) return false;
        let parentNodeId = node.$relationNode.$parent.$id;
        let parentNodeRoute = node.$relationNode.$parent.$route;
        let index = node.$relationNode.$parent.$index;
    
        let refNumbers = (node.$self.props.refNumbers && node.$self.props.refNumbers.length) || 1;
        let parentArray = ast.$refNodes[parentNodeRoute][parentNodeId];
        let parent = null;
        if (refNumbers > 1) {
            parentArray.forEach((_parent) => {
                if (_parent.$children.length !== refNumbers && !parent) {
                    parent = _parent;
                    return true;
                }
            });
        } else {
            parent = parentArray[0];
        }
        if (parent) {
            node.setParent(parent);
        }
    },
    setIfWatch,
    getUrl,
    getLogInfo,
    watchShakes,
    processIntersectionObserver
};
function setIfWatch (res) {
    my.setStorageSync({
        key: 'ifWatch',
        data: res
    });
}

function processIntersectionObserver (context) {
    context.createIntersectionObserver = function (...p) {
        return my.createIntersectionObserver(...p);
    };
}

