<template>
    <div class="hello">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <span class="navbar-toggle collapsed h4" data-toggle="collapse" data-target="#nav" aria-expanded="false">
                        <i class="el-icon-menu"></i>
                    </span>
                    <a class="navbar-brand" href="#">Dictation</a>
                </div>

                <div class="collapse navbar-collapse" id="nav">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">首页</a></li>
                        <li><a href="#">听写</a></li>
                        <li><a href="#">词语本</a></li>
                        <li><a href="#">听写记录</a></li>
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
    </div>
</template>

<script>
export default {
    name: 'Index',
    data () {
        return {
            
        }
    }
}
</script>

<style scoped>
.navbar-toggle {
    border-color: transparent;
    padding-top: 7px;
    padding-bottom: 7px
}
</style>
