/**
 * Created by Tiger Liu on 2018/9/16.
 */
/**
 * 修改密码
 * 1.获取修改密码按钮并添加点击事件
 * 2.获取用户输入的信息
 * 3.对用户输入的信息做校验
 * 4.调用修改密码接口 实现修改密码功能
 * 5.跳转到登录页面 重新登录
 */

$(function(){
   $('#modify-btn').on('tap',function(){
       //获取用户输入信息
       var originPass = $.trim($("[name='originPass']").val());
       var newPass = $.trim($("[name='newPass']").val());
       var confirmNewPass = $.trim($("[name='confirmNewPass']").val());
       var vCode = $.trim($("[name='vCode']").val());

       //校验信息
       if(!originPass){
           mui.toast('请输入原密码');
           return;
       }else if(newPass != confirmNewPass){
           mui.toast('两次输入的密码不一致');
           return;
       }

       $.ajax({
           url: '/user/updatePassword',
           type: 'post',
           data:{
               oldPassword: originPass,
               newPassword: newPass,
               vCode: vCode
           },
           success: function(res){
               console.log(res);
               if(res.success){
                   mui.toast('修改成功');
                   setTimeout(function(){
                       location.href = "login.html";
                   },1000)
               }else{
                   mui.toast("修改失败");
               }

           }
       })

   });


   //获取验证码
   $('#getCode').on('tap',function(){
       $.ajax({
           url: '/user/vCodeForUpdatePassword',
           type: 'get',
           success: function(res) {
               console.log(res);
               if (res.vCode) {
                   console.log(res.vCode);
               }else{
                   mui.toast("获取失败,请重试");
               }
           }
       })
   })


});