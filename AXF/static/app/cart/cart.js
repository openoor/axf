$(function () {

    // +
    $('.add').click(function () {
        // 先获取要修改数量的购物车id:　cartid
        // var num = $(this).prev().html();
        var that = this;
        var cartid = $(this).parents('.menuList').attr('cartid');
        //AJAX
        $.get('/app/addnum/', {cartid: cartid}, function (data) {
            //如果修改成功，则将页面中对应的节点的内容改变
            if(data.status == 1){
                var num = $(that).prev().html(data.num);
            }
            else{
                console.log(data.msg)
            }
            calculate();
        })

    });

    // -
    $('.reduce').click(function () {
        var that = this;
        var cartid = $(this).parents('.menuList').attr('cartid');
        $.get('/app/reducenum',{cartid: cartid},function (data) {
            if(data.status == 1){
                var num = $(that).next().html(data.num)
            }
            else{
                console.log(data.msg)
            }
            calculate();
        })
    });

    //删除
    $('.delbtn').click(function () {
        var that = this;
        var cartid = $(this).parents('.menuList').attr('cartid');
        $.get('/app/delcart/',{cartid:cartid},function (data) {
            if(data.status == 1){
                $(that).parents('.menuList').remove()
            }else{
                console.log(data.msg)
            }
            //重新判断是否全选
            isAllSelected();
        })
    });

    //　勾选/取消勾选
    $('.select').click(function () {
        var cartid = $(this).parents('.menuList').attr('cartid');
        var that = this;
        //ajax
        $.get('/app/cartselect/',　{cartid: cartid}, function (data) {
             if (data.status == 1){
                 if(data.is_select){
                    $(that).find('span').html('√');
                 }else{
                     $(that).find('span').html('');
                }

            }else{
                console.log(data.msg);
            }
             //重新判断是否全选
            isAllSelected();

        });


    });

    // 全选
    $('#allselect').click(function () {
        //1.如果当前全部勾选，则全不选
        //2.如果有未勾选的,则全选

        // 先判断是否全部勾选了
        selects = [];  // 保存所有选中的cartid
        unselects = []; // 保存所有未选中的cartid

        //　遍历所有的li
        $('.menuList').each(function () {
            var select = $(this).find('.select').children('span').html();
            if (select){
                //如果是勾选的,则添加到selects中
                selects.push($(this).attr('cartid'))
            }else{
                //如果未勾选,则添加到unselects中
                unselects.push($(this).attr('cartid'))
            }
        });

        // 如果全选,则执行,全不选
        if (unselects.length == 0){
            $.get('/app/cartselectall/', {'action': 'cancelselect', 'selects': selects.join('#')},function (data) {
                // console.log(data)
                if(data.status == 1){
                    $('.select').find('span').html('')
                }else{
                    console.log(data.msg)
                }
                //重新判断是否全选
                isAllSelected();
            });
        }
        // 如果当前未全选,则执行,全选
        else{
             $.get('/app/cartselectall/', {'action': 'select', 'selects': unselects.join('#')},function (data) {
                // console.log(data)
                if(data.status == 1){
                    $('.select').find('span').html('√')
                }else{
                    console.log(data.msg)
                }
                //重新判断是否全选
                isAllSelected();
            });
        }

    });

    // 检测是否全选
    isAllSelected();
    // 检测是否全选
    function isAllSelected() {
        var count = 0;
        $('.select').each(function () {
            if ($(this).find('span').html()){
                count++;
            }
        });
        //如果全选
        if(count == $('.select').length){
            $('#allselect>span').html('√')
        }
        //否则不打勾
        else{
            $('#allselect>span').html('')
        }
        //重新计算总价
        calculate();
    }

    // 计算总价
    function calculate() {

        //总价
        var total = 0;
        //遍历所有的li
        $('.menuList').each(function () {
            if($(this).find('.select').find('span').html()){
                //如果勾选,则计算价格
                //单价
                var price = parseFloat($(this).find('.price').html());
                //数量
                var num = parseInt($(this).find('.num').html());
                total += price * num;

            }
        });
        //显示总价
        $('#totalprice').html(total.toFixed(2));


    }

    //　结算,下单
    $('#calculate').click(function () {
        $.get('/app/orderadd/',function (data) {

            if (data.status == 1){
                location.href = '/app/order/' + data.orderid + '/'
            }else{
                console.log(data)
            }
        })


    });

});