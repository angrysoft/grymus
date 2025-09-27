<?php

/**
 * Footer template partial
 *
 * @package Grymus_Theme
 *
 */
?>
<!-- Footer -->
<footer class="@container grid justify-center bg-primary text-on-surface p-2">
    <div class="max-w-main grid grid-cols-1 sm:grid-cols-3">
        <div class="prose text-on-surface p-1">
            <h4 class="font-header p-2 border-b text-on-surface text-4xl">Numery Kont</h4>
            <p>
                Opłatę za wyżywienie<br />
                92 8001 0005 2001 0008 0129 0001
            </p>
            <p>
                Opłata za każdą godzinę ponad wymiar bezpłatnej opieki<br />
                65 8001 0005 2001 0008 0129 0002
            </p>
        </div>
        <div class="prose text-on-surface p-1">
            <h4 class="font-header p-2 border-b text-on-surface text-4xl">Kontakt</h4>
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
        <div class="prose text-on-surface p-1">
            <h4 class="font-header p-2 border-b text-on-surface text-4xl">Informacje</h4>
            <p><a href="/rodo" class="text-on-surface">RODO</a></p>
            <p><a href="/deklaracja-dostepnosci" class="text-on-surface">Deklaracja Dostępności</a></p>
        </div>
    </div>
    <div class="p-1 flex flex-wrap gap-1">
        <div>
            © <?php echo date("Y"); ?> Grymuś All rights reserved
        </div>
        <div>
            Design by <a href="https://angrysoft.ovh">AngrySoft</a>
        </div>
    </div>
</footer>
</body>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/load.js" defer></script>

</html>