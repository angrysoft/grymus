"use strict";
class MainMenu {
    constructor() {
        this.menu = document.getElementById("menu-wrapper");
        this.menu?.addEventListener("click", () => this.menuHide());
        this.btn = document.getElementById("menu-toggle");
        this.btn?.addEventListener("click", () => this.menuShow());
    }
    menuShow() {
        if (this.menu)
            this.menu.style.left = "0";
    }
    menuHide() {
        if (!this.menu?.style.left)
            return;
        this.menu.style.left = "-200dvw";
    }
}
window.addEventListener("load", () => {
    new MainMenu();
});
