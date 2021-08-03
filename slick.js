const pixelToRemUnit = (pixelUnit) => {
    console.log(pixelUnit);
    return pixelUnit / parseInt(getComputedStyle(document.documentElement).fontSize) + "rem";
}

class Slick {
    constructor(elementId, slideToShow) {
        this.slideList = document.querySelector(`${elementId} .slick-slide-list`);
        this.slides = document.querySelectorAll(`${elementId} .slick-slide`);
        this.prevBtn = document.querySelector(`${elementId} .slick-slide-btns .prev-btn`);
        this.nextBtn = document.querySelector(`${elementId} .slick-slide-btns .next-btn`);
        this.slideToShow = slideToShow;
        this.slideCount = this.slides.length;
        this.slideWidth = 28;
        this.slideSpeed = 300;
        const startIdx = 0;

        this.slideList.style.inlineSize =
            this.slideWidth * (this.slideCount + 2 * this.slideToShow) + "rem";

        // Copy first and last slide
        let clonedFirst = [];
        let clonedLast = [];
        for(let i = 0; i < this.slideToShow; i++) {
            clonedFirst.push(this.slides[i].cloneNode(true));
            clonedLast.push(this.slides[this.slideCount - this.slideToShow + i].cloneNode(true));
        }

        // Add copied Slides
        for(let i=0; i< this.slideToShow; i++) {
            this.slideList.appendChild(clonedFirst[i]);
            this.slideList.insertBefore(
                clonedLast[this.slideToShow - 1 - i],
                this.slideList.firstElementChild
            );
        }

        // move forward by num of slide to show
        this.slideList.style.transform =
            `translateX(${-(this.slideWidth * (startIdx + this.slideToShow))}rem)`;

        this.curIdx = startIdx;
        // this.curSlide = this.slides[this.curIdx];
        // this.curSlide.classList.add('slide-active');
        this.curSlides = [];
        for(let i=0; i < this.slideToShow; i++) {
            this.curSlides.push(this.slides[this.curIdx + i]);
        }
        this.curSlides.forEach(slide => slide.classList.add('slide-active'));

        this.prevBtn.addEventListener('click', this.prevBtnClick.bind(this), this);
        this.nextBtn.addEventListener('click', this.nextBtnClick.bind(this), false);
    }

    prevBtnClick(e) {
        if (this.curIdx >= 0) {
            this.slideList.style.transition = this.slideSpeed + "ms";
            this.slideList.style.transform = `translateX(${-(this.slideWidth * this.curIdx)}rem)`;
        }
        if (this.curIdx === 0) {
            setTimeout(() => {
                this.slideList.style.transition = "0ms";
                this.slideList.style.transform = `translateX(${-(this.slideWidth * this.slideCount)}rem)`;
            }, this.slideSpeed);
            this.curIdx = this.slideCount;
        }
        this.curSlides.forEach(slide => slide.classList.remove('slide-active'));
        this.curIdx -= this.slideToShow;
        this.curSlides = [];
        for(let i=0; i < this.slideToShow; i++) {
            this.curSlides.push(this.slides[this.curIdx + i]);
        }
        this.curSlides.forEach(slide => slide.classList.add('slide-active'));
    }
    nextBtnClick(e) {
        if(this.curIdx <= this.slideCount - this.slideToShow) {
            this.slideList.style.transition = this.slideSpeed + "ms";
            this.slideList.style.transform =
                `translateX(${-(this.slideWidth * (this.curIdx + 2 * this.slideToShow))}rem)`;
        }
        if(this.curIdx === this.slideCount - this.slideToShow) {
            setTimeout(() => {
                this.slideList.style.transition = "0ms";
                this.slideList.style.transform = `translateX(${-(this.slideWidth * this.slideToShow)}rem)`;
            }, this.slideSpeed);
            this.curIdx = -this.slideToShow;
        }
        this.curSlides.forEach(slide => slide.classList.remove('slide-active'));
        this.curIdx += this.slideToShow;
        this.curSlides = [];
        for(let i=0; i < this.slideToShow; i++) {
            this.curSlides.push(this.slides[this.curIdx + i]);
        }
        this.curSlides.forEach(slide => slide.classList.add('slide-active'));
    }
}