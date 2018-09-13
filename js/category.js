/**
 * Created by Tiger Liu on 2018/9/13.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });

    //һ������
    $.ajax({
        url: "/category/queryTopCategory",
        type: "get",
        success: function(res){
            //console.log(res);
            var html = template('categoryFirst',{"data": res.rows});
            $(".links").html(html);
            //console.log(html);
            if(res.rows.length) {

                // ����һ��һ���������ѡ��״̬
                $('#links').find('a').eq(0).addClass('active')

                // ��ȡ��һ��һ�������ID
                var id = res.rows[0].id;
                //console.log(id);
                getSecondCategory(id);
            }
        }
    });


    //��������
    $(".links").on('click','a',function(){
        var id = $(this).attr("data-id");
        //console.log(id);

        $(this).addClass('active').siblings().removeClass('active');

        getSecondCategory(id);
    });

    function getSecondCategory(id) {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {id: id},
            success: function(res){
                //console.log(res);
                var html = template('categorySecond',{"data": res.rows});
                $('.brand-list').html(html);
            }

        });
    }

});