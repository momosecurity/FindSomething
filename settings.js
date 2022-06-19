
document.getElementById("save").onclick=function () {
	let webhook_setting = {};
	webhook_setting['url'] = document.getElementById('url').value;
	webhook_setting['method'] = document.getElementById('method').value;
	webhook_setting['arg'] = document.getElementById('arg').value;
	webhook_setting['headers'] = JSON.parse(document.getElementById('headers').value);
	// console.log(webhook_setting);
	chrome.storage.local.set({"webhook_setting": webhook_setting});
}
document.getElementById("reset").onclick=function () {
	// var webhook_setting = {};
	document.getElementById('url').value = "";
	document.getElementById('arg').value = "";
	document.getElementById('headers').value = "{}";
	// console.log(webhook_setting);
}

document.getElementById("global_float").onclick=function () {
	// var webhook_setting = {};
	chrome.storage.local.get(["global_float"], function(settings){
		// console.log(settings);
		chrome.storage.local.set({"global_float": settings["global_float"]==true ? false : true});
		document.getElementById('global_float').textContent = settings["global_float"]==true ? "已关闭" : "已打开";
	});
	// console.log(webhook_setting);
}

chrome.storage.local.get(["webhook_setting"], function(settings){
	console.log(settings);
	if(settings["webhook_setting"] == {}){
        console.log('获取webhook_setting失败');
        return;
    }
	document.getElementById('url').value = settings["webhook_setting"]['url'];
	document.getElementById('method').value = settings["webhook_setting"]['method'];
	document.getElementById('arg').value = settings["webhook_setting"]['arg'];
	document.getElementById('headers').value = JSON.stringify(settings["webhook_setting"]['headers']);
});
chrome.storage.local.get(["global_float"], function(settings){
	document.getElementById('global_float').textContent = settings["global_float"]==true ? "已打开" : "已关闭";});
