
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
    //�˳���¼
    $('#logout').on('tap', function(){

        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function(res){
                if(res.success){
                    mui.toast("�˳���¼�ɹ�");
                    setTimeout(function(){
                        location.href = "index.html";
                    },2000)
                }
            }
        })
    });

    //��ȡ�û���Ϣ
    var html = template('userInfo', userInfo);

    $('#userInfoBox').html(html);
});