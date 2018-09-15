
var userInfo = null;

$.ajax({
    url: "/user/queryUserMessage",
    type: "get",
    async: false,
    success: function(res){
        userInfo = res;
        if(res.error && res.error == 400){
            location.href = "login.html";
        }
    }
});

$(function(){
    //退出登录
    $('#logout').on('tap', function(){

        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function(res){
                if(res.success){
                    mui.toast("退出登录成功");
                    setTimeout(function(){
                        location.href = "index.html";
                    },2000)
                }
            }
        })
    });

    //获取用户信息
    var html = template('userInfo', userInfo);

    $('#userInfoBox').html(html);
});