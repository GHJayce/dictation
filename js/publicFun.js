function ajax(obj){
	obj = obj || {};
	obj.method = obj.method&&obj.method.toUpperCase() || "POST"; // 整条内容看作三段（运算符分隔），第一成立并且第二成立，obj.method就等于第二，否则为第三
	obj.url = obj.url || "";
	obj.async = obj.async || true;
	obj.data = obj.data || "";
	/**
	 * application/x-www-form-urlencoded;charset=utf-8 默认post传递数据
	 * multipart/form-data 上传文件
	 * application/json json字符串格式
	 * text/xml xml格式
	 */
	obj.contentType = obj.contentType || "application/x-www-form-urlencoded;charset=utf-8";
	obj.success = obj.success || function(){};

	// 处理参数
	var params = [];
	for(var key in obj.data){
		params.push(key + "=" + obj.data[key]);
	}
	params = params.join("&");

	// new 一个AJAX
	var ajax = new XMLHttpRequest();

	switch(obj.method){
		case "POST":
			ajax.open(obj.method,obj.url,obj.async);
			ajax.setRequestHeader("Content-Type",obj.contentType);
			ajax.send(params);
		break;
		case "GET":
			ajax.open(obj.method,obj.url + "?" + params,obj.async);
			ajax.send();
		break;
	}

	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			obj.success(ajax.responseText);
		}
	}
}

function $$(element){
	if(element.charAt(0)=="#"){
		return document.getElementById(element.substring(1,element.length));
	}else{
		return document.querySelector(element);
	}
}

/**
 * trim 去除字符串首尾的空白字符
 * @param str 要处理的字符串
 * @return string
 */
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}

/**
 * getTime 获取时间
 */
function getTime(){
	var th = this,
		date = new Date();

	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;
	this.day = date.getDate();
	this.hour = date.getHours();
	this.minute = date.getMinutes()<10 && "0"+ date.getMinutes() || date.getMinutes();

	/**
	 * now 当前时间
	 * @param dSymbol 日期分隔符
	 *        tSymbol 时间分隔符
	 */
	this.now = function(dSymbol,tSymbol){
		dSymbol = dSymbol || "/";
		tSymbol = tSymbol || ":";
		return th.year +dSymbol+ th.month +dSymbol+ th.day +" "+ th.hour +tSymbol+ th.minute;
	}
}

function getSelected(element){
	var index = element.selectedIndex;
	return element.options[index];
}