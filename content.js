// @Date    : 2020-09-12 16:26:48
// @Author  : residuallaugh
(function(){
    var protocol = window.location.protocol;
    var host = window.location.host;
    var href = window.location.href;
    var source = document.getElementsByTagName('html')[0].innerHTML;
    var hostPath;
    var urlPath;
    var urlWhiteList = ['baidu.com','google.com'];
    for(var i = 0;i < urlWhiteList.length;i++){
        if(urlWhiteList[i].indexOf(host) != "-1"){
            return false;
        }
    }

    findsomething(window.location.href);

    var source_href = source.match(/href=\".*?\"/g);
    var source_src = source.match(/src=\".*?\"/g);
    // console.log(source_href,source_src)
    if(source_href){
        for(var i=0;i<source_href.length;i++){
            var u = deal_url(source_href[i].replace('href=\"','').replace('\"',''));
            if(u){
                findsomething(u);
            }
        }
    }
    if(source_src){
        for(var i=0;i<source_src.length;i++){
            var u = deal_url(source_src[i].replace('src=\"','').replace('\"',''));
            if(u){
                findsomething(u);
            }
        }
    }
    function deal_url(u){
        if(u.indexOf(".js")=='-1'){
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
            console.log(u)
            return ;
        }
    }
    

    function findsomething(url){
        $.ajax({
                url: url,
                type: 'get',
                dataType: 'text',
                async:false,
            })
        .done(function(data) {
                var search_data = {'current':href}
                search_data['sfz'] = data.match(/['"]\d{14}[0-9a-zA-Z]{4}['"]/g);
                search_data['mobile'] = data.match(/['"]((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}['"]/g);
                search_data['mail'] = data.match(/['"][a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+['"]/g);
                // var equal = data.match(/[\',\"].*?[\',\"]==[\',\"].*?[\',\"]/g);
                search_data['ip'] = data.match(/['"]\d+\.\d+\.\d+\.\d+['"]/g);
                search_data['ip_port'] = data.match(/['"]\d+\.\d+\.\d+\.\d+\:\d+['"]/g);
                search_data['domain'] = data.match(/['"][a-zA-Z0-9\-\.]*?\.(xin|com|cn|net|com.cn|vip|top|cc|shop|club|wang|xyz|luxe|site|news|pub|fun|online|win|red|loan|ren|mom|net.cn|org|link|biz|bid|help|tech|date|mobi|so|me|tv|co|vc|pw|video|party|pics|website|store|ltd|ink|trade|live|wiki|space|gift|lol|work|band|info|click|photo|market|tel|social|press|game|kim|org.cn|games|pro|men|love|studio|rocks|asia|group|science|design|software|engineer|lawyer|fit|beer|我爱你|中国|公司|网络|在线|网址|网店|集团|中文网)['"]/g);
                search_data['path'] = data.match(/['"]\/[^/][^>< \)\(\{\}]*?['"]/g);
                search_data['url'] = data.match(/['"](([a-zA-Z0-9]+:)?\/\/)?[a-zA-Z0-9\-\.]*?\.(xin|com|cn|net|com.cn|vip|top|cc|shop|club|wang|xyz|luxe|site|news|pub|fun|online|win|red|loan|ren|mom|net.cn|org|link|biz|bid|help|tech|date|mobi|so|me|tv|co|vc|pw|video|party|pics|website|store|ltd|ink|trade|live|wiki|space|gift|lol|work|band|info|click|photo|market|tel|social|press|game|kim|org.cn|games|pro|men|love|studio|rocks|asia|group|science|design|software|engineer|lawyer|fit|beer|我爱你|中国|公司|网络|在线|网址|网店|集团|中文网)(\/.*?)?['"]/g);
                browser.runtime.sendMessage({greeting: "result",data: search_data}, function(response) { }  );
                // console.log(search_data)
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
