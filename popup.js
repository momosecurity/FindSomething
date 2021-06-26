// @Date    : 2020-09-12 16:26:48
// @Author  : residuallaugh
const bg = chrome.extension.getBackgroundPage();
var result;
var current;
var key = ["ip","ip_port","domain","path","url","static","sfz","mobile","mail","jwt","algorithm"]
chrome.tabs.getSelected(null, function (tab) {
        current=tab.url;
        result = bg.result(current);
        console.log(result)
        for (var k in key){
            if (result[key[k]]!=null && result[key[k]].length != 0){
                console.log(result[key[k]])
                let p="";
                for(var i in result[key[k]]){
                    p = p + result[key[k]][i] +'\n'
                }
                document.getElementById(key[k]).innerText=p;
            }
        }
});

