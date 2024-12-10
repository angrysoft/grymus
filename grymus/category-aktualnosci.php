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
    <h1 class="headPage text-onSecondary"><?php single_cat_title(); ?></h1>
</header>

<?php
while (have_posts()) :
    the_post();
    // the_ID();
    // post_class();
    // get_the_title();
?>
    <main class="container">
        <div class="card prose prose-slate my-4 md:mx-auto max-w-[100ch] p-1 md:p-4">
            <?php the_excerpt(); ?>
        </div>
    </main>

<?php


endwhile; // End the loop.
?>

<?php the_posts_pagination(array(
    'mid_size'  => 2,
    'prev_text' => __('<span class="material-symbols-outlined arrow">chevron_left</span>', 'textdomain'),
    'next_text' => __('<span class="material-symbols-outlined arrow">chevron_right</span>', 'textdomain'),
)); ?>
<?php get_footer(); ?>