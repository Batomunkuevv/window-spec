"use strict";

const initLozad = () => {
    const lozadElements = document.querySelectorAll('[data-lozad]');

    if (!lozadElements) return;

    lozadElements.forEach(element => {
        const lozadObserver = lozad(element);

        lozadObserver.observe();
    })
}

const burgerMenu = () => {
    const burger = document.querySelector('.site-header__burger');
    const menu = document.querySelector('.menu');

    if (!burger || !menu) return;

    handleClickOutsideMenu();
    closeMenuOnClickLinks();
    initMenuClose();

    burger.addEventListener('click', showMenu);

    function showMenu() {
        menu.classList.add('is-open');
        document.body.classList.add('is-lock');
    }

    function closeMenu() {
        menu.classList.remove('is-open');
        document.body.classList.remove('is-lock');
    }

    function closeMenuOnClickLinks(){
        const menuLinks = menu.querySelectorAll('.menu__link');

        menuLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    function initMenuClose() {
        const menuClose = menu.querySelector('.menu__close');

        if (!menuClose) return;

        menuClose.addEventListener('click', closeMenu);
    }

    function handleClickOutsideMenu() {
        const menuItems = Array.from(menu.querySelectorAll('*'));

        window.addEventListener('click', (e) => {
            const { target } = e;
            const isInsideMenu = menuItems.includes(target);

            if (!isInsideMenu && target !== burger && target !== menu) {
                closeMenu()
            }
        })
    }
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
            grabCursor: true,
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
    burgerMenu();
});
