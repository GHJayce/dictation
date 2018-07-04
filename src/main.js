import common from './common/funs'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(common)

router.beforeEach(function (to, from, next) {
    window.document.title = to.meta.title;
    next()
})

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
