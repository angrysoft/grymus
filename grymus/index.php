<?php

/**
 * The template for displaying default page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#page
 *
 * @package Grymus_Theme
 */

get_header();
?>
<header class="grid content-center bg-secondary p-1">
    <h1 class="headPage text-on-secondary"><?php the_title() ?></h1>
</header>

<?php
while (have_posts()) :
    the_post();

?>
    <main class="grid justify-center">
        <div class="paper">
            <?php the_content(); ?>
        </div>
    </main>

<?php


endwhile; // End the loop.
?>

<?php get_footer(); ?>