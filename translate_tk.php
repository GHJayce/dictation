<?php
	$tex = empty($_GET['tex']) ? '':$_GET['tex'];
	$timeout = 10;
	$url = "https://translate.google.cn";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
	$conts = curl_exec($ch);
	curl_close($ch);
	if(preg_match("#TKK\=eval\('\(\(function\(\)\{var\s+a\\\\x3d(-?\d+);var\s+b\\\\x3d(-?\d+);return\s+(\d+)\+#isU", $conts, $arr)){
	    $tkk = $arr[3] .'.'.($arr[1] + $arr[2]);
	}else{
	    exit(false);
	}
?>
<body onload="run()">
<script>
window.jstiming={load:{tick:function(str){return str}}}
</script>
<script src="http://translate.google.cn/translate/releases/twsfe_20161212_RC00/r/js/desktop_module_main.js"></script>
<?php echo "<script>function run(){ik='$tkk';var a=jk('$tex').replace(/&tk=/,'');document.body.innerText = a;}</script>"?>