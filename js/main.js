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
	beginBtn.onclick = function(){
		var list = $("#list").children;
		var audio = $("#tts");
		audio.loop = false;
		var flag = true;
		// 随机这里有待更改
		var arr = [];
		for(var i=0;i<list.length;i++){
			arr[i] = list[i].textContent;
		}
		if(config.random){
			arr.sort(function(){return (0.5-Math.random());});
		}
		console.log(arr);
		var timeout = config.interval;
		// 随机这里有待更改
		for(var i=0;i<arr.length;i++){
			(function(num){
				for(var r=0;r<config.repeatNum;r++){
					time(num,timeout);
					timeout+= config.interval;
				}
			}(i))
		}
		function time(num,out){
			if(flag){
				setTimeout(function(){
					flag=false;
					var c = 1;
					var text = arr[num];
					ajax({
						method : "GET",
						url : "http://tt.890m.com/translate_tkk.php",
						success : function(tkk){
							ik = tkk;
							tk = jk(text);
							audio.src = url+"&tk="+tk+"&q="+encodeURIComponent(text)+"&ttsspeed="+config.speed+"&=textlen="+text.length;
							audio.play();
							audio.addEventListener('ended',function(e){
								if(c==1){
									console.log('播放完');
									flag=true;
									c=0;
								}
							});
						}
					})
				},out);
			}
		}
	}
}