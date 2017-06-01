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

function $(element){
	return document.querySelector(element);
}

function getSelected(element){
	var index = element.selectedIndex;
	return element.options[index];
}