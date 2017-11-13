<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<title>dictation</title>
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="css/style.css">
	<script src="js/jquery-2.2.4.min.js"></script>
	<script src="js/vue.min.js"></script>
	<script src="js/vue-router.js"></script>

	<script src="js/publicFun.js"></script>
	<script>window.jstiming={load:{tick:function(str){return str}}}</script>
	<script src="http://translate.google.cn/translate/releases/twsfe_20161212_RC00/r/js/desktop_module_main.js"></script>
</head>
<body>

<div id="app">
	<d-header :title="app.title" class="main-header" :show-back="app.showBack"></d-header>
	
	<div class="container-fluid">
		<router-view></router-view>
	</div>

	<!-- <div class="enter">
		<input type="text" class="input" placeholder="输入词语" id="word">
		<button class="btn add" id="add">添加</button>
	</div>

	<div class="setting box-block">
		<h3>设置</h3>
		<div class="row-group" data-set="random">
			<span class="title">随机</span>
			<label class="switch" data-value="0" id="random"></label>
		</div>
		<div class="row-group" data-set="interval">
			<span class="title">间隔</span>
			<label class="options" data-value="1000">1秒</label>
			<label class="options" data-value="2000">2秒</label>
			<label class="options" data-value="3000">3秒</label>
			<label class="options" data-value="4000">4秒</label>
			<label class="options" data-value="5000">5秒</label>
		</div>
		<div class="row-group" data-set="repeat">
			<span class="title">重复次数</span>
			<label class="options" data-value="1">1次</label>
			<label class="options" data-value="2">2次</label>
			<label class="options" data-value="3">3次</label>
		</div>
		<div class="row-group" data-set="speed">
			<span class="title">语速</span>
			<label class="options" data-value="24">慢速</label>
			<label class="options" data-value="4">正常</label>
			<label class="options" data-value="7">快速</label>
		</div>
		<div class="row-group" data-set="people">
			<span class="title">发音</span>
			<label class="options" data-value="0">女声</label>
			<label class="options" data-value="1">男声</label>
		</div>
	</div>

	<div class="list"></div>

	<audio id="tts" src=""></audio> -->

<script>
<?php
	include('src/components.js');

	include('src/routes.php');

	include('src/main.js');
?>
</script>

</div>

</body>
</html>