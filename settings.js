
function setTextContentById(id){
    document.getElementById(id).textContent = chrome.i18n.getMessage(id);
}

function init_locales() {
    const settingIdList = [
        "Zhuye",
        "Peizhi",
		"settingClearCache",
		"settingClearLocalStorage",
		"settingGlobalFloatingWindow",
		"settingAutoTimeout",
		"settingWebhook",
		"settingWebhookUrl",
		"settingWebhookMethod",
		"settingWebhookArg",
		"settingWebhookHeaders",
		"settingDomainAllowList",
		"settingSafe"
    ];

    for (const id of settingIdList) {
    	try{
    		setTextContentById(id)
    	}catch{
    		console.log(id)
    	}
        
    }

    const settingResetAndSaveList = document.getElementsByClassName("settingResetAndSave");
    for (const settingResetAndSave of settingResetAndSaveList) {
    	settingResetAndSave.textContent = chrome.i18n.getMessage("settingResetAndSave");
    }
    const settingSaveList = document.getElementsByClassName("settingSave");
    for (const settingSave of settingSaveList) {
    	settingSave.textContent = chrome.i18n.getMessage("settingSave");
    }
    document.getElementById("allowlist").placeholder = chrome.i18n.getMessage("settingDomainAllowListTip");
}

init_locales()

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

document.getElementById("settingClearLocalStorage").onclick=function () {
	chrome.storage.local.clear();
	console.log(chrome.i18n.getMessage("settingClearComplete"));
	alert(chrome.i18n.getMessage("settingClearComplete"));
}

document.getElementById("global_float").onclick=function () {
	// var webhook_setting = {};
	chrome.storage.local.get(["global_float"], function(settings){
		// console.log(settings);
		chrome.storage.local.set({"global_float": settings["global_float"]==true ? false : true});
		document.getElementById('global_float').textContent = settings["global_float"]==true ? chrome.i18n.getMessage("settingClosed") : chrome.i18n.getMessage("settingOpened");
	});
	// console.log(webhook_setting);
}

document.getElementById("fetch_timeout").onclick=function () {
	// var webhook_setting = {};
	chrome.storage.local.get(["fetch_timeout"], function(settings){
		// console.log(settings);
		chrome.storage.local.set({"fetch_timeout": settings["fetch_timeout"]==true ? false : true});
		document.getElementById('fetch_timeout').textContent = settings["fetch_timeout"]==true ? chrome.i18n.getMessage("settingClosed") : chrome.i18n.getMessage("settingOpened");
	});
	// console.log(webhook_setting);
}

document.getElementById("settingSafeMode").onclick=function () {
	// var webhook_setting = {};
	chrome.storage.local.get(["settingSafeMode"], function(settings){
		// console.log(settings);
		chrome.storage.local.set({"settingSafeMode": settings["settingSafeMode"]==true ? false : true});
		document.getElementById('settingSafeMode').textContent = settings["settingSafeMode"]==true ? chrome.i18n.getMessage("settingClosed") : chrome.i18n.getMessage("settingOpened");
	});
}


chrome.storage.local.get(["webhook_setting"], function(settings){
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
chrome.storage.local.get(["global_float"], function(settings){
	document.getElementById('global_float').textContent = settings["global_float"]==true ? chrome.i18n.getMessage("settingOpened") : chrome.i18n.getMessage("settingClosed");
});
chrome.storage.local.get(["fetch_timeout"], function(settings){
	document.getElementById('fetch_timeout').textContent = settings["fetch_timeout"]==true ? chrome.i18n.getMessage("settingOpened") : chrome.i18n.getMessage("settingClosed");
});

chrome.storage.local.get(["settingSafeMode"], function(settings){
	document.getElementById('settingSafeMode').textContent = settings["settingSafeMode"]==true ? chrome.i18n.getMessage("settingOpened") : chrome.i18n.getMessage("settingClosed");
	if(settings["settingSafeMode"]==null){
		chrome.storage.local.set({"settingSafeMode": true});
		document.getElementById('settingSafeMode').textContent = chrome.i18n.getMessage("settingOpened");
	}
});
chrome.storage.local.get(["allowlist"], function(allowlist){
	if(allowlist && allowlist["allowlist"]){
		document.getElementById('allowlist').textContent = allowlist["allowlist"].join('\n');
	}
});
