window.onload=function(){
	var platform = "google";
	var url = "https://translate.google.cn/translate_tts?ie=UTF-8&tl=en&total=1&idx=0&textlen=6&tk=287229.145022&client=t&prev=input";
	var config = {
		random : getSelected($("#random")).value,
		interval : getSelected($("#interval")).value,
		repeatNum : getSelected($("#repeatNum")).value,
		speed : (platform=='google'?'0.':'')+getSelected($("#speed")).value,
	}

	var beginBtn = $("#play");
	beginBtn.onclick = function(){
		var list = $("#list").children;
		var tts = $("#tts");
		// 随机这里有待更改
		var arr = [];
		for(var i=0;i<list.length;i++){
			arr[i] = list[i].textContent;
		}
		if(config.random){
			arr.sort(function(){return (0.5-Math.random());});
		}console.log(arr)
		// 随机这里有待更改
		for(var i=0;i<arr.length;i++){
			for(var r=0;r<config.repeatNum;r++){
				(function(num){
					setTimeout(function(){
					var text = arr[num].textContent;
					tts.src = url+"&q="+text+"&ttsspeed="+config.speed;
					tts.play();
					},config.interval)
				}(i))
			}
		}
	}
}