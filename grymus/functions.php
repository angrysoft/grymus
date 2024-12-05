<?php
function add_theme_scripts()
{
    wp_enqueue_style('style', get_stylesheet_uri());
    // wp_enqueue_script('main', get_template_directory_uri() . '/js/main.js');
}
add_action('wp_enqueue_scripts', 'add_theme_scripts');

function grymus_setup()
{
    /*
    * Enable support for Post Thumbnails on posts and pages.
    *
    * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
    */
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(1568, 9999);

    /**
     * Add support for core custom logo.
     *
     * @link https://codex.wordpress.org/Theme_Logo
     */
    add_theme_support(
        'custom-logo',
        array(
            'height'      => 500,
            'width'       => 500,
            'flex-width'  => true,
            'flex-height' => true,
        )
    );

    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'grymus_setup');

function get_menu_logo()
{
    $custom_logo_id = get_theme_mod('custom_logo');
    $logo = wp_get_attachment_image_src($custom_logo_id, 'full');
    if (has_custom_logo()) {
        echo '<img class="h-auto max-w-full" src="' . esc_url($logo[0]) . '" alt="' . get_bloginfo('name') . '">';
    }
}


class Description_Walker extends Walker_Nav_Menu
{
    function start_el(&$output, $item, $depth = 0, $args = NULL, $id = 0)
    {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item));
        !empty($class_names) and $class_names = ' class="' . esc_attr($class_names) . '"';
        $output .= "<div id='menu-item-$item->ID' $class_names>";
        $attributes  = '';
        !empty($item->attr_title) and $attributes .= ' title="'  . esc_attr($item->attr_title) . '"';
        !empty($item->target) and $attributes .= ' target="' . esc_attr($item->target) . '"';
        !empty($item->xfn) and $attributes .= ' rel="'    . esc_attr($item->xfn) . '"';
        !empty($item->url) and $attributes .= ' href="'   . esc_attr($item->url) . '"';
        $title = apply_filters('the_title', $item->title, $item->ID);
        $item_output = $args->before
            . "<a $attributes>"
            . $args->link_before
            . $title
            . '</a>'
            . $args->link_after
            . $args->after;
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
    function end_el(&$output, $item, $depth = 0, $args = NULL)
    {
        $output .= "</div>";
    }
}
