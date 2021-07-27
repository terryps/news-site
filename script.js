// const slides = document.querySelectorAll('#main-news-slider ul li');
// const slide = slides[0];
// const slideCount = slides.length;
// const slideWidth = slide.offsetWidth;
// const slideHeight = slide.offsetHeight;
// const sliderUlWidth = slideCount * slideWidth;
//
// const slider = document.querySelector('#main-news-slider');
// slider.style.inlineSize = `${slideWidth}px`;
// slider.style.blockSize = `${slideHeight}px`;
//
// const sliderUl = document.querySelector('#main-news-slider ul');
// sliderUl.style.inlineSize = `${sliderUlWidth}px`;
// sliderUl.style.marginLeft = `${-slideWidth}px`;
//
// const lastSlide = slides[slides.length - 1];
// //sliderUl.prepend(lastSlide);
//
// function moveLeft() {}
// const moveRight = sliderUl.animate([
//     { transform: 'translateX(0)'},
//     { transform: 'translateX(0)', offset: 0.85 },
//     { transform: `translateX(${-slideWidth}px)`},
// ], {
//         duration: 3000,
// });
//
// moveRight.onfinish = () => {
//     const removeItem = sliderUl.removeChild(sliderUl.firstChild);
//     sliderUl.appendChild(removeItem);
//     moveRight.play();
// }

const trendTabs = document.querySelectorAll('#trend-tab-index li');

const trendTabClick = (e) => {
    const tabIndex = document.querySelectorAll('#trend-tab-index li');
    const tabContents = document.querySelectorAll('#trend-tabs .tab-contents ol');
    const tabIndexId = e.target.getAttribute('data-tab');
    const currentTab = document.getElementById(tabIndexId);

    // remove current class
    tabIndex.forEach(
        element => element.classList.remove("current")
    );

    tabContents.forEach(
        element => element.classList.remove("current")
    );

    // add current class
    e.target.classList.add("current");
    currentTab.classList.add("current");
}

window.onload = () => {
    trendTabs.forEach(tab =>
        tab.addEventListener("click", trendTabClick, false)
    );
}
