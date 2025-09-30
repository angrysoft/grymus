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
<header class="grid content-center bg-secondary p-2">
    <h1 class="headPage text-on-secondary"><?php single_cat_title(); ?></h1>
</header>
<main>
    <div class="grid gap-2 py-2 max-w-[120ch] mx-auto px-1 @md:py-2">
        <?php $delay = 100; ?>
        <?php
        while (have_posts()) :
            the_post();
        ?>
            <div class="grid grid-rows-[1fr_2fr] @md:grid-rows-1 grid-cols-1 p-1 @md:grid-cols-[1fr_2fr] @md:p-2 shadow-2xl items-center justify-center bg-background/80 rounded w-full h-full slideInUp load-on-view">
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
                    <h2 class="text-center"><?php the_title() ?></h2>
                    <?php the_excerpt(); ?>
                    <div class="flex justify-end w-full">
                        <a class="btn" href="<?php the_permalink(); ?>">
                            <span>pokaż więcej</span>
                        </a>
                    </div>
                </div>
            </div>

            <?php $delay += 200; ?>

        <?php
        endwhile; // End the loop.
        ?>
    </div>
</main>
<?php the_posts_pagination(array(
    'mid_size'  => 2,
    'prev_text' => __('<span class="material-symbols-outlined arrow">chevron_left</span>', 'textdomain'),
    'next_text' => __('<span class="material-symbols-outlined arrow">chevron_right</span>', 'textdomain'),
)); ?>
<?php get_footer(); ?>