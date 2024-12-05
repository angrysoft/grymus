<?php

/**
 * The template for displaying default page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#page
 *
 * @package Ves_Theme
 */

get_header();
?>
<header class="page-header">
    <h1><?php the_title() ?></h1>
</header>

<?php while (have_posts()) : the_post(); ?>
    <div class="page-content">
        <?php the_content(); ?>
    </div>
<?php
    // If comments are open or we have at least one comment, load up the comment template.
    if (comments_open() || get_comments_number()) {
        comments_template();
    }

endwhile; // End the loop.
?>

<?php get_footer(); ?>