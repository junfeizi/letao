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
//��ȡ��ַ������Ҫ�ļ�ֵ����
function getParamsByUrl(url, name) {
    //��?�ָ��ĵ�ַ,+1��Ϊ���ų��ʺ� ?
    var params = url.substr(url.indexOf('?')+1);
    //����&�ָ�ʣ�µ��ַ���,�γ�һ������
    var param = params.split('&');
    //ѭ�������������
    for(var i=0;i<param.length;i++){
        //����=�ָ�����ַ���,�γɼ�ֵ��
        var current = param[i].split('=');
        //�ж���������ļ��ǲ�������Ҫ���Ǹ���
        if(current[0] == name){
            //����Ǿͷ���ֵ
            return current[1]
        }
    }
    //���Ǿͷ��ؿ�
    return null;
}
