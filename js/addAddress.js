/**
 * Created by Tiger Liu on 2018/9/16.
 */
$(function(){

    //三级地址使用插件

    // 创建picker选择器
    var picker = new mui.PopPicker({layer:3});
    // 为picker选择器添加数据
    picker.setData(cityData);
    // 当用户敲击文本框的时候
    $('#selectCity').on('tap', function(){
        // 显示picker选择器
        picker.show(function(selectItems){
            // 将用户选择的内容显示在文本框中
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });
    });


    $("#addAddress").on('tap',function(){
        var username = $.trim($("[name='username']").val());
        var postCode = $.trim($("[name='postCode']").val());
        var city = $.trim($("[name='city']").val());
        var detail = $.trim($("[name='detail']").val());
        //添加地址
        $.ajax({
            url: '/address/addAddress',
            type: 'post',
            data: {
                address : city,
                addressDetail : detail,
                recipients : username,
                postcode : postCode
            },
            beforeSend: function(){
                if(!username) {
                    mui.toast("请输入收货人姓名");
                    return false;
                }
                if(!postCode) {
                    mui.toast("请输入邮政编码");
                    return false;
                }
            },
            success: function(res) {
                if(res.success) {
                    mui.toast('添加成功;')
                    setTimeout(function(){
                        location.href = "address.html";
                    },1000)
                }
            }
        })
    });




});
