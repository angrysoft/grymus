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
    <h1 class="headPage text-onSecondary"><?php single_cat_title(); ?> gaga</h1>
</header>
<main class="container flex flex-col items-center gap-2 my-2">
    <?php $delay = 100; ?>
    <?php
    while (have_posts()) :
        the_post();
    ?>

        <div class="card grid grid-cols-[auto_100ch] items-center justify-center prose prose-slate max-w-[125ch] w-full p-0 slideInUp load-on-view">
            <?php
            if (has_post_thumbnail()) {
                $image = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'thumbnail');
                $image = $image[0];
            } else {
                $image = esc_url(get_template_directory_uri() . '/images/grymus_logo_250.webp');
            }
            ?>
            <div class="p-1">
                <img src="<?php echo $image ?>" alt="">
            </div>
            <div class="flex flex-col items-start p-1">
                <h2><?php the_title() ?></h2>
                <?php the_excerpt(); ?>
                <div class="flex justify-end w-full p-1">
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
</main>
<?php the_posts_pagination(array(
    'mid_size'  => 2,
    'prev_text' => __('<span class="material-symbols-outlined arrow">chevron_left</span>', 'textdomain'),
    'next_text' => __('<span class="material-symbols-outlined arrow">chevron_right</span>', 'textdomain'),
)); ?>
<?php get_footer(); ?>