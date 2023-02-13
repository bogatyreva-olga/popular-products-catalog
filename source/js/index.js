import catalog from "./data.js";

window.addEventListener('load', function () {
    new Glider(document.querySelector('.slider'), {
        slidesToScroll: 1,
        slidesToShow: 4,
        draggable: false,
        arrows: {
            prev: '.slider__btn-prev',
            next: '.slider__btn-next'
        }
    })
})

