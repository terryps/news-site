const pixelToRemUnit = (pixelUnit) => {
    console.log(pixelUnit);
    return pixelUnit / parseInt(getComputedStyle(document.documentElement).fontSize) + "rem";
}

class Slick {
    constructor(elementId, slideToShow) {
        this.slideList = document.querySelector(`${elementId} .slick-slide-list`);
        this.slides = document.querySelectorAll(`${elementId} .slick-slide`);
        // this.prevBtn;
        // this.nextBtn;
        this.slideToShow = slideToShow;
        this.slideCount = this.slides.length;
        this.slideWidth = 28;
        this.slideSpeed = 300;
        const startIdx = 0;

        console.log(this.slideWidth);

        this.slideList.style.inlineSize =
            this.slideWidth * (this.slideCount + 2 * this.slideToShow) + "rem";

        // Copy first and last slide
        let clonedFirst = [];
        let clonedLast = [];
        for(let i = 0; i<slideToShow; i++) {
            clonedFirst.push(this.slides[i].cloneNode(true));
            clonedLast.push(this.slides[this.slideCount - this.slideToShow + i].cloneNode(true));
        }

        // Add copied Slides
        for(let i=0; i<this.slideToShow; i++) {
            this.slideList.appendChild(clonedFirst[this.slideToShow - i - 1]);
            this.slideList.insertBefore(clonedLast[i], this.slideList.firstElementChild);
        }
        console.log(this.slideList);

        this.slideList.style.transform =
            `translateX(${-(this.slideWidth * (startIdx + this.slideToShow))}rem)`;

        this.curIdx = startIdx;
        this.curSlide = this.slides[this.curIdx];
        this.curSlide.classList.add('slide-active')
    }

    prevBtnClick(e) {
        if (this.curIdx >= 0) {
            this.slideList.style.transition = this.slideSpeed + "ms";
            this.slideList.style.transform = `translateX(${-(this.slideWidth * this.curIdx)}rem)`;
        }
        if (this.curIdx === 0) {
            setTimeout(function() {
                this.slideList.style.transition = "0ms";
                this.slideList.style.transform = `translateX(${-(this.slideWidth * this.slideCount)}rem)`;
            }, this.slideSpeed);
            this.curIdx = this.slideCount;
        }
        this.curSlide.classList.remove('slide-active');
        this.curSlide = this.slides[--this.curIndex];
        this.curSlide.classList.add('slide-active');
    }
    nextBtnClick(e) {
        if(this.curIdx <= this.slideCount - 1) {
            this.slideList.style.transition = this.slideSpeed + "ms";
            this.slideList.style.transform =
                `translateX(${-(this.slideWidth * (this.curIdx + 2 * this.slideToShow))}rem)`;
        }
        if(this.curIdx === this.slideCount - 1) {
            setTimeout(function() {
                this.slideList.style.transition = "0ms";
                this.slideList.style.transform = `translateX(${-this.slideWidth}rem)`;
            }, this.slideSpeed);
            this.curIdx = -1;
        }
        this.curSlide.classList.remove('slide-active');
        this.curSlide = slideContents[++this.curIndex];
        this.curSlide.classList.add('slide-active');
    }
}