/**
 * Created by Tiger Liu on 2018/9/15.
 */
$(function(){

    // �ָ�AԪ�ص���ת
    $('body').on('tap', 'a', function(){

        mui.openWindow({
            url: $(this).attr('href')
        });

    });

});