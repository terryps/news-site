const columnBtn = {
    init : function() {
        this.cacheDom();
        this.bindEvents();
    },
    cacheDom : function() {
        this.slider = document.querySelector('#column-section .slider');
        this.slides = document.querySelectorAll('#column-section .slider .slide');
        this.slideCount = this.slides.length;
        this.slideWidth = this.slides[0].offsetWidth;
        this.slideHeight = this.slides[0].offsetHeight;
        this.sliderWidth = this.slideCount * this.slideWidth;

        this.slider.style.inlineSize = `${this.sliderWidth}px`;
        this.slider.style.blockSize = `${this.slideHeight}px`;
        this.slider.style.display = 'flex';
        this.slider.style.transition = 'transform .3s ease';

        this.sliderScreen = document.getElementById('column-section');
        this.sliderScreen.style.inlineSize = `${this.slideWidth}px`;

    },

    bindEvents : function() {
        this.curIndex = 0;
        this.position = 0;
        this.prevBtn = document.querySelector('#column-section .buttons button.prev');
        this.nextBtn = document.querySelector('#column-section .buttons button.next');
        this.prevBtn.setAttribute('disabled', true);
        this.prevBtn.addEventListener('click', this.prevBtnClick.bind(this), false);
        this.nextBtn.addEventListener('click', this.nextBtnClick.bind(this), false);
    },

    prevBtnClick : function(e) {
        if (this.curIndex > 0) {
            this.nextBtn.removeAttribute('disabled');
            this.slides[this.curIndex].style.display = 'none';
            this.slides[--this.curIndex].style.display = 'block';
            this.position += this.slideWidth;
            this.slider.style.transform = `translateX(${this.position}px)`;
        }
        if(this.curIndex === 0) {
            this.prevBtn.setAttribute('disabled', true);
        }
    },
    nextBtnClick : function(e) {
        if (this.curIndex < this.slideCount - 1) {
            this.prevBtn.removeAttribute('disabled');
            this.slides[this.curIndex].style.display = 'none';
            this.slides[++this.curIndex].style.display = 'block';
            this.position -= this.slideWidth;
            this.slider.style.transform = `translateX(${this.position}px)`;
        }
        if (this.curIndex === this.slideCount - 1) {
            this.nextBtn.setAttribute('disabled', true);
        }
    },
};

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
};


window.onload = () => {
    trendTabs.forEach(tab =>
        tab.addEventListener("click", trendTabClick, false)
    );

    columnBtn.init();

    new Slick('#section2', 4);
    new Slick('#section3', 4)
}
