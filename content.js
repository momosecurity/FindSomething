// @Date    : 2020-09-12 16:26:48
// @Author  : residuallaugh
(function(){
    var protocol = window.location.protocol;
    var host = window.location.host;
    var domain_host = host.split(':')[0];
    var href = window.location.href;
    // var source = document.getElementsByTagName('html')[0].innerHTML;
    var source = document.documentElement.outerHTML;
    var hostPath;
    var urlPath;
    var urlWhiteList = ['.google.com','.amazon.com','portswigger.net'];
    var target_list = [];
    var source_href = source.match(/href=['"].*?['"]/g);
    var source_src = source.match(/src=['"].*?['"]/g);
    var script_src = source.match(/<script [^><]*?src=['"].*?['"]/g);
    chrome.storage.local.get(["allowlist"], function(settings){
        // console.log(settings , settings['allowlist'])
        if(settings && settings['allowlist']){
            urlWhiteList = settings['allowlist'];
        }
        for(var i = 0;i < urlWhiteList.length;i++){
            if(host.endsWith(urlWhiteList[i]) || domain_host.endsWith(urlWhiteList[i])){
                console.log('域名在白名单中，跳过当前页')
                return ;
            }
        }
        // target_list.push(window.location.href);
        
        // console.log(source_href,source_src,script_src)
        if(source_href){
            for(var i=0;i<source_href.length;i++){
                var u = deal_url(source_href[i].substring(6,source_href[i].length-1));
                if(u){
                    target_list.push(u);
                }
            }
        }
        if(source_src){
            for(var i=0;i<source_src.length;i++){
                var u = deal_url(source_src[i].substring(5,source_src[i].length-1));
                if(u){
                    target_list.push(u);
                }
            }
        }
        
        const tmp_target_list=[];
        for (var i = 0;i<target_list.length;i++){
            if (tmp_target_list.indexOf(target_list[i])===-1){
              tmp_target_list.push(target_list[i])
            }
        }
        tmp_target_list.pop(href)
        chrome.runtime.sendMessage({greeting: "find",data: target_list, current: href, source: source});
    });
    function is_script(u){
        if(script_src){
            for(var i=0;i<script_src.length;i++){
                if (script_src[i].indexOf(u)>0){
                    return true
                }
            }
        }
        return false
    }

    function deal_url(u){
        if(u.indexOf(".js")=='-1' && !is_script(u)){
            return ;
        }else if(u.substring(0,4)=="http"){
            return u;
        }
        else if(u.substring(0,2)=="//"){
            return protocol+u;
        }
        else if(u.substring(0,1)=='/'){
            return protocol+'//'+host+u;
        }
        else if(u.substring(0,2)=='./'){
            if (href.indexOf('#')>0) {
                tmp_href = href.substring(0,href.indexOf('#'))
            }else{
                tmp_href = href;
            }
            return tmp_href.substring(0,tmp_href.lastIndexOf('/')+1)+u;
        }else{
            // console.log("not match prefix:"+u+",like http // / ./")
            if (href.indexOf('#')>0) {
                tmp_href = href.substring(0,href.indexOf('#'))
            }else{
                tmp_href = href;
            }
            return tmp_href.substring(0,tmp_href.lastIndexOf('/')+1)+u;
        }
    }
    

})()


chrome.storage.local.get(["global_float"], function(settings){
    // console.log(settings);
    if (settings["global_float"]!=true){
        return
    }
    // console.log(settings["global_float"]);
    // console.log("findsomething-divglobal_float");
    // 使用自定义标签
    const body = document.getElementsByTagName('html')[0];
    const div = document.createElement('div');
    div.setAttribute("id","findsomething-float-div");
    div.innerHTML = `
    <findsomething-div id="findsomething_neko" style="width:410px;max-height:500px;font-size:14px;color:#000000;box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1) ;background-color: #fff;border-radius: 5px;border: 1px solid #ebebeb;left:20px;top:20px;position: fixed;z-index: 1000000;overflow:scroll;">
          <findsomething-div id="findsomething_neko-title" style="display: flex;justify-content: space-between;">
            <findsomething-div id="findsomething_taskstatus" style="height: 34px; line-height: 34px; margin-left: 10px;"></findsomething-div>
            <findsomething-div style="cursor: pointer;margin-top: 2px;margin-right: 10px;" onclick='(function(){document.getElementById("findsomething-float-div").removeChild(document.getElementById("neko"));})()'>隐藏</findsomething-div>
          </findsomething-div>
            <findsomething-div style="width: 300px; margin-top: 10px;">
                <findsomething-div class="findsomething-title">IP<button type="button" class="finsomething_copy" name="ip">复制</button></findsomething-div>
                <findsomething-p id="findsomething_ip" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">IP_PORT<button class="findsomething_copy" name="ip_port">复制</button></findsomething-div>
                <findsomething-p id="findsomething_ip_port" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">域名<button class="findsomething_copy" name="domain">复制</button></findsomething-div>
                <findsomething-p id="findsomething_domain" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">身份证<button class="findsomething_copy" name="sfz">复制</button></findsomething-div>
                <findsomething-p id="findsomething_sfz" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">手机号<button class="findsomething_copy" name="mobile">复制</button></findsomething-div>
                <findsomething-p id="findsomething_mobile" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">邮箱<button class="findsomething_copy" name="mail">复制</button></findsomething-div>
                <findsomething-p id="findsomething_mail" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">JWT<button class="findsomething_copy" name="jwt">复制</button></findsomething-div>
                <findsomething-p id="findsomething_jwt" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">算法<button class="findsomething_copy" name="algorithm">复制</button></findsomething-div>
                <findsomething-p id="findsomething_algorithm" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">Secret<button class="findsomething_copy" name="secret">复制</button></findsomething-div>
                <findsomething-p id="findsomething_secret" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">Path<button class="findsomething_copy" name="path">复制</button></findsomething-div>
                <findsomething-p id="findsomething_path" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">IncompletePath<button class="findsomething_copy" name="incomplete_path">复制</button></findsomething-div>
                <findsomething-p id="findsomething_incomplete_path" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">Url<button class="findsomething_copy" name="url">复制</button></findsomething-div>
                <findsomething-p id="findsomething_url" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
                <findsomething-div class="findsomething-title">StaticUrl<button class="findsomething_copy" name="static">复制</button></findsomething-div>
                <findsomething-p id="findsomething_static" style="word-break:break-word;margin-left:10px;">🈚️</findsomething-p>
            </findsomething-div>
    </findsomething-div>
        <style type="text/css">
        .findsomething_copy {
            border-style: none;
            background-color: #ffffff;
            float: right;
            margin-right: 0px;
            font-size: 14px;
        }
        findsomething-div{
            display: block;
        }
        findsomething-p {
            display: block;
            margin-top: 14px;
            margin-bottom: 14px;
            line-height: 14px;
        }

        .findsomething-title {
            font-size: 16px;
            font-weight: bold;
            border-left: 4px solid black;
            text-indent: 4px;
            height: 16px;
            line-height: 16px;
            width: 100%;
            margin-left: 10px;
        }

        button{
            cursor: pointer
        }
        </style>
        `
    body.appendChild(div)
    var neko = document.querySelector('#findsomething_neko');
    var nekoW = neko.offsetWidth;
    var nekoH = neko.offsetHeight;
    var cuntW = 0;
    var cuntH = 0;
    neko.style.left = parseInt(document.body.offsetWidth - nekoW)+1 + 'px';
    neko.style.top = '50px';
    move(neko, 0, 0);
    function move(obj, w, h) {
        if (obj.direction === 'left') {
            obj.style.left = 0 - w + 'px';
        } else if (obj.direction === 'right') {

            obj.style.left = document.body.offsetWidth - nekoW + w + 'px';
        }
        if (obj.direction === 'top') {
            obj.style.top = 0 - h + 'px';
        } else if (obj.direction === 'bottom') {
            obj.style.top = document.body.offsetHeight - nekoH + h + 'px';
        }
    }

    function rate(obj, a) {
        //  console.log(a);
        obj.style.transform = ' rotate(' + a + ')'
    }

    var nekotitle = document.querySelector('#findsomething_neko-title');
    nekotitle.onmousedown = function (e) {
        var nekoL = e.clientX - neko.offsetLeft;
        var nekoT = e.clientY - neko.offsetTop;
        document.onmousemove = function (e) {
            cuntW = 0;
            cuntH = 0;
            neko.direction = '';
            neko.style.transition = '';
            neko.style.left = (e.clientX - nekoL) + 'px';
            neko.style.top = (e.clientY - nekoT) + 'px';
            if (e.clientX - nekoL < 5) {
                neko.direction = 'left';
            }
            if (e.clientY - nekoT < 5) {
                neko.direction = 'top';
            }
            if (e.clientX - nekoL > document.body.offsetWidth - nekoW - 5) {
                neko.direction = 'right';
            }
            if (e.clientY - nekoT > document.body.offsetHeight - nekoH - 5) {
                neko.direction = 'bottom';
            }

            move(neko, 0, 0);


        }
    }
    neko.onmouseover = function () {
        move(this, 0, 0);
        rate(this, 0)
    }

    neko.onmouseout = function () {
        // move(this, nekoW / 2, nekoH / 2);
        move(this, nekoW / 2, 0);
        // move(this, 0, 0);
    }

    neko.onmouseup = function () {
        document.onmousemove = null;
        this.style.transition = '.5s';
        // move(this, nekoW / 2, nekoH / 2);
        move(this, nekoW / 2, 0);
    }

    window.onresize = function () {
        var bodyH = document.body.offsetHeight;
        var nekoT = neko.offsetTop;
        var bodyW = document.body.offsetWidth;
        var nekoL = neko.offsetLeft;

        if (nekoT + nekoH > bodyH) {
            neko.style.top = bodyH - nekoH + 'px';
            cuntH++;
        }
        if (bodyH > nekoT && cuntH > 0) {
            neko.style.top = bodyH - nekoH + 'px';
        }
        if (nekoL + nekoW > bodyW) {
            neko.style.left = bodyW - nekoW + 'px';
            cuntW++;
        }
        if (bodyW > nekoL && cuntW > 0) {
            neko.style.left = bodyW - nekoW + 'px';
        }

        // move(neko, nekoW / 2, nekoH / 2);
        move(this, nekoW / 2, 0);
        // move(this, 0, 0);
    }
});

function init_copy() {
    var elements = document.getElementsByClassName("findsomething_copy");
    if (elements) {
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
    }
};
setTimeout(()=>{
    init_copy();
}, 500);

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var key = ["ip","ip_port","domain","path","incomplete_path","url","static","sfz","mobile","mail","jwt","algorithm","secret"]

function show_info(result_data) {
    if(result_data){
        for (var k in key){
            if (result_data[key[k]]){
                // console.log(result_data[key[k]])
                let p="";
                for(var i in result_data[key[k]]){
                    p = p + result_data[key[k]][i] +'\n'
                }
                document.getElementById("findsomething_"+key[k]).style.whiteSpace="pre";
                document.getElementById("findsomething_"+key[k]).textContent=p;
            }
        }
    }
}
function get_info() {
    chrome.runtime.sendMessage({greeting: "get", current: window.location.href}, function(result_data) {
        let taskstatus = document.getElementById('findsomething_taskstatus');
        if(!taskstatus){
            return;
        }
        if(!result_data|| result_data['done']!='done'){
            // console.log('还未提取完成');
            if(result_data){
                show_info(result_data);

                taskstatus.textContent = "处理中.."+result_data['donetasklist'].length+"/"+result_data['tasklist'].length;
            }else{
                taskstatus.textContent = "处理中..";
            }
            sleep(100);
            get_info();
            return;
        }
        taskstatus.textContent = "处理完成："+result_data['donetasklist'].length+"/"+result_data['tasklist'].length;
        show_info(result_data);
        // 结果不一致继续刷新
        if(result_data['donetasklist'].length!=result_data['tasklist'].length){
            get_info();
        }
        return;
    });
}
get_info();