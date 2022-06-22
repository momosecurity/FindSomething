// @Date    : 2020-09-12 16:26:48
// @Author  : residuallaugh
var key = ["ip","ip_port","domain","path","incomplete_path","url","static","sfz","mobile","mail","jwt","algorithm","secret"]

function init_copy() {
    var elements = document.getElementsByClassName("copy");
    for (var i=0, len=elements.length|0; i<len; i=i+1|0) {
        let ele_name = elements[i].name;
        elements[i].onclick=function () {
            // console.log('copy begin');
            var inp =document.createElement('textarea');
            document.body.appendChild(inp)
            inp.value =document.getElementById(ele_name).textContent;
            inp.select();
            document.execCommand('copy',false);
            inp.remove();
            // console.log('copy end');
        }
    }
};
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await browser.tabs.query(queryOptions);
  return tab;
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function show_info(result_data) {
    for (var k in key){
        if (result_data[key[k]]!=null && result_data[key[k]].length != 0){
            // console.log(result_data[key[k]])
            let p="";
            for(var i in result_data[key[k]]){
                p = p + result_data[key[k]][i] +'\n'
            }
            document.getElementById(key[k]).style.whiteSpace="pre";
            document.getElementById(key[k]).textContent=p;
        }
    }
}

getCurrentTab().then(function get_info(tab) {
    browser.runtime.sendMessage({greeting: "get", current: tab.url}, function(result_data) {
        if(result_data == undefined || result_data['done']!='done' || result_data==null){
            // console.log('还未提取完成');
            if(result_data != undefined || result_data!=null ){
                show_info(result_data);
                document.getElementById('taskstatus').textContent = "处理中.."+result_data['donetasklist'].length+"/"+result_data['tasklist'].length;
            }else{
                document.getElementById('taskstatus').textContent = "处理中..";
            }
            sleep(1000);
            get_info(tab);
            return;
        }
        document.getElementById('taskstatus').textContent = "处理完成："+result_data['donetasklist'].length+"/"+result_data['tasklist'].length;
        show_info(result_data);
        // 结果不一致继续刷新
        if(result_data['donetasklist'].length!=result_data['tasklist'].length){
            get_info(tab);
        }
        return;
    });
})


init_copy();