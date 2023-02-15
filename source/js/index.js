import catalog from "./data.js";

const createQuantityCountListeners = (itemId) => {
    document.querySelector('.minus-btn-' + itemId).addEventListener('click', () => {
        let inputElement = document.querySelector('.quantity-input-' + itemId);
        let value = parseInt(inputElement.value);
        if (value > 1) {
            inputElement.value = --value;
        }
    });
    document.querySelector('.plus-btn-' + itemId).addEventListener('click', () => {
        let inputElement = document.querySelector('.quantity-input-' + itemId);
        let value = parseInt(inputElement.value);
        if (value >= 1 && value < 10) {
            inputElement.value = ++value;
        }
    });
}

const createCardElement = (item) => {
    const cardTemplateElement = document.querySelector("#card").content;
    const cardElement = cardTemplateElement.cloneNode(true);

    if (item.isHit) {
        cardElement.querySelector(".card__is-hit").style.display = "block";
    }
    if (item.isNew) {
        cardElement.querySelector(".card__is-new").style.display = "block";
    }
    if (item.isFavorite) {
        cardElement.querySelector(".card__is-favorite svg").style.fill = "#f60606";
    }
    if (item.images.length > 0) {
        cardElement.querySelector(".card__images div").innerHTML = "";
        let dots = cardElement.querySelector(".card__images .dots");
        dots.innerHTML = "";
        item.images.forEach((src) => {
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.src = src;
            img.alt = item.title;
            div.appendChild(img);
            cardElement.querySelector(".card__images div").appendChild(div)

            let dotButtonElement = document.createElement('button')
            dots.appendChild(dotButtonElement)
        })
    }

    cardElement.querySelector('.card__minus-btn').classList.add('minus-btn-' + item.id)
    cardElement.querySelector('.card__quantity-input').classList.add('quantity-input-' + item.id)
    cardElement.querySelector('.card__plus-btn').classList.add('plus-btn-' + item.id)

    const sliderClassName = "slider-" + item.id
    cardElement.querySelector(".card__images div").classList.add(sliderClassName);
    cardElement.querySelector(".card__images .dots").classList.add(sliderClassName + "-dots");

    document.addEventListener("initCatalogComplete", () => {
        tns({
            container: '.' + sliderClassName,
            items: 1,
            prevButton: false,
            nextButton: false,
            loop: true,
            nav: true,
            mouseDrag: true,
            navContainer: "." + sliderClassName + "-dots",
        });
        createQuantityCountListeners(item.id)
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
    tns({
        startIndex: 1,
        container: '.slider',
        prevButton: '.slider__btn-prev',
        nextButton: '.slider__btn-next',
        rewind: true,
        items: 1,
        mouseDrag: true,
        responsive: {
            300: {
                items: 1,
                // gutter: 50,
                // edgePadding: 30,
            },
            340: {
                items: 2,
            },
            768: {
                items: 3,
            },
            1024: {
                items: 4,
            }
        }
    });
})

