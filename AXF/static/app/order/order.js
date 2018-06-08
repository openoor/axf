$(function () {

    //支付
    $('#pay').click(function () {
        //支付完成后,需要将订单状态修改
        $.get('/app/orderchangestatus/', {'orderid': $(this).attr('orderid'), 'status': '1'}, function (data) {

            if (data.status==1){
                location.href = '/app/mine/'
            }else{
                console.log(data);
            }
        })
    })
});