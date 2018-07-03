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
                        <li v-for="(v, k) in nav.left" :class="{
                                active: k === nav.active.index
                            }">
                            <a @click="clickNavLink(k, 'left')">{{ v.text }}</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">设置 <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">听写设置</a></li>
                                <li><a href="#">个性化</a></li>
                                <li><a href="#">数据导入导出</a></li>
                            </ul>
                        </li>
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
            nav: {
                brand: {
                    logo: '',
                    text: 'Dictation',
                    link: '/',
                },
                active: {
                    which: null, // 哪一边 left, right
                    index: null, // 下标
                },
                left: [
                    { text: '首页', link: '/index', },
                    { text: '听写', link: '', },
                    { text: '词语本', link: '', },
                    { text: '听写记录', link: '', },
                ],
                right: [
                    { text: '赞赏作者', link: '', },
                    {
                        text: '设置',
                        child: [
                            { text: '听写设置', link: '', },
                            { text: '个性化', link: '', },
                            { text: '数据导入导出', link: '', },
                        ],
                    },
                ],
            }
        }
    },
    mounted() {
        this.saveNavActive()
    },
    methods: {
        clickNavLink(index, which) {
            this.nav.active.index = index
            this.nav.active.which = which

            this.$router.push({
                path: this.nav[which][index].link
            })
        },
        saveNavActive() {
            var _this = this;
            
            $(window).on('beforeunload', function () {
                localStorage.dictation = JSON.stringify(_this.nav.active);
            })
        }
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
