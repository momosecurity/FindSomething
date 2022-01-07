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
    var script_src = source.match(/<script [^><]+src=\".*?\"/g);
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
            console.log(u)
            return ;
        }
    }
    

    function findsomething(url){
        $.ajax({
                url: url,
                type: 'get',
                dataType: 'text',
            })
        .done(function(data) {
                var search_data = {'current':href}
                search_data['sfz'] = data.match(/['"]((\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)))['"]/g);
                search_data['mobile'] = data.match(/['"](1(3([0-35-9]\d|4[1-8])|4[14-9]\d|5([\d]\d|7[1-79])|66\d|7[2-35-8]\d|8\d{2}|9[89]\d)\d{7})['"]/g);
                search_data['mail'] = data.match(/['"][a-zA-Z0-9\._\-]*@[a-zA-Z0-9\._\-]{1,63}\.((?!js|css|jpg|jpeg|png|ico)[a-zA-Z]{2,})['"]/g);
                search_data['ip'] = data.match(/['"]\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}['"]/g);
                search_data['ip_port'] = data.match(/['"]\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{1,3}['"]/g);
                search_data['domain'] = data.match(/['"][a-zA-Z0-9\-\.]*?\.(xin|com|cn|net|com.cn|vip|top|cc|shop|club|wang|xyz|luxe|site|news|pub|fun|online|win|red|loan|ren|mom|net.cn|org|link|biz|bid|help|tech|date|mobi|so|me|tv|co|vc|pw|video|party|pics|website|store|ltd|ink|trade|live|wiki|space|gift|lol|work|band|info|click|photo|market|tel|social|press|game|kim|org.cn|games|pro|men|love|studio|rocks|asia|group|science|design|software|engineer|lawyer|fit|beer|我爱你|中国|公司|网络|在线|网址|网店|集团|中文网)['"]/g);
                search_data['path'] = data.match(/['"]\/[^\/\>\< \)\(\{\}\,\'\"\\]([^\>\< \)\(\{\}\,\'\"\\])*?['"]/g);
                search_data['url'] = data.match(/['"](([a-zA-Z0-9]+:)?\/\/)?[a-zA-Z0-9\-\.]*?\.(xin|com|cn|net|com.cn|vip|top|cc|shop|club|wang|xyz|luxe|site|news|pub|fun|online|win|red|loan|ren|mom|net.cn|org|link|biz|bid|help|tech|date|mobi|so|me|tv|co|vc|pw|video|party|pics|website|store|ltd|ink|trade|live|wiki|space|gift|lol|work|band|info|click|photo|market|tel|social|press|game|kim|org.cn|games|pro|men|love|studio|rocks|asia|group|science|design|software|engineer|lawyer|fit|beer|我爱你|中国|公司|网络|在线|网址|网店|集团|中文网)(\/.*?)?['"]/g);
                search_data['jwt'] = data.match(/['"'](ey[A-Za-z0-9_-]{10,}\.[A-Za-z0-9._-]{10,}|ey[A-Za-z0-9_\/+-]{10,}\.[A-Za-z0-9._\/+-]{10,})['"']/g);
                // search_data['algorithm'] = data.match(/\WBase64\.encode\(|\WBase64\.decode\(|\Wbtoa\(|\Watob\(|\WCryptoJS\.AES\.|\WCryptoJS\.DES\.|\WJSEncrypt\(|\Wrsa\.|\WKJUR\.|\W$\.md5\(|\Wmd5\(|\Wsha1\(|\Wsha256\(|\Wsha512\(/gi);
                search_data['algorithm'] = data.match(/\W(Base64\.encode|Base64\.decode|btoa|atob|CryptoJS\.AES|CryptoJS\.DES|JSEncrypt|rsa|KJUR|$\.md5|md5|sha1|sha256|sha512)[\(\.]/gi);
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
