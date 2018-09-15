/**
 * Created by Tiger Liu on 2018/9/15.
 */
$(function(){

    // »Ö¸´AÔªËØµÄÌø×ª
    $('body').on('tap', 'a', function(){

        mui.openWindow({
            url: $(this).attr('href')
        });

    });

});