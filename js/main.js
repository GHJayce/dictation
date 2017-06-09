window.onload=function(){
	var menuList = $("#menuList");
	var uMenuBtn = $("#uMenuBtn");
	uMenuBtn.onclick = function(e){
		uMenuBtn.classList.add("menu-btn-active");
		menuList.style.cssText = "visibility:visible;opacity:1";
		e.stopPropagation();
	}
	document.onclick = function(e){
		e.stopPropagation();
		uMenuBtn.classList.remove("menu-btn-active");
		menuList.style.cssText = "visibility:hidden;opacity:0";
	}

	var platform = "google";
	var url = "https://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&client=t&prev=input";
	// var config = {
	// 	random : getSelected($("#random")).value,
	// 	interval : parseInt(getSelected($("#interval")).value),
	// 	repeatNum : parseInt(getSelected($("#repeatNum")).value),
	// 	speed : (platform=='google'?'0.':'')+getSelected($("#speed")).value,
	// }

	var beginBtn = $("#play");

	var audio = $("#tts");
	
	beginBtn.onclick = function(){
		var list = $("#list").children;
		var arr = [];
		for(var i=0;i<list.length;i++){
			arr[i] = list[i].textContent;
		}
		var dictation = new autoDictation({
			data : arr,
			audioElement : audio
		});
		dictation.begin();
	}
}

function autoDictation(obj){

	// 设置
	this.config = {
		tkk : 'http://tt.890m.com/translate_tkk.php', // google tkk
		api : 'https://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&client=t&prev=input', // 使用哪个发音接口
		random : 1, // 随机
		interval : 1000, // 间隔
		repeat : 2, // 重复次数
		speed : 0.4, // 速度
	};

	var th = this,
		wordList = obj.data, // 词语列表
		deacon = obj.audioElement, // 音频元素
		currentWord, // 当前读到的词语
		currentRepeat = this.config.repeat, // 当前重复次数
		alreadyList = []; // 已经听过的词语

	

	// 开始听写
	this.begin = function(){
		var nextFlag = 1, // 播放下一个词语语音的开关
			currentWord = th.getWord(); // 当前词语
		ajax({
			method : "GET",
			url : th.config.tkk,
			success : function(tkk){ ik = tkk; } // Google translate js param 设置tkk
		});
		setTimeout(function(){
			deacon.src = th.config.api+ jk(currentWord) +"&q="+ encodeURIComponent(currentWord) +"&textlen="+ currentWord.length +"&=ttsspeed="+ th.config.speed;
			deacon.play();
			deacon.addEventListener('ended',function(e){ // 播放结束后
				if(nextFlag&&currentRepeat>1){ // 复读当前词语
					nextFlag = 0; // 避免重复触发播放结束事件
					setTimeout(function(){
						currentRepeat-=1;
						deacon.play();
						nextFlag = 1;
					},th.config.interval)
				}else if(nextFlag&&wordList!=''){ // 下一个词语
					currentRepeat = th.config.repeat; // 重置当前的重复次数
					nextFlag = 0;
					th.begin();
				}
			});
		},th.config.interval)
	};

	// 获得词语
	this.getWord = function(){
		var position = th.config.random && Math.floor(Math.random()*wordList.length) || 0,
			word = wordList.splice(position,1);

		alreadyList.push(word[0]);
		return word[0]
	};

}