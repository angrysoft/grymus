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
    <main class="@container grid justify-center">
        <article class="group max-w-main gap-2">
            <header class="grid content-center p-1 @md:p-4 ">
                <div class="p-2 bg-primary rounded-xl">
                    <h1 class="headPage text-on-secondary"><?php the_title() ?></h1>
                </div>
            </header>
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-[minmax(0px,1fr)] max-w-[120rem] gap-2 justify-center p-1 @md:py-2 @md:px-4">
                <?php
                $childArgs = array(
                    'sort_order' => 'ASC',
                    'sort_column' => 'menu_order',
                    'child_of' => get_the_ID()
                );
                $delay = 0;
                $childList = get_pages($childArgs);
                foreach ($childList as $child) { ?>
                    <a href="<?php the_permalink($child); ?>" class="grid gap-1 relative bg-secondary text-on-secondary place-content-center rounded-xl overflow-hidden shadow-md hover:shadow-xl p-2 transition-shadow duration-500 zoomIn load-on-view" data-delay="<?php echo $delay ?>">
                        <?php echo $child->post_title; ?>
                    </a>
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