<?php

/**
 * Footer template partial
 *
 * @package Ves_Theme
 *
 */
?>
<!-- Footer -->
<footer class="bg-primary text-onSurface p-2">
    <div class="container grid grid-cols-1 sm:grid-cols-3">
        <div class="prose text-onSurface">
            <h4 class="font-header p-2 border-b text-onSurface text-4xl">Numery Kont</h4>
            <p>
                Opłatę za wyżywienie<br />
                92 8001 0005 2001 0008 0129 0001
            </p>
            <p>
                Opłata za każdą godzinę ponad wymiar bezpłatnej opieki<br />
                65 8001 0005 2001 0008 0129 0002
            </p>
        </div>
        <div class="prose text-onSurface">
            <h4 class="font-header p-2 border-b text-onSurface text-4xl">Kontakt</h4>
            <p>
                Przedszkole Miejskie nr 16 ul.<br />
                Karczewska 27A
                05-400 Otwock
            </p>
            <p>
                Telefon: 22-779-54-11
            </p>
            <p>
                Email: grymus16@wp.pl
            </p>
        </div>
        <div class="prose text-onSurface">
            <h4 class="font-header p-2 border-b text-onSurface text-4xl">Informacje</h4>
            <p><a href="/rodo" class="text-onSurface">RODO</a></p>
            <p><a href="/deklaracja-dostepnosci" class="text-onSurface">Deklaracja Dostępności</a></p>
        </div>
    </div>
    <div class="p-1">
        © <?php echo date("Y"); ?> Grymuś All rights reserved
    </div>
</footer>
<script>
    function menuShow() {
        const menu = document.getElementById("menu-wrapper");
        menu.style.left = "0";
    }

    function menuHide() {
        const menu = document.getElementById("menu-wrapper");
        if (!menu.style.left) return;
        menu.style.left = "-100dvw";
    }


    document.getElementById("menu-wrapper").addEventListener("click", () => {
        menuHide();
    });
    document.getElementById("menu-toggle").addEventListener("click", () => {
        menuShow();
    });
</script>
</body>

</html>