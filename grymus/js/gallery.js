"use strict";
class Gallery {
    constructor(el) {
        this.sliceSize = 6;
        this.container = el;
        this.container.className = "grymus-gallery";
        this.container.classList.add("cursor-pointer");
        this.imagesList = this.container.querySelectorAll(".wp-block-image img");
        this.container.addEventListener("click", (e) => this.showGallery(e));
    }
    showGallery(e) {
        const target = e.target;
        if (!target || !this.imagesList)
            return;
        const imgIndex = Array.from(this.imagesList).indexOf(target);
        if (imgIndex === -1)
            return;
        // Create overlay
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.background = "rgba(0,0,0,0.9)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";
        // Create image element
        const fullImg = document.createElement("img");
        fullImg.src = target.src;
        fullImg.style.maxWidth = "90vw";
        fullImg.style.maxHeight = "90vh";
        fullImg.style.boxShadow = "0 0 32px #000";
        fullImg.style.borderRadius = "8px";
        overlay.appendChild(fullImg);
        // Navigation buttons
        const prevBtn = document.createElement("button");
        prevBtn.innerHTML = "&#8592;";
        prevBtn.style.position = "absolute";
        prevBtn.style.left = "32px";
        prevBtn.style.top = "50%";
        prevBtn.style.transform = "translateY(-50%)";
        prevBtn.style.fontSize = "2rem";
        prevBtn.style.background = "rgba(0,0,0,0.5)";
        prevBtn.style.color = "#fff";
        prevBtn.style.border = "none";
        prevBtn.style.cursor = "pointer";
        prevBtn.style.padding = "12px";
        prevBtn.style.borderRadius = "50%";
        overlay.appendChild(prevBtn);
        const nextBtn = document.createElement("button");
        nextBtn.innerHTML = "&#8594;";
        nextBtn.style.position = "absolute";
        nextBtn.style.right = "32px";
        nextBtn.style.top = "50%";
        nextBtn.style.transform = "translateY(-50%)";
        nextBtn.style.fontSize = "2rem";
        nextBtn.style.background = "rgba(0,0,0,0.5)";
        nextBtn.style.color = "#fff";
        nextBtn.style.border = "none";
        nextBtn.style.cursor = "pointer";
        nextBtn.style.padding = "12px";
        nextBtn.style.borderRadius = "50%";
        overlay.appendChild(nextBtn);
        // Close button
        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "&times;";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "32px";
        closeBtn.style.right = "32px";
        closeBtn.style.fontSize = "2rem";
        closeBtn.style.background = "rgba(0,0,0,0.5)";
        closeBtn.style.color = "#fff";
        closeBtn.style.border = "none";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.padding = "12px";
        closeBtn.style.borderRadius = "50%";
        overlay.appendChild(closeBtn);
        let currentIndex = imgIndex;
        const updateImage = (idx) => {
            const imgs = Array.from(this.imagesList);
            if (idx < 0)
                idx = imgs.length - 1;
            if (idx >= imgs.length)
                idx = 0;
            fullImg.src = imgs[idx].src;
            currentIndex = idx;
        };
        prevBtn.addEventListener("click", (ev) => {
            ev.stopPropagation();
            updateImage(currentIndex - 1);
        });
        nextBtn.addEventListener("click", (ev) => {
            ev.stopPropagation();
            updateImage(currentIndex + 1);
        });
        closeBtn.addEventListener("click", (ev) => {
            ev.stopPropagation();
            document.body.removeChild(overlay);
        });
        overlay.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
        fullImg.addEventListener("click", (ev) => {
            ev.stopPropagation();
        });
        document.body.appendChild(overlay);
        // Keyboard navigation
        const keyHandler = (ev) => {
            if (ev.key === "ArrowLeft") {
                updateImage(currentIndex - 1);
            }
            else if (ev.key === "ArrowRight") {
                updateImage(currentIndex + 1);
            }
            else if (ev.key === "Escape") {
                document.body.removeChild(overlay);
                document.removeEventListener("keydown", keyHandler);
            }
        };
        document.addEventListener("keydown", keyHandler);
        // Remove overlay and event listener on close
        overlay.addEventListener("remove", () => {
            document.removeEventListener("keydown", keyHandler);
        });
    }
}
window.addEventListener("load", () => {
    let allGallery = document.querySelectorAll(".grymus-gallery");
    allGallery.forEach((gal) => {
        new Gallery(gal);
    });
});
