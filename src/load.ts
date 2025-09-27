class ElementLoader {
  private readonly elementList: NodeListOf<HTMLElement>;
  private readonly observer: IntersectionObserver;
  private delay: number = 0;
  private timer: number = 0;

  constructor() {
    let options: Object = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
      delay: 200,
    };
    this.elementList = document.querySelectorAll(".load-on-view");
    this.observer = new IntersectionObserver(
      (entries, observer) => this.onViewAction(entries, observer),
      options
    );
    this.addObservers();
  }

  private onViewAction(
    entries: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      let target = entry.target as HTMLElement;
      console.log(target.dataset.delay);
      if (target.dataset.delay)
        target.style.animationDelay = target.dataset.delay + "ms";
      target.style.animationPlayState = "running";
      observer.unobserve(entry.target);
    });
  }

  private getDelay(time: number) {
    if (time - this.timer > 500) {
      this.delay = 0;
    } else {
      this.delay += 200;
    }
    this.timer = time;
    return `${this.delay}ms`;
  }

  private addObservers() {
    this.elementList.forEach((item) => {
      this.observer.observe(item);
    });
  }
}

window.addEventListener("load", () => {
  new ElementLoader();
});
