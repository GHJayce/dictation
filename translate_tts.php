<?php
	header("Content-Type:audio/mpeg");

	$tk = $_GET['tk'];
	$q = urlencode($_GET['q']);
	$length = strlen($_GET['q']);
	$speed = empty($_GET['ttsspeed']) || $_GET['ttsspeed'] == 0.4 || $_GET['ttsspeed'] == 0.7 ? '' : '&ttsspeed=0.24';

	$url = "https://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&client=t&prev=input&tk=$tk&q=$q&textlen=$length$speed}";
	$timeout = 20;
	$referer = "https://translate.google.cn";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_REFERER,$referer);
	curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
	$conts = curl_exec($ch);
	curl_close($ch);
	echo $conts;