<?php

/*
 
Plugin Name: Gallery posts
 
Plugin URI: https://angrysoft.ovh
 
Description: News post type.
 
Version: 1.1
 
Author: Sebastian Zwierzchowski
 
Author URI: https://angrysoft.ovh
 
License: GPLv2 or later
 
Text Domain: news_posts
 
*/

function gallery_post_type()
{
    $labels = array(
        'name'                => 'Galeria',
        'singular_name'       => 'Galeria',
        'menu_name'           => 'Galeria',
        'parent_item_colon'   => 'Nadrzędna Galeria',
        'all_items'           => 'galeria',
        'view_item'           => 'Zobacz galerie',
        'add_new_item'        => 'Dodaj galerie',
        'add_new'             => 'Dodaj nową',
        'edit_item'           => 'Edytuj galerie',
        'update_item'         => 'Aktualizuj',
        'search_items'        => 'Szukaj Galeri',
        'not_found'           => 'Nie znaleziono',
        'not_found_in_trash'  => 'Nie znaleziono'
    );
    $args = array(
        'rewrite' => array(
            'slug' => 'gallery',
            'with_front' => FALSE,
        ),
        'description'         => 'galeria',
        'labels'              => $labels,
        'supports'            => array('title', 'thumbnail', 'editor', 'post-formats', 'author'),
        'taxonomies'          => array('category', 'post_tag'),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'show_in_rest'        => true,
        'menu_position'       => 4,
        'menu_icon'           => 'dashicons-id-alt',
        'can_export'          => true,
        'has_archive'         => false,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'post',
        'template_lock'       => 'all',
        'template' => array(
            array('core/gallery', array('columns' => 2, 'className' => 'grymus-gallery', 'sizeSlug', 'medium')),
        )
    );
    register_post_type('gallery-grymus', $args);
}
add_action('init', 'gallery_post_type');
flush_rewrite_rules();