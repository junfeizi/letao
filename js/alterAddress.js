$(function(){
        var address = JSON.parse(localStorage.getItem('editAddress'));
        console.log(address);
        var html = template('alterTpl', address);
        //console.log(html);
        $('#alterForm').html(html);
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


        $('#alterAddress').on('tap',function(){
            var id = address.id;
            var username = $.trim($("[name='username']").val());
            var postCode = $.trim($("[name='postCode']").val());
            var city = $.trim($("[name='city']").val());
            var detail = $.trim($("[name='detail']").val());
            $.ajax({
                url: '/address/updateAddress',
                type: 'post',
                data: {
                    id : id,
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
                        mui.toast('修改成功;')
                        setTimeout(function(){
                            location.href = "address.html";
                        },1000)
                    }
                }
            })
        })
});