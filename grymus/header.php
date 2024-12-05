<?php

/**
 * The header for our theme.
 *
 * @package Grymus_Theme
 *
 */
?>

<!DOCTYPE html>
<html lang="pl">

<head>
    <meta name="description" content="Przedszkole Miejskie nr 16 Grymuś w Otwocku" />
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <?php wp_head(); ?>
    <style>
        .material-symbols-outlined {
            font-variation-settings:
                'FILL' 0,
                'wght' 400,
                'GRAD' 0,
                'opsz' 24
        }
    </style>
</head>

<body class="font-body text-base bg-cover bg-center bg-fixed" style="background-image: url(<?php echo get_template_directory_uri() . '/images/bg.png'; ?>);">
    <nav class="flex w-full fixed h-6 p-1 border-b-2 border-b-primary top-0 shadow z-50 flex-shrink-0 flex-row right-0 left-auto bg-background">
        <div class="flex relative w-16 p-1">
            <a href="/"><?php get_menu_logo(); ?></a>
            <span id="menu-toggle" class="material-symbols-outlined">menu</span>
        </div>
        <?php wp_nav_menu(array(
            'menu' => 'Top Menu',
            'items_wrap' => '%3$s',
            'container' => 'div',
            'container_class' => 'flex flex-row items-center justify-center',
            'walker' => new Description_Walker
        ));
        ?>
    </nav>
    <div class="mt-6"></div>