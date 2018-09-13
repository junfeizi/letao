/**
 * Created by Tiger Liu on 2018/9/13.
 */
$(function(){
    //跳转功能
    $('#search-btn').on('click',function(){
        //用户要搜索的字
        var keyword = $(this).siblings('input').val();
        if(keyword){
            keyArr.push(keyword);
            localStorage.setItem('keyArr', JSON.stringify(keyArr));

            location.href = "search-result.html?keyword=" + keyword;
        }else{
            alert('请输入要搜索的商品关键字');
        }
    });

    var keyArr = [];
    if(localStorage.getItem('keyArr')){

        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        console.log(keyArr);

        var html = template('historyTpl', { "data": keyArr });

        $('#history-box').html(html);

    }
    //清空历史记录
    $('#clearBtn').on('click',function(){

        $('#history-box').html("");

        localStorage.removeItem("keyArr");

    });
});