// @Date    : 2020-09-12 16:26:48
// @Author  : residuallaugh
var js = [];
var search_data = {};
var static_file = ['.jpg','.png','.gif','.css','.svg','.ico','.js'];
var key = ["ip","ip_port","domain","path","url","sfz","mobile","mail"];
function get_js(){
	return js;
}
function add_js(js_name) {
	js.push(js_name);
}
function unique(arr){
  if(arr == 'null'){
    return null;
  }
  var array=[];
  for (var i = 0;i<arr.length;i++){
    if (array.indexOf(arr[i])===-1){
      array.push(arr[i])
    }
  }
  return array
}
//查找search_data中是否已经存在了，如果已存在则不返回
function find(arr1,arr2) {
  var arr3 = []
  arr1.forEach(function (item,index,array) {
    if(arr2.indexOf(item)==-1){
      arr3.push(item)
    }
  })
  return arr3
}
//去重合并两个数组 并集
function add(arr1,arr2) {
  arr1.forEach(function (item,index,array) {
    if(arr2.indexOf(item)==-1){
      arr2.push(item)
    }
  })
  return arr2
}

//交集
function jiaoji(arr1,arr2) {
  var arr3 = [];
  arr1.forEach(function (item,index,array) {
    if(arr2.indexOf(item)>-1){
      arr3.push(item)
    }
  })
  return arr3
}


function collect_static(arr1,arr2) {
  var arr3 = arr1.slice(0,arr1.length);
  arr1.forEach(function (item,index,array) {
    for (var i = 0; i < static_file.length; i++) {
      if(item.indexOf(static_file[i])!=-1){
        arr2.push(item)
        arr3.splice(arr3.indexOf(item),1)
      }
    }
  })
  return {'arr1':arr3,'static':arr2}
}

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "result"){
      var tmp_data = request.data;
      //遍历所有数据类型
      for (var i = 0; i < key.length; i++) {
        //如果传入的数据没有这个类型，就看下一个
        if (request.data[key[i]] == null){
          continue;
        }
          //如果search_data有历史数据，进行检查
          if (request.data['current'] in search_data){
            for (var j = 0; j < key.length; j++) {
              if (search_data[request.data['current']][key[j]]!=null){
                tmp_data[key[i]] = jiaoji(unique(tmp_data[key[i]]),find(unique(request.data[key[i]]),search_data[request.data['current']][key[j]]))
              }
            }
          }else{
            search_data[request.data['current']] = {}
          }
        if (request.data['current'] in search_data && search_data[request.data['current']][key[i]]!=null ){
          var search_data_value = unique(add(search_data[request.data['current']][key[i]],tmp_data[key[i]])).sort()
          if ('static' in search_data[request.data['current']]){
            var res = collect_static(search_data_value,search_data[request.data['current']]['static'])
          }else{
            var res = collect_static(search_data_value,[])
          }
          search_data[request.data['current']][key[i]] = res['arr1']
          search_data[request.data['current']]['static'] = res['static']
        }else{
          var search_data_value = unique(tmp_data[key[i]]).sort()
          if ('static' in search_data[request.data['current']]){
            var res = collect_static(search_data_value,search_data[request.data['current']]['static'])
          }else{
            var res = collect_static(search_data_value,[])
          }
          search_data[request.data['current']]['static'] = res['static']
          search_data[request.data['current']][key[i]] = res['arr1']
        }
      }
    }
});


function result(host){
  return search_data[host];
}
