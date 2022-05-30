// @Date    : 2020-09-12 16:26:48
// @Author  : residuallaugh
(function(){
    var protocol = window.location.protocol;
    var host = window.location.host;
    var href = window.location.href;
    var source = document.getElementsByTagName('html')[0].innerHTML;
    var hostPath;
    var urlPath;
    var urlWhiteList = ['google.com'];
    for(var i = 0;i < urlWhiteList.length;i++){
        if(host.indexOf(urlWhiteList[i]) != -1){
            return false;
        }
    }

    findsomething(window.location.href);

    var source_href = source.match(/href=['"].*?['"]/g);
    var source_src = source.match(/src=['"].*?['"]/g);
    var script_src = source.match(/<script [^><]*?src=['"].*?['"]/g);
    // console.log(source_href,source_src,script_src)
    if(source_href){
        for(var i=0;i<source_href.length;i++){
            var u = deal_url(source_href[i].substring(6,source_href[i].length-1));
            if(u){
                findsomething(u);
            }
        }
    }
    if(source_src){
        for(var i=0;i<source_src.length;i++){
            var u = deal_url(source_src[i].substring(5,source_src[i].length-1));
            if(u){
                findsomething(u);
            }
        }
    }
    
    function is_script(u){
        for(var i=0;i<script_src.length;i++){
            if (script_src[i].indexOf(u)>0){
                return true
            }
        }
        return false
    }

    function deal_url(u){
        if(u.indexOf(".js")=='-1' && !is_script(u)){
            return ;
        }else if(u.substring(0,4)=="http"){
            if(u.indexOf('?')!='-1'){
                return u.substring(0,u.indexOf('?'));
            }
            else{
                return u;
            }
        }
        else if(u.substring(0,2)=="//"){
            return protocol+u;
        }
        else if(u.substring(0,1)=='/'){
            return protocol+'//'+host+u;
        }
        else if(u.substring(0,2)=='./'){
            tmp_href = href.substring(0,href.indexOf('#'))
            return tmp_href.substring(0,tmp_href.lastIndexOf('/')+1)+u;
        }else{
            // console.log("not match prefix:"+u+",like http // / ./")
            tmp_href = href.substring(0,href.indexOf('#'))
            return tmp_href.substring(0,tmp_href.lastIndexOf('/')+1)+u;
        }
    }
    

    function findsomething(url){
        $.ajax({
                url: url,
                type: 'get',
                dataType: 'text',
            })
        .done(function(data) {
                chrome.extension.sendMessage({greeting: "result",data: data, current: href}, function(response) { }  );
            })
        return ;
    }
    function show(url,something){
        if(something){
            console.log('----------------'+'find something in '+url+'!!!!!----------------');
            console.log(something);
        }else{
            return;
        }       
    }
})()
