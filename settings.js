
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
	let webhook_setting = {"url":"","arg":"","headers":{}};
	document.getElementById('url').value = "";
	document.getElementById('arg').value = "";
	document.getElementById('headers').value = "{}";
	// console.log(webhook_setting);
	chrome.storage.local.set({"webhook_setting": webhook_setting});
}

document.getElementById("save_allowlist").onclick=function () {
	snsArr = document.getElementById('allowlist').value.split(/[(\r\n)\r\n]+/);
	snsArr.forEach((item, index)=>{
		if(!item){
			snsArr.splice(index,1);
		}
	})
	// console.log(snsArr)
	chrome.storage.local.set({"allowlist": snsArr});
}
document.getElementById("reset_allowlist").onclick=function () {
	document.getElementById('allowlist').value = "";
	chrome.storage.local.set({"allowlist": []});
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

document.getElementById("fetch_timeout").onclick=function () {
	// var webhook_setting = {};
	chrome.storage.local.get(["fetch_timeout"], function(settings){
		// console.log(settings);
		chrome.storage.local.set({"fetch_timeout": settings["fetch_timeout"]==true ? false : true});
		document.getElementById('fetch_timeout').textContent = settings["fetch_timeout"]==true ? "已关闭" : "已打开";
	});
	// console.log(webhook_setting);
}

chrome.storage.local.get(["webhook_setting"], function(settings){
	console.log(settings);
	if(!settings || settings == {} || !settings["webhook_setting"] ){
        console.log('获取webhook_setting失败');
        return;
    }
	document.getElementById('url').value = settings["webhook_setting"]['url'];
	document.getElementById('method').value = settings["webhook_setting"]['method'];
	document.getElementById('arg').value = settings["webhook_setting"]['arg'];
	document.getElementById('headers').value = JSON.stringify(settings["webhook_setting"]['headers']);
});
chrome.storage.local.get(["global_float"], function(settings){
	document.getElementById('global_float').textContent = settings["global_float"]==true ? "已打开" : "已关闭";
});
chrome.storage.local.get(["fetch_timeout"], function(settings){
	document.getElementById('fetch_timeout').textContent = settings["fetch_timeout"]==true ? "已打开" : "已关闭";
});
chrome.storage.local.get(["allowlist"], function(allowlist){
	if(allowlist && allowlist["allowlist"]){
		document.getElementById('allowlist').textContent = allowlist["allowlist"].join('\n');
	}
});
