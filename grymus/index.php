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
<header class="grid content-center bg-secondary p-4">
    <h1 class="headPage text-onSecondary"><?php the_title() ?></h1>
</header>

<?php
while (have_posts()) :
    the_post();
    // the_ID();
    // post_class();
    // get_the_title();
?>
    <main class="container">
        <div class="card prose prose-slate my-4 md:mx-auto md:max-w-3xl lg:max-w-6xl p-1 md:p-4">
            <?php the_content(); ?>
        </div>
    </main>

<?php


endwhile; // End the loop.
?>
<!-- <?php get_template_part('parts/to', 'contact'); ?> -->

<?php get_footer(); ?>