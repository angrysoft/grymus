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
<header class="grid content-center bg-primary p-2">
    <h1 class="headPage text-on-secondary"><?php the_title() ?></h1>
</header>

<?php
while (have_posts()) :
    the_post();

?>
    <main class="grid justify-center p-2">
        <div class="card prose prose-slate my-4 md:mx-auto max-w-main p-1">
            <?php the_content(); ?>
        </div>
    </main>

<?php


endwhile; // End the loop.
?>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/gallery.js" defer></script>
<?php get_footer(); ?>