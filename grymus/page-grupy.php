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

<?php while (have_posts()) : the_post(); ?>
    <main class="bg-secondary/90 grid justify-center">
        <article class="max-w-main group gap-2">
            <header class="grid content-center p-1 @md:py-2 @md:px-4">
                <div class="p-2 bg-primary rounded-xl">
                    <h1 class="headPage text-on-secondary"><?php the_title() ?></h1>
                </div>
            </header>
            <div class="grid grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-3 gap-2 justify-around p-1 @md:py-2 @md:px-4">
                <?php
                $childArgs = array(
                    'sort_order' => 'ASC',
                    'sort_column' => 'menu_order',
                    'child_of' => get_the_ID()
                );
                $childList = get_pages($childArgs);
                $delay = 0;
                foreach ($childList as $child) { ?>
                    <?php
                    if (has_post_thumbnail($child->ID)) {
                        $image = wp_get_attachment_image_src(get_post_thumbnail_id($child->ID), 'single-post-thumbnail');
                    }
                    ?>
                    <div class="flex flex-col gap-1 p-2 relative bg-primary justify-center items-center bg-cover bg-center bg-no-repeat aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 slideInUp load-on-view" data-delay="<?php echo $delay ?>">
                        <div class="flex grow justify-center items-center overflow-hidden">
                            <img src="<?php echo $image[0] ?>" alt="mrówka" class="max-h-full max-w-full" />
                        </div>
                        <p class="bg-secondary/80 p-1 text-on-secondary rounded-sm text-4xl font-header"><?php echo $child->post_title; ?></p>
                        <div class="text-on-surface">
                            <?php echo $child->post_content; ?>
                        </div>
                    </div>
                    <?php $delay += 100; ?>
                <?php } ?>
            </div>
        </article>
    </main>

<?php

endwhile; // End the loop.
?>

<?php get_footer(); ?>