$(function () {
    //　全部类型
   $('#child_type').click(function () {
       $('#child_type_container').toggle(); //　切换显示隐藏
       $('#child_type_icon').toggleClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
       $('#sort_rule_container').triggerHandler('click'); //　其他栏隐藏
   });
   $('#child_type_container').click(function () {
       $(this).hide(); //　隐藏
       $('#child_type_icon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
   });
    //　排序
    $('#sort_rule').click(function () {
       $('#sort_rule_container').toggle(); //　切换显示隐藏
       $('#sort_rule_icon').toggleClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
       $('#child_type_container').triggerHandler('click'); //　其他栏隐藏
   });
   $('#sort_rule_container').click(function () {
       $(this).hide(); //　隐藏
       $('#sort_rule_icon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
   });

    // 加入购物车
    //　数量+
    $('.add').click(function () {
        // index = $(this).index('.add');
        // num = $('.number').eq(index)
        $number = $(this).parent().find('.number');
        $number.html(parseInt($number.html()) + 1);
    });

    $('.reduce').click(function () {
        $number = $(this).parent().find('.number');
        num = parseInt($number.html()) - 1;

        if (num < 1){
            num = 1
        }
        $number.html(num);
    });

    // 点击加入购物车
    $('.addtocart').click(function () {
        //商品id 获取当前要加入购物车的商品的id
        goodsid = $(this).attr('goodsid');
        // 商品数量
        num = parseInt($(this).prev().find('.number').html());
        //ajax
        $.get('/app/addtocart/',{'goodsid': goodsid, 'num': num}, function (data) {
            if(data.status == 1){
                console.log('加入购物车成功')
            }
            else if(data.status == 0){
                // location.assign()
                location.href = "/app/login/"
            }
            else{
                console.log('加入购物车失败')
            }
        })

    })

});