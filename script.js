const columnBtnClick = () => {
    const slider = document.querySelector('#column-section .slider');
    const slides = document.querySelectorAll('#column-section .slider .slide');
    const slideCount = slides.length;
    const slideWidth = slides[0].offsetWidth;
    const slideHeight = slides[0].offsetHeight;
    const sliderWidth = slideCount * slideWidth;

    const nextBtn = document.querySelector('#column-section button.next');

    const sliderContainer = document.getElementById('column-section');
    sliderContainer.style.inlineSize = `${slideWidth}px`;

    slider.style.inlineSize = `${sliderWidth}px`;
    slider.style.blockSize = `${slideHeight}px`;

    slides.forEach((element, index) => {
        element.style.marginLeft = `${index * slideWidth}px`;
    });

    const nextBtnClick = (e) => {
        slider.style.transition = `transform .3s ease`;

        slider.style.transform = `translateX(${-slideWidth}px)`;

        const newLastSlide = slider.removeChild(slides[0]);
        newLastSlide.classList.remove('showing');
        slides[0].classList.add('showing');
        slider.transform = `translateX(${slideWidth}px)`;
        slider.appendChild(newLastSlide);

        slides.forEach((element, index) => {
            element.style.marginLeft = `${index * slideWidth}px`;
        });
    };
    nextBtn.addEventListener("click", nextBtnClick, false);

}

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

    columnBtnClick();
}
