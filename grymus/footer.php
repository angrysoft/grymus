<?php

/**
 * Footer template partial
 *
 * @package Ves_Theme
 *
 */
?>
<!-- Footer -->
<footer class="footer flex">
    <div class="rights">
        © <?php echo date("Y"); ?> Grymuś All rights reserved
    </div>
</footer>
<script>
    function menuToggle() {
        const menu = document.getElementById("menu-wrapper");
        console.log("toogle", menu.style.left)
        if (menu.style.left === "0px") {
            menu.style.left = "-100dvw";
        } else {
            menu.style.left = "0";
        }
    }


    document.getElementById("menu-wrapper").addEventListener("click", ()=> {
        console.log("click");
        menuToggle();
    });
    document.getElementById("menu-toggle").addEventListener("click", ()=> {
        console.log("click");
        menuToggle();
    });
</script>
</body>

</html>