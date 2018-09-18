$(function(){
    var repertoryNum = 0;
    var size = null;
    var productId = 0;
    var id = getParamsByUrl(location.href,'id');
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: id
        },
        success: function(res){
            //console.log(res);
            repertoryNum = res.num;
            productId = res.id;
            var html = template('product-tpl',res);
            $('#product-box').html(html);
            //重置轮播图插件
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });
    $('#product-box').on('tap', '.size span', function(){
        $(this).addClass('active').siblings('span').removeClass('active');
        size = $(this).html;
    });

    $('#product-box').on('tap', '.num #reduce', function(){
        var num = $('#inp').val();
        num--;
        if(num < 1){
            num = 1;
        }
        $('#inp').val(num);
    });

    $('#product-box').on('tap', '.num #increase', function(){

        var num = $('#inp').val();
        num++;
        if(num > repertoryNum){
            num = repertoryNum;
        }
        $('#inp').val(num);
    });



    //加入购物车
    $('#addCart').on('tap', function(){

        if(!size){

           mui.toast('请选择尺码');

            return;

        }

        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: productId,
                num: repertoryNum,
                size: size
            },
            success: function(res){
                console.log(res);
                if(res.success){
                    mui.confirm("加入购物车成功,跳转到购物车?", function(message){
                        if(message.index){
                            // 跳转到购物车
                            location.href = "cart.html";
                        }
                    })
                }
            }
        });

    });

});
