<?php

/**
 * The header for our theme.
 *
 * @package Grymus_Theme
 *
 */
?>

<!DOCTYPE html>
<html lang="pl" class="scroll-smooth m-0 p-0" style="scrollbar-width: thin;">

<head>
    <meta name="description" content="Przedszkole Miejskie nr 16 Grymuś w Otwocku" />
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
    <?php wp_head(); ?>
    <style>
        .material-symbols-outlined {
            font-variation-settings:
                'FILL' 1,
                'wght' 400,
                'GRAD' 0,
                'opsz' 24
        }
    </style>
    
</head>

<body class="font-body text-base bg-cover bg-center bg-fixed relative" style="background-image: url(<?php echo get_template_directory_uri() . '/images/bg.png'; ?>);">
    <nav class="grid grid-cols-1 lg:grid-cols-2 justify-center lg:justify-between sticky top-0 right-0 left-auto w-full h-6 lg:px-3 px-1 py-1  border-b-2 border-b-primary  shadow z-50  bg-background">
        <div class="flex justify-start lg:justify-between items-center relative h-full">
            <button id="menu-toggle" class="material-symbols-outlined block lg:hidden text-4xl font-bold" type="button">menu</button>
            <a class="flex justify-center lg:justify-start h-full w-full" href="/"><?php get_menu_logo(); ?></a>
        </div>
        <div id="menu-wrapper" class="grid items-start z-50 lg:items-center fixed lg:relative h-full w-full left-[-100dvw] lg:left-[unset] bg-background/90 transition-left duration-500 px-1 pt-6 lg:p-0">
            <?php wp_nav_menu(array(
                'menu' => 'Top Menu',
                'items_wrap' => '%3$s',
                'container' => 'div',
                'container_class' => 'grid lg:grid-flow-col gap-1 items-center justify-start lg:justify-end overflow-hidden lg:overflow-none h-max lg:h-full text-xl font-bold bg-gradient-to-r from-blue-600 from-20% via-red-600 via-60% to-80% to-yellow-400 bg-clip-text text-transparent',
                'walker' => new Description_Walker
            ));
            ?>
        </div>
    </nav>