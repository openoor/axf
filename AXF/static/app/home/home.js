$(function () {

    // 轮播
    new Swiper ('#topSwiper', {
        // direction: 'vertical', // 轮播方向竖向,默认横向
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',

    });

    // 必购
    new Swiper ('#swiperMenu', {
        slidesPerView: 3,
    });


});