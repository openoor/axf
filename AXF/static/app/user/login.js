$(function () {
    $('#login').click(function () {
        // 表单提交md5加密后的密码
        $('#password').val(md5($('#password').val()));
    });
});

