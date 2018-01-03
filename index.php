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
	<script src="js/bootstrap.min.js"></script>
	<script src="js/vue.min.js"></script>
	<script src="js/vue-router.js"></script>

	<script src="js/publicFun.js"></script>
	<script>window.jstiming={load:{tick:function(str){return str}}}</script>
	<script src="http://translate.google.cn/translate/releases/twsfe_20161212_RC00/r/js/desktop_module_main.js"></script>
	<script>
		function autoDictation(obj){
			obj.over = obj.over || function(){};

			// 设置
			this.config = {
				baidu: 'http://fanyi.baidu.com/gettts?spd=3&source=web',
				tkk : 'translate_tkk.php', // google tkk
				api : 'https://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&client=dev&prev=input', // 使用哪个发音接口
				random : 0, // 随机
				interval : 1000, // 间隔
				repeat : 2, // 重复次数
				speed : 0.4, // 速度
			};

			this.wordList = obj.data||""; // 词语列表
			this.over = false;

			var th = this,
				deacon = obj.audioElement, // 音频元素
				currentWord, // 当前读到的词语
				alreadyList = []; // 已经听过的词语

			// 开始听写
			this.begin = function(){
				th.over = false; // 正在听写
				var nextFlag = 1, // 播放下一个词语语音的开关
					currentRepeat = this.config.repeat, // 当前重复次数
					currentWord = th.getWord(), // 当前词语
					tl = 'zh'; // 词语语音

				if ( /^[\u4e00-\u9fa5]/.test(trim(currentWord)) === false ) {
					tl = 'en';
				}

				// ajax({
				// 	method : "GET",
				// 	url : th.config.tkk,
				// 	success : function(tkk){ ik = tkk; } // Google translate js param 设置tkk
				// });
				setTimeout(function(){
					// deacon.src = th.config.api+ jk(currentWord) +"&q="+ encodeURIComponent(currentWord) +"&textlen="+ currentWord.length +"&=ttsspeed="+ th.config.speed;
					// deacon.src = "translate_tts.php?q=" + currentWord + jk(currentWord) +"&tl="+ tl +"&ttsspeed="+ th.config.speed; // 换成了PHP接口
					deacon.src = th.config.baidu +"&text=" + currentWord +"&lan="+ tl; // 换成了PHP接口
					deacon.play();
					// 播放结束后
					deacon.addEventListener('ended',run);
				},th.config.interval)
				function run(e){
					var duration = e.path[0].duration;
					if(nextFlag&&currentRepeat>1){ // 复读当前词语
						nextFlag = 0; // 避免重复触发播放结束事件
						setTimeout(function(){//console.log(1,'next',currentRepeat)
							currentRepeat-=1;
							deacon.play();
							setTimeout(function(){
								nextFlag = 1;							
								if(nextFlag&&th.wordList==""&&currentRepeat==0){ console.log(3,'isover',currentRepeat);
									deacon.removeEventListener('ended',run);
									th.end();
								}
							},duration*1000); // 等语音播放完后才可以播放下一个语音
						},th.config.interval)
					}else if(nextFlag&&th.wordList!=""){//console.log(2,'next',currentRepeat) // 下一个词语
						nextFlag = 0;
						th.begin();
					}else if(nextFlag&&th.wordList==""){//console.log(4,'isover',currentRepeat);
						deacon.removeEventListener('ended',run);
						th.end();
					}
				}
			};

			// 听写结束
			this.end = function(){
				currentRepeat = th.config.repeat; // 重置当前的重复次数
				th.over = true;
				obj.over(th.over);
			}

			// 获得词语
			this.getWord = function(){
				var position = th.config.random && Math.floor(Math.random()*th.wordList.length) || 0,
					word = th.wordList.splice(position,1);

				alreadyList.push(word[0]);
				return word[0]
			};

		}
	</script>
</head>
<body>

<div id="app">
	<d-header :title="app.title" class="main-header" :show-back="app.showBack"></d-header>
	
	<transition name="bounce" enter-active-class="bounceInLeft" leave-active-class="">
		<router-view></router-view>
	</transition>

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