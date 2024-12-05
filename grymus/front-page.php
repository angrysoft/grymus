<?php

/**
 *
 * @package Ves_Theme
 */
get_header(); ?>

<header class="container flex justify-center">
    <h1 class="font-header text-red-40 text-6xl bg-background p-2">Przedszkole Miejskie nr 16 Grymuś w Otwocku</h1>
</header>

<?php $post_hist = get_page_by_path('home/historia'); ?>
<article class="bg-primary">
    <header class="font-header text-xl"><?php echo apply_filters('the_content', $post_hist->post_title); ?></header>
    <section class="offer-items">
        <?php echo apply_filters('the_content', $post_hist->post_content); ?>
    </section>
</article>

<?php get_footer() ?>