"use strict";
class Gallery {
    constructor(el) {
        this.currentIndex = 0;
        this.currentSlice = 0;
        this.img = document.createElement("img");
        this.fullView = document.createElement("div");
        this.sliceSize = 6;
        this.addFullView();
        this.container = el;
        this.imagesList = this.container.querySelectorAll(".wp-block-image img");
        console.log(this.imagesList);
        this.container.addEventListener("click", (e) => this.showGallery(e));
        this.makeSlice();
        // this.fullView.addEventListener("animationend", () => {
        //   if (this.fullView.style.animationName === "zoomOut") {
        //     this.fullView.style.display = "";
        //   }
        //   this.fullView.style.animationName = "";
        // });
        // this.img.addEventListener("animationend", () => {
        //   this.img.style.animationName = "";
        // });
    }
    addFullView() {
        this.fullView = document.createElement("div");
        let btnClose = this.makeButton("close", "close-gallery");
        btnClose.addEventListener("click", () => this.hideGallery());
        this.fullView.appendChild(btnClose);
        let btnPrev = this.makeButton("navigate_before", "gallery-prev");
        btnPrev.addEventListener("click", () => this.prevPhoto());
        this.fullView.appendChild(btnPrev);
        let btnNext = this.makeButton("navigate_next", "gallery-next");
        btnNext.addEventListener("click", () => this.nextPhoto());
        this.fullView.appendChild(btnNext);
        this.fullView.appendChild(this.img);
        this.fullView.id = "gallery-full-view";
        document.querySelector("body")?.appendChild(this.fullView);
    }
    makeButton(text, id) {
        let btn = document.createElement("span");
        btn.className = "material-icons";
        btn.id = id;
        btn.innerText = text;
        return btn;
    }
    nextSlice() {
        if (++this.currentSlice >
            Math.ceil(this.imagesList.length / this.sliceSize) - 1) {
            this.currentSlice = 0;
        }
        console.log(this.currentSlice);
        this.showSlice();
    }
    prevSlice() {
        if (--this.currentSlice < 0) {
            this.currentSlice =
                Math.ceil(this.imagesList.length / this.sliceSize) - 1;
        }
        console.log(this.currentSlice);
        this.showSlice();
    }
    makeSlice() {
        if (this.imagesList.length > this.sliceSize) {
            let sliceNavDiv = document.createElement("div");
            let sliceNavPrev = this.makeButton("navigate_before", "slice-prev");
            let sliceNavNext = this.makeButton("navigate_next", "slice-next");
            sliceNavDiv.id = "sliceNav";
            sliceNavNext.addEventListener("click", () => this.nextSlice());
            sliceNavDiv.appendChild(sliceNavPrev);
            sliceNavPrev.addEventListener("click", () => this.prevSlice());
            sliceNavDiv.appendChild(sliceNavNext);
            this.container.appendChild(sliceNavDiv);
        }
        this.showSlice();
    }
    showSlice() {
        let startIndex = this.currentSlice * this.sliceSize;
        let endIndex = startIndex + this.sliceSize;
        if (endIndex > this.imagesList.length) {
            endIndex = this.imagesList.length;
        }
        this.hideOtherSlice();
        let animNo = 0;
        for (; startIndex != endIndex; startIndex++) {
            console.log(startIndex, this.imagesList.length, this.imagesList[startIndex]);
            let parent = this.imagesList[startIndex].parentElement?.parentElement;
            if (parent) {
                parent.addEventListener("animationend", (el) => {
                    el.target.style.opacity = "";
                }, { once: true });
                parent.style.opacity = "0";
                parent.classList.add("show-self");
                parent.style.animationName = `anim-${++animNo}`;
                parent.style.animationDelay = `${animNo * 100}ms`;
            }
        }
    }
    hideOtherSlice() {
        let elList = this.container.querySelectorAll("li.blocks-gallery-item.show-self");
        elList.forEach((el) => {
            el.classList.remove("show-self");
            el.style.animationName = "";
        });
    }
    setCurrentIndex(dataId) {
        for (var _i = 0; _i < this.imagesList.length; _i++) {
            if (this.imagesList[_i].dataset.id === dataId) {
                this.currentIndex = _i;
                break;
            }
        }
    }
    showGallery(e) {
        let img = e.target;
        if (img.nodeName != "IMG") {
            return;
        }
        if (img.dataset.id) {
            this.setCurrentIndex(img.dataset.id);
        }
        else {
            this.currentIndex = 0;
        }
        this.setCurrentPhoto("fadeIn");
        this.fullView.style.animationName = "zoomIn";
        this.fullView.style.display = "flex";
        this.addKeyEvent();
    }
    hideGallery() {
        this.fullView.style.animationName = "zoomOut";
        this.delKeyEvent();
    }
    addKeyEvent() {
        document.addEventListener("keyup", (e) => this.keyPress(e));
        // document.addEventListener('keydown', (e) => e.preventDefault());
    }
    delKeyEvent() {
        document.removeEventListener("keyup", (e) => this.keyPress(e));
        // document.removeEventListener('keydown', (e) => e.preventDefault());
    }
    keyPress(e) {
        e.preventDefault();
        switch (e.code) {
            case "ArrowLeft":
                this.nextPhoto();
                break;
            case "ArrowRight":
                this.prevPhoto();
                break;
            case "Space":
                this.nextPhoto();
                break;
            case "Escape":
                this.hideGallery();
                break;
        }
    }
    nextPhoto() {
        if (++this.currentIndex === this.imagesList.length) {
            this.currentIndex = 0;
        }
        this.setCurrentPhoto("fadeIn");
    }
    prevPhoto() {
        if (--this.currentIndex < 0) {
            this.currentIndex = this.imagesList.length - 1;
        }
        this.setCurrentPhoto("fadeIn");
    }
    setCurrentPhoto(animationName) {
        let img = new Image();
        img.onload = () => {
            this.fullView.removeChild(this.img);
            this.img = img;
            this.img.style.animationName = animationName;
            this.fullView.appendChild(this.img);
        };
        img.src = this.imagesList[this.currentIndex].dataset.fullUrl;
    }
}
window.addEventListener("load", () => {
    let allGallery = document.querySelectorAll(".grymus-gallery");
    allGallery.forEach((gal) => {
        new Gallery(gal);
    });
});
