exports.install = function (Vue, options) {

    Vue.prototype.localData = function () {
        let dictation = localStorage.dictation
        dictation = dictation === undefined ? {} : JSON.parse(localStorage.dictation)

        return dictation
    }

    Vue.prototype.setLocalData = function (localData) {
        localStorage.dictation = JSON.stringify(localData)
    }

    Vue.prototype.navActive = function (nav, router) {
        let active = {
            index: null,
            childIndex: null,
        }

        if ( router === '/' ) {
            active.index = 0
        }

        for ( let v in nav ) {
            let path = router.split('/');
            switch (path.length) {
                case 2:
                    if ( nav[v].link === router ) {
                        active.index = v / 1
                    }
                    break;
                case 3:
                    active.index = v / 1
                    for ( let vv in nav[v].child ) {
                        if ( nav[v].child[vv].link === '/' + path[2] ) {
                            active.childIndex = vv / 1
                        }
                    }
                    break;
            }
        }

        return active
    }

}