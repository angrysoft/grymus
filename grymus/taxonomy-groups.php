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
<header class="grid content-center bg-accents p-2">
    <h1 class="headPage text-on-accents">
        <span>Galeria</span>
        <span> - </span>
        <span><?php echo get_queried_object()->name; ?></span>
    </h1>
</header>
<main class="grid grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-3 grid-rows-[minmax(0px,1fr)] gap-2 justify-center mx-auto p-1 @md:p-2 max-w-main">
    <?php $delay = 100; ?>
    <?php
    while (have_posts()) :
        the_post();
    ?>
        <div class="grid grid-rows-[1fr_1fr] grid-cols-1 p-1 @md:p-2 shadow-2xl items-center justify-center bg-background/80 rounded w-full h-full aspect-square slideInUp load-on-view">
            <?php
            if (has_post_thumbnail()) {
                $image = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'thumbnail');
                $image = $image[0];
            } else {
                $image = esc_url(get_template_directory_uri() . '/images/grymus_logo_250.webp');
            }
            ?>
            <div class="p-1 bg-contain bg-center bg-no-repeat w-full h-full rounded" style="background-image: url('<?php echo $image ?>');">
            </div>
            <div class="grid grid-rows-[auto_auto_auto] p-1 prose prose-slate">

                <h2 class="text-center">
                    <?php
                    $post_categories = wp_get_post_terms(get_the_ID(), "groups", array('fields' => 'names'));
                    if ($post_categories) {
                    ?>
                        <span> <?php echo join(', ', $post_categories); ?> </span>
                        <span> - </span>
                    <?php
                    }
                    ?>
                    <span>
                        <?php the_title() ?>
                    </span>
                </h2>
                <?php the_excerpt(); ?>
                <div class="flex w-full">
                    <a class="btn w-full" href="<?php the_permalink(); ?>">
                        <span>pokaż</span>
                    </a>
                </div>
            </div>
        </div>

        <?php $delay += 200; ?>

    <?php
    endwhile; // End the loop.
    ?>
</main>
<?php the_posts_pagination(array(
    'mid_size'  => 2,
    'prev_text' => __('<span class="material-symbols-outlined arrow">chevron_left</span>', 'textdomain'),
    'next_text' => __('<span class="material-symbols-outlined arrow">chevron_right</span>', 'textdomain'),
)); ?>
<?php get_footer(); ?>