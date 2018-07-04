<template>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <span class="navbar-toggle collapsed h4" data-toggle="collapse" data-target="#nav" aria-expanded="false">
                        <i class="el-icon-menu"></i>
                    </span>
                    <router-link :to="nav.brand.link" class="navbar-brand">{{ nav.brand.text }}</router-link>
                </div>

                <div class="collapse navbar-collapse" id="nav">
                    <ul class="nav navbar-nav">
                        <li v-for="(v, k) in nav.list" :class="{
                                active: k === nav.active.index
                            }" v-if="v.position === undefined || v.position === 'left'">
                            <a @click="clickNavLink(k)">{{ v.text }}</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <template v-for="(v, k) in nav.list" v-if="v.position === 'right'">
                            <li v-if="v.child === undefined" :class="{
                                active: k === nav.active.index
                            }">
                                <a @click="clickNavLink(k)">{{ v.text }}</a>
                            </li>
                            <li v-else :class="{
                                dropdown: true,
                                active: k === nav.active.index
                            }">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ v.text }} <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li v-for="(vv, kk) in v.child" :class="{
                                        active: kk === nav.active.childIndex
                                    }">
                                        <a @click="clickNavLink(k, kk)">{{ vv.text }}</a>
                                    </li>
                                </ul>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            router: null,
            nav: {
                brand: {
                    logo: '',
                    text: 'Dictation',
                    link: '/',
                },
                active: {
                    index: null, // 下标
                    childIndex: null,
                },
                list: [
                    { text: '首页', link: '/index', },
                    { text: '听写', link: '/dictation', },
                    { text: '词语本', link: '/word_book', },
                    { text: '听写记录', link: '/record', },
                    { text: '赞赏作者', link: '/reward', position: 'right' },
                    {
                        text: '设置',
                        link: '/setting',
                        position: 'right',
                        child: [
                            { text: '听写设置', link: '/dictation', },
                            { text: '个性化', link: '/theme', },
                            { text: '数据导入导出', link: '/import_export', },
                        ],
                    },
                ],
            },
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        clickNavLink(index, childIndex) {
            this.nav.active.index = index
            this.nav.active.childIndex = childIndex
            
            let navList = this.nav.list[index]
            let link = navList.link
            let path = childIndex === undefined ? link : link + navList.child[childIndex].link

            this.$router.push({
                path: path
            })
        },
        // saveNavActive() {
        //     var _this = this;
            
        //     $(window).on('beforeunload', function () {
        //         let localData = _this.localData()
        //         localData['nav'] = {
        //             active: _this.nav.active
        //         }
        //         _this.setLocalData(localData)
        //     })
        // },
        init() {
            // this.saveNavActive()
            // this.nav.active = this.localData()['nav']['active']
            this.router = this.$route.path
            this.nav.active = this.navActive(this.nav.list, this.router)
        },
    },
    watch: {
        "$route": function (nval, oval) {
            this.navActive(this.nav.list, nval.path)
        },
    },
};
</script>

<style>
.navbar-toggle {
    border-color: transparent;
    padding-top: 7px;
    padding-bottom: 7px;
}
</style>
