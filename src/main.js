// import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

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
