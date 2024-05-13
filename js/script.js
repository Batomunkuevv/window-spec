"use strict";

const initLozad = () => {
    const lozadElements = document.querySelectorAll('[data-lozad]');

    if (!lozadElements) return;

    lozadElements.forEach(element => {
        const lozadObserver = lozad(element);

        lozadObserver.observe();
    })
}

const initAnchors = () => {
    const anchors = document.querySelectorAll('[data-anchor]');

    if (!anchors) return;

    anchors.forEach(link => {

        link.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            const isToOtherPage = href.includes('/');

            if (isToOtherPage) window.location.href = href;

            const scrollTarget = document.querySelector(href);

            if (!scrollTarget) return;

            const topOffset = 24;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

}

const initTabs = () => {
    const tabsContainers = document.querySelectorAll('[data-tabs-container]');

    if (!tabsContainers);

    tabsContainers.forEach(tabsContainer => {
        const tabsContainerBtns = tabsContainer.querySelectorAll('[data-tab]');
        const tabsContainerTabcontents = tabsContainer.querySelectorAll('[data-tabcontent]');

        tabsContainerBtns.forEach(tab => {
            const tabValue = tab.dataset.tab;
            const tabcontent = Array.from(tabsContainerTabcontents).find(item => item.dataset.tabcontent === tabValue);

            tab.addEventListener('click', () => {
                removeActiveClassesFromOther(tabsContainerBtns, 'is-active');
                removeActiveClassesFromOther(tabsContainerTabcontents, 'is-active');

                tab.classList.add('is-active');
                tabcontent.classList.add('is-active');
            });
        })
    })
}

const initCasesImagesSliders = () => {
    const casesImagesSliders = document.querySelectorAll('.case__images');

    if (!casesImagesSliders) return;

    casesImagesSliders.forEach(slider => {
        const options = {
            speed: 1000,
            loop: true,
            spaceBetween: 32,
            autoplay: {
                delay: 5000
            },
            navigation: {
                prevEl: '.case__images-arrow--prev',
                nextEl: '.case__images-arrow--next',
            }
        }

        slider = new Swiper(slider, options);
    })
}

function removeActiveClassesFromOther(array, activeClass) {
    array.forEach(item => item.classList.remove(activeClass))
}

window.addEventListener("DOMContentLoaded", (e) => {
    initLozad();
    initAnchors();
    initCasesImagesSliders();
    initTabs();
});
