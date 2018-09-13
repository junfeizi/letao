/**
 * Created by Tiger Liu on 2018/9/13.
 */
$(function(){
    var keyword = getParamsByUrl(location.href, 'keyword');
    //console.log(keyword);
    $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data:{
            page: 1,
            pageSize: 6,
            proName: keyword
        },
        success:function(res){
            //console.log(res);
            var html = template("searchTpl", res);
            $('#search-box').html(html);
        }

    })

});
//获取地址栏中想要的键值函数
function getParamsByUrl(url, name) {
    //以?分割传入的地址,+1是为了排除?
    var params = url.substr(url.indexOf('?')+1);
    //再以&分割剩下的字符串,形成一个数组
    var param = params.split('&');
    //循环遍历这个数组
    for(var i=0;i<param.length;i++){
        //再以=分割这个字符串,形成键值对
        var current = param[i].split('=');
        //判断数组里面的键是不是我想要的那个键
        if(current[0] == name){
            //如果是就返回值
            return current[1]
        }
    }
    //不是就返回空
    return null;
}