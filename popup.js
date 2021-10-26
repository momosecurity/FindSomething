// @Date    : 2020-09-12 16:26:48
// @Author  : residuallaugh
const bg = chrome.extension.getBackgroundPage();
var key = ["ip","ip_port","domain","path","url","static","sfz","mobile","mail","jwt","algorithm"]
chrome.tabs.getSelected(null, function (tab) {
        var current=tab.url;
        var result_data = bg.result(current);
        for (var k in key){
            if (result_data[key[k]]!=null && result_data[key[k]].length != 0){
                // console.log(result_data[key[k]])
                let p="";
                for(var i in result_data[key[k]]){
                    p = p + result_data[key[k]][i] +'\n'
                }
                $("p#"+key[k]).css("white-space","pre");
                $("p#"+key[k]).text(p);
            }
        }
});