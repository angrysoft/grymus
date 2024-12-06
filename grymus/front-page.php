<?php

/**
 *
 * @package Ves_Theme
 */
get_header(); ?>


<main class="flex flex-col gap-2">
    <header class="container flex justify-center bg-background">
        <h1 class="font-header text-6xl p-2 bg-gradient-to-r from-blue-600 from-20% via-red-600 via-60% to-80% to-yellow-400 bg-clip-text text-transparent">Przedszkole Miejskie nr 16 Grymuś w Otwocku</h1>
    </header>
    <article class="bg-primary/80 flex flex-row p-4">
        <?php $page_hist = get_page_by_path('home/historia'); ?>
        <section class="container grid md:grid-cols-2 grid-cols-1 gap-2">
            <div class="bg-background rounded p-1">
                <h3 class="font-header text-4xl text-primary"><?php echo apply_filters('the_content', $page_hist->post_title); ?></h3>
                <div class="prose max-w-none">
                    <?php echo apply_filters('the_content', $page_hist->post_content); ?>
                </div>
            </div>
            <?php if (has_post_thumbnail($page_hist->ID)): ?>
                <?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($page_hist->ID), 'full'); ?>
                <div class="grid bg-cover bg-center bg-no-repeat h-full rounded overflow-hidden" style="background-image: url('<?php echo $image[0]; ?>')">

                </div>
            <?php endif; ?>
        </section>
    </article>
</main>

<?php get_footer() ?>