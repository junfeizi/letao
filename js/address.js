/**
 * Created by Tiger Liu on 2018/9/16.
 */
$(function(){
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function(res) {
            //console.log(res);
            address = res;
            var html = template("addressTpl",{"data":res});
            $('#address-box').html(html);
        }
    });
    //存储收货地址
    var address = '';
    //删除按钮
    $('#address-box').on('tap', '.delete-btn', function(){
        var id = $(this).data('id');
        var li = this.parentNode.parentNode;
        mui.confirm('确认删除?','提示',function(message){
            // 确认删除
            if(message.index == 1) {
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function(res){

                        if(res.success){
                            //重新加载页面
                            mui.toast('删除成功');
                            location.reload();
                        }
                    }
                })
            }else{
                //取消滑动的效果,回到初始状态
                mui.swipeoutClose(li);
            }
        })
    });

    //编辑按钮

    $('#address-box').on('tap', '.edit-btn', function(){
        var id = $(this).data('id');
        console.log(address);
        for(var i=0;i<address.length;i++) {
            if(address[i].id == id) {
                localStorage.setItem('editAddress',JSON.stringify(address[i]));
                // 终止循环
                break;
            }
        }
        location.href = "alterAddress.html";
    });


});