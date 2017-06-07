window.onload=function(){
	var platform = "google";
	var url = "https://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&client=t&prev=input";
	var config = {
		random : getSelected($("#random")).value,
		interval : parseInt(getSelected($("#interval")).value),
		repeatNum : parseInt(getSelected($("#repeatNum")).value),
		speed : (platform=='google'?'0.':'')+getSelected($("#speed")).value,
	}

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

	var th = this,
		wordList = obj.data, // 词语列表
		deacon = obj.audioElement, // 音频元素
		currentWord, // 当前读到的词语
		alreadyList = []; // 已经听过的词语

	// 设置
	this.config = {
		tkk : 'http://tt.890m.com/translate_tkk.php', // google tkk
		api : 'https://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&client=t&prev=input', // 使用哪个发音接口
		random : 1, // 随机
		interval : 3000, // 间隔
		repeat : 2, // 重复次数
		speed : 0.4, // 速度
	};

	// 开始听写
	this.begin = function(){
		var nextFlag = 1, // 播放下一个词语语音的开关
			word = th.getWord(); // 词语
		time1 = new Date().getTime(); // 测试每次间隔用
		setTimeout(function(){
			ajax({
				method : "GET",
				url : th.config.tkk,
				success : function(tkk){
					ik = tkk; // Google translate js param tkk 设置
					deacon.src = th.config.api+ jk(word) +"&q="+ encodeURIComponent(word) +"&textlen="+ word.length +"&=ttsspeed="+ th.config.speed;
					deacon.play();
					deacon.addEventListener('playing',function(e){
						time2 = new Date().getTime(); // 测试每次间隔用
						var duration = event.srcElement.duration;
					});
					deacon.addEventListener('ended',function(e){
						if(nextFlag&&wordList!=''){
							nextFlag = 0;
							console.log(word,e,time2-time1); // 测试每次间隔用，有一个问题，每个词的播报间隔都要加上ajax请求的时间，间隔并不理想
							th.begin();
						}
					});
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