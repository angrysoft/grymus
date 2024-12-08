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
    <main class="">
        <article class="container group gap-2">
            <header class="grid content-center p-1 md:p-4 ">
                <div class="p-2 bg-primary rounded-xl">
                    <h1 class="headPage text-onSecondary"><?php the_title() ?></h1>
                </div>
            </header>
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 justify-around items-center p-1 md:p-4">
                <?php
                $childArgs = array(
                    'sort_order' => 'ASC',
                    'sort_column' => 'menu_order',
                    'child_of' => get_the_ID()
                );
                $childList = get_pages($childArgs);
                foreach ($childList as $child) { ?>
                    <div class="flex flex-col gap-1 relative bg-secondary justify-center items-center bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                        <a href="<?php the_permalink($child); ?>" class="block p-1 text-onSecondary rounded text-4xl font-header w-full h-full text-center"><?php echo $child->post_title; ?></a>
                    </div>
                <?php } ?>
            </div>
        </article>
    </main>

<?php

endwhile; // End the loop.
?>

<?php get_footer(); ?>