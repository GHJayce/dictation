import Index from '@/components/Index'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Index',
            meta: {
                title: '首页 - dictation 听写小应用',
            },
            component: Index
        }
    ]
})
