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
        container: '.slider',
        items: 4,
        prevButton: '.slider__btn-prev',
        nextButton: '.slider__btn-next',
        rewind: true,
    });
})

