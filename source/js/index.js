import catalog from "./data.js";

function createCardElement(item) {
    const cardTemplateElement = document.querySelector("#card").content;
    const cardElement = cardTemplateElement.cloneNode(true);

    if (item.isHit) {
        cardElement.querySelector(".card__is-hit").style.display = "block";
    }
    if (item.isNew) {
        cardElement.querySelector(".card__is-new").style.display = "block";
    }
    if (item.isFavorite) {
        cardElement.querySelector(".card__is-favorite img").style.backgroundColor = "#000";
    }
    if (item.images.length > 0) {
        cardElement.querySelector(".card__images div").innerHTML = "";
        item.images.forEach((src) => {
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.src = src;
            div.appendChild(img);
            cardElement.querySelector(".card__images div").appendChild(div)
        })
    }
    const sliderClassName = "slider-" + item.id
    cardElement.querySelector(".card__images div").classList.add(sliderClassName);
    cardElement.querySelector(".card__images .dots").classList.add(sliderClassName + "-dots");

    document.addEventListener("initCatalogComplete", () => {
        new Glider(document.querySelector('.' + sliderClassName), {
            slidesToScroll: 1,
            slidesToShow: 1,
            draggable: false,
            dots: "." + sliderClassName + "-dots"
        })
    })

    cardElement.querySelector(".price span").innerText = item.price;

    if (item.oldPrice) {
        cardElement.querySelector(".old-price").style.display = "block";
        cardElement.querySelector(".old-price span").innerText = item.oldPrice;
    }

    cardElement.querySelector(".card__text").textContent = item.title;

    return cardElement;
}

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector(".slider")
    catalog.forEach((item) => {
        slider.appendChild(createCardElement(item));
    })

    document.dispatchEvent(new Event("initCatalogComplete"))

    new Glider(document.querySelector('.slider'), {
        slidesToScroll: 1,
        slidesToShow: "auto",
        draggable: false,
        arrows: {
            prev: '.slider__btn-prev',
            next: '.slider__btn-next'
        },
        exactWidth: true,
        itemWidth: 334,
    })
})

