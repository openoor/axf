$(function () {

    flag1 = false; //表示不合法
    flag2 = false;
    flag3 = false;
    flag4 = false;
    var f1 = function(name, reg, errorid){
        var v = $(name).val();
        if (reg.test(v)){
            $(errorid).hide();
            return true;
        }
        else {
            $(errorid).show();
            return false;
        }
    };

    //　用户名
    $('#username').change(function () {
        var v = $(this).val();
        if (/^[a-zA-Z_]\w{5,17}$/.test(v)){


            //如果输入格式正确，则验证用户名是否存在
            $.get('/app/checkusername/', {username: $(this).val()}, function (data) {
                // console.log(data)
                if (data.status == 1) {
                    flag1 = true;
                    $('#msg').html('用户名可以使用').css('color', 'green')
                }
                else if (data["status"] == 0) {
                    $('#msg').html(data.msg).css('color', 'red');
                    flag1 = false;
                }
                else if (data["status"] == -1) {
                    $('#msg').html('请求方式不正确').css('color', 'red');
                    flag1 = false;
                }
            })

        }
        else {
            flag1 = false;
            $('#msg').html('用户名输入有误').css('color', 'orange')
        }
    });

    //　密码
    $('#password').change(function () {
       flag2 = f1('#password',/^.{8,}$/,'#errorpw1');
    });

    //　确认密码
    $('#again').change(function () {
        if ($(this).val() == $('#password').val()) {
            $('#errorpw2').hide();
            flag3 = true;
        }
        else {
            $('#errorpw2').show();
            flag3 = false;
        }
    });

    //　邮箱
    $('#email').change(function () {
       flag4 = f1('#email',/^\w+@\w+\.\w+$/,'#errorem');
    });
    // 注册
    $('#register').click(function () {
        if(flag1 && flag2 && flag3 && flag4){
            // 表单提交md5加密后的密码
            $('#password').val(md5($('#password').val()));
            // console.log($('#password').val());
            return true
        }
        else{
            return false
        }
    });



    // // 检测用户名是否存在
    // $('#username').change(function () {
    //         $.get('/app/checkusername', {username: $(this).val()}, function (data) {
    //             // console.log(data)
    //             if(data.status == 1){
    //                 $('#msg').html('用户名可以使用').css('color','green')
    //             }
    //             else if(data.status == 0){
    //                 $('#msg').html(data.msg).css('color','red')
    //             }
    //             else{
    //                 $('#msg').html('用户名不合法').css('color','red')
    //
    //             }
    //         })
    //     })



});