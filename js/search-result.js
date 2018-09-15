/**
 * Created by Tiger Liu on 2018/9/13.
 */
var keyword = getParamsByUrl(location.href, 'keyword');

var page = 1;

var html = "";

var priceSort = 1;

var numSort = 1;

var This = null;
$(function(){

    mui.init({
        pullRefresh : {
            container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在努力加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'已经没有更多了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback : getData//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //价格排序的实现
    $('#priceSort').on("tap",function(){
        priceSort = priceSort == 1 ? 2 : 1;
        html = '';
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();

    });

    $('#numSort').on('tap' , function(){
        numSort = numSort == 1 ? 2 : 1;
        html = '';
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
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

function getData(){
    if(!This){
        This = this;
    }
    $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data:{
            page: page++,
            pageSize: 3,
            proName: keyword,
            price: priceSort,
            num: numSort
        },
        success:function(res){
            //console.log(res);
            html += template("searchTpl", res);
            $('#search-box').html(html);

            This.endPullupToRefresh(res.data.length == 0);
        }
    });
}