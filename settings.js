
document.getElementById("save").onclick=function () {
	let webhook_setting = {};
	webhook_setting['url'] = document.getElementById('url').value;
	webhook_setting['method'] = document.getElementById('method').value;
	webhook_setting['arg'] = document.getElementById('arg').value;
	webhook_setting['headers'] = JSON.parse(document.getElementById('headers').value == '' ? '{}' : document.getElementById('headers').value);
	// console.log(webhook_setting);
	browser.storage.local.set({"webhook_setting": webhook_setting});
}
document.getElementById("reset").onclick=function () {
	let webhook_setting = {"url":"","arg":"","headers":{}};
	document.getElementById('url').value = "";
	document.getElementById('method').value = "GET";
	document.getElementById('arg').value = "";
	document.getElementById('headers').value = "{}";
	browser.storage.local.set({"webhook_setting": webhook_setting});
	// console.log(webhook_setting);
}

document.getElementById("save_allowlist").onclick=function () {
	snsArr = document.getElementById('allowlist').value.split(/[(\r\n)\r\n]+/);
	snsArr.forEach((item, index)=>{
		if(!item){
			snsArr.splice(index,1);
		}
	})
	// console.log(snsArr)
	browser.storage.local.set({"allowlist": snsArr});
}
document.getElementById("reset_allowlist").onclick=function () {
	document.getElementById('allowlist').value = "";
	browser.storage.local.set({"allowlist": []});
}

document.getElementById("global_float").onclick=function () {
	// var webhook_setting = {};
	browser.storage.local.get(["global_float"], function(settings){
		// console.log(settings);
		browser.storage.local.set({"global_float": settings["global_float"]==true ? false : true});
		document.getElementById('global_float').textContent = settings["global_float"]==true ? "已关闭" : "已打开";
	});
	// console.log(webhook_setting);
}

browser.storage.local.get(["webhook_setting"], function(settings){
	// console.log(settings);
	if(!settings || settings == {} || !settings["webhook_setting"] ){
        console.log('获取webhook_setting失败');
        return;
    }
	document.getElementById('url').value = settings["webhook_setting"]['url'];
	document.getElementById('method').value = settings["webhook_setting"]['method'];
	document.getElementById('arg').value = settings["webhook_setting"]['arg'];
	document.getElementById('headers').value = JSON.stringify(settings["webhook_setting"]['headers']);
});
browser.storage.local.get(["global_float"], function(settings){
	document.getElementById('global_float').textContent = settings["global_float"]==true ? "已打开" : "已关闭";});
browser.storage.local.get(["fetch_timeout"], function(settings){
	document.getElementById('fetch_timeout').textContent = settings["fetch_timeout"]==true ? "已打开" : "已关闭";});
browser.storage.local.get(["allowlist"], function(allowlist){
	console.log(allowlist["allowlist"].join('\n'));
	document.getElementById('allowlist').textContent = allowlist["allowlist"].join('\n');});

