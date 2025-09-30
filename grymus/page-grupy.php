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
            <header class="grid content-center p-1 @md:py-2">
                <div class="p-2 bg-primary rounded-xl">
                    <h1 class="headPage text-on-secondary"><?php the_title() ?></h1>
                </div>
            </header>
            <div class="grid grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-3 grid-rows-[minmax(0px,1fr)] gap-2 justify-center p-1 @md:py-2 @md:px-4">
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
                    <div class="grid grid-cols-1 grid-rows-[1fr_auto_2fr] gap-1 p-2 relative bg-primary justify-center items-center bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 slideInUp load-on-view" data-delay="<?php echo $delay ?>">
                        <div class="grid justify-center items-center w-full h-full overflow-hidden bg-center bg-contain bg-no-repeat p-1" style="background-image: url('<?php echo $image[0] ?>');">
                        </div>
                        <div class="bg-secondary/80 p-1 text-on-secondary text-center rounded-sm text-4xl font-header"><?php echo $child->post_title; ?></div>
                        <div class="rounded prose bg-background/80 p-1 aspect-square">
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