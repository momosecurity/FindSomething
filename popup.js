// @Date    : 2020-09-12 16:26:48
// @Author  : residuallaugh
function setTextContentById(id){
    document.getElementById(id).textContent = chrome.i18n.getMessage(id);
}

function init_locales() {
    const popupIdList = [
        "Zhuye",
        "Peizhi",
        "popupIp",
        "popupIpPort",
        "popupDomain",
        "popupSfz",
        "popupMobile",
        "popupMail",
        "popupJwt",
        "popupAlgorithm",
        "popupSecret",
        "popupPath",
        "popupIncompletePath",
        "popupUrl",
        "popupStaticPath",
    ];

    for (const id of popupIdList) {
        try{
            setTextContentById(id)
        }catch{
            console.log(id)
        }
    }

    
}

init_locales()

var key = ["ip","ip_port","domain","path","incomplete_path","url","static","sfz","mobile","mail","jwt","algorithm","secret"]

function init_copy() {
    var elements = document.getElementsByClassName("copy");
    if(elements){
        for (var i=0, len=elements.length|0; i<len; i=i+1|0) {
            elements[i].textContent = chrome.i18n.getMessage("popupCopy");
            let ele_name = elements[i].name;
            let ele_id = elements[i].id;
            if (ele_id == "popupCopyurl"){
                elements[i].textContent = chrome.i18n.getMessage("popupCopyurl");
            }
            elements[i].onclick=function () {
                var inp =document.createElement('textarea');
                document.body.appendChild(inp)
                var copytext = document.getElementById(ele_name).textContent;
                if (ele_id == "popupCopyurl"){
                    Promise.all([getCurrentTab().then(function x(tab){
                        // console.log(tab);
                        if(tab == undefined){
                            alert(chrome.i18n.getMessage("popupTipClickBeforeCopy"))
                            return;
                        }
                        var url = new URL(tab.url)
                        var path_list = copytext.split('\n')
                        copytext = ""
                        for (var i = path_list.length - 1; i >= 0; i--) {
                            if(path_list[i][0] == '.'){
                                copytext += url.origin+'/'+path_list[i]+'\n';
                            }else{
                                copytext += url.origin+path_list[i]+'\n';
                            }
                        }
                        inp.value = copytext.slice(0, -1);
                        inp.select();
                        // console.log(copytext)
                        document.execCommand('copy',false);
                        // inp.remove();
                    })]).then(res=> inp.remove())
                    // alert('复制成功');
                    return ;
                }
                inp.value = copytext;
                inp.select();
                document.execCommand('copy',false);
                inp.remove();
                // alert('复制成功');
            }
        }
    }
};


async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function show_info(result_data) {
    for (var k in key){
        if (result_data[key[k]]){
            // console.log(result_data[key[k]])
            let container = document.getElementById(key[k]);
            while((ele = container.firstChild)){
                ele.remove();
            }
            container.style.whiteSpace = "pre";
            for (var i in result_data[key[k]]){
                let tips = document.createElement("div");
                tips.setAttribute("class", "tips")
                let link = document.createElement("a");
                let source = result_data['source'][result_data[key[k]][i]];
                if (source) {
                    //虽然无法避免被xss，但插件默认提供了正确的CSP，这意味着我们即使不特殊处理，javascript也不会被执行。
                    // source = 'javascript:console.log`1`'
                    link.setAttribute("href", source);
                    link.setAttribute("title", source);
                }
                link.appendChild(tips);
                let span = document.createElement("span");
                span.textContent = result_data[key[k]][i]+'\n';
                container.appendChild(link);
                container.appendChild(span);
            }
        }
    }
}

getCurrentTab().then(function get_info(tab) {
    chrome.storage.local.get(["findsomething_result_"+tab.url], function(result_data) {
        if (!result_data){
            return;
        }
        result_data = result_data["findsomething_result_"+tab.url]
        // console.log(result_data)
        if (!result_data){
            return;
        }
        show_info(result_data);
        if(result_data.donetasklist){
            if(result_data['done']!='done'){
               document.getElementById('taskstatus').textContent = chrome.i18n.getMessage("popupProcessing") + result_data['donetasklist'].length+"/"+result_data['tasklist'].length;
            }else{
                document.getElementById('taskstatus').textContent = chrome.i18n.getMessage("popupComplete") + result_data['donetasklist'].length+"/"+result_data['tasklist'].length;
            }
        }else{
            document.getElementById('taskstatus').textContent = chrome.i18n.getMessage("popupProcessing");
        }
        return;
    });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    getCurrentTab().then(function get_info(tab) {
        for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
            if(key=="findsomething_result_"+tab.url){
                const result_data = newValue;
                // console.log(newValue)
                show_info(result_data);
                if(result_data.donetasklist){
                    if(result_data['done']!='done'){
                       document.getElementById('taskstatus').textContent = chrome.i18n.getMessage("popupProcessing") + result_data['donetasklist'].length+"/"+result_data['tasklist'].length;
                    }else{
                        document.getElementById('taskstatus').textContent = chrome.i18n.getMessage("popupComplete") + result_data['donetasklist'].length+"/"+result_data['tasklist'].length;
                    }
                }else{
                    document.getElementById('taskstatus').textContent = chrome.i18n.getMessage("popupProcessing");
                }
            }
        }
    })
})

init_copy();