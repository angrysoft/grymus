"use strict";
class ElementLoader {
    constructor() {
        this.delay = 0;
        this.timer = 0;
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2,
        };
        this.elementList = document.querySelectorAll(".load-on-view");
        this.observer = new IntersectionObserver((entries, observer) => this.onViewAction(entries, observer), options);
        this.addObservers();
    }
    onViewAction(entries, observer) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }
            let target = entry.target;
            console.log(target.dataset.delay);
            if (target.dataset.delay)
                target.style.animationDelay = target.dataset.delay + "ms";
            target.style.animationPlayState = "running";
            observer.unobserve(entry.target);
        });
    }
    getDelay(time) {
        if (time - this.timer > 500) {
            this.delay = 0;
        }
        else {
            this.delay += 200;
        }
        this.timer = time;
        return `${this.delay}ms`;
    }
    addObservers() {
        this.elementList.forEach((news) => {
            this.observer.observe(news);
        });
    }
}
window.addEventListener("load", () => {
    new ElementLoader();
});
