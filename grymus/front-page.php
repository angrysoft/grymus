<?php

/**
 *
 * @package Grymus_Theme
 */
get_header(); ?>


<main class="flex flex-col gap-2 mb-2">
    <header class="card mt-2 slideInUp load-on-view">
        <h1 class="headMain">Przedszkole Miejskie nr 16 Grymuś w Otwocku</h1>
    </header>
    <article class=" bg-primary/80 grid @md:p-4 p-1 slideInUp load-on-view" data-delay="500">
        <?php $page_hist = get_page_by_path('home/historia'); ?>
        <section class="grid @xl:grid-cols-2 max-w-main grid-cols-1 gap-2 items-center mx-auto">
            <div class="card">
                <h3 class="font-header text-4xl text-primary"><?php echo apply_filters('the_content', $page_hist->post_title); ?></h3>
                <div class="prose max-w-[100ch]">
                    <?php echo apply_filters('the_content', $page_hist->post_content); ?>
                </div>
            </div>

            <?php if (has_post_thumbnail($page_hist->ID)): ?>
                <div class="card">
                    <?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($page_hist->ID), 'full'); ?>
                    <img class="grid bg-contain bg-center bg-no-repeat w-full h-auto rounded-sm shadow-inner" alt="header" src="<?php echo $image[0]; ?>">

                </div>
            <?php endif; ?>
        </section>
    </article>
    <article class="flex flex-row p-1 md:p-4 justify-center">
        <?php $page_wiz = get_page_by_path('home/wizja-przedszkola'); ?>
        <div class="max-w-main card py-1 @md:px-4 p-1 slideInUp load-on-view">
            <h3 class="font-header text-4xl text-primary"><?php echo apply_filters('the_content', $page_wiz->post_title); ?></h3>
            <div class="prose max-w-[100ch]">
                <?php echo apply_filters('the_content', $page_wiz->post_content); ?>
            </div>
        </div>
    </article>
    <article class="bg-primary/80 grid justify-center p-4">
        <div class="max-w-main flex flex-wrap gap-2 justify-between">
            <?php $page_cat = get_page_by_path('home/kategorie'); ?>
            <?php
            $childArgs = array(
                'sort_order' => 'ASC',
                'sort_column' => 'menu_order',
                'child_of' => $page_cat->ID
            );
            $childList = get_pages($childArgs);
            $delay = 0;
            foreach ($childList as $child) { ?>
                <?php if (has_post_thumbnail($child->ID)): ?>
                    <?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($child->ID), 'full'); ?>
                    <div class="grid justify-center items-end p-2 bg-cover bg-center bg-no-repeat h-[20rem] w-xs rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 slideInUp load-on-view" style="background-image: url('<?php echo $image[0]; ?>')" data-delay="<?php echo $delay ?>">
                        <a href="<?php the_permalink($child); ?>" class="bg-secondary/80 p-1 text-on-secondary rounded-sm text-4xl font-header shadow-sm">
                            <?php echo $child->post_title; ?>
                        </a>
                    </div>
                <?php endif; ?>
                <?php $delay += 200 ?>
            <?php } ?>
        </div>
    </article>

    <article id="kontakt" class="grid gap-3 justify-center pt-6">
        <div class="grid grid-cols-1 max-w-main @md:grid-cols-3 gap-2 justify-between">
            <div class="card aspect-square p-2 items-center justify-around hover:shadow-xl transition-shadow duration-500 slideInUp load-on-view" data-delay="0">
                <span class="material-symbols-outlined text-primary !text-8xl text-center">location_on</span>
                <h4 class="font-header text-center text-4xl text-primary pt-1">Adres</h4>
                <hr class="border border-primary/60 w-full m-2">
                <div class="grid justify-center gap-1 text-center text-2xl prose ">
                    Przedszkole Miejskie nr 16<br>
                    ul. Karczewska 27A<br>
                    05-400 Otwock
                </div>
            </div>
            <div class="card aspect-square p-2 items-center justify-around hover:shadow-xl transition-shadow duration-500 slideInUp load-on-view" data-delay="200">
                <span class="material-symbols-outlined text-primary !text-8xl text-center">call</span>
                <h4 class="font-header text-center text-4xl text-primary pt-1">Kontakt</h4>
                <hr class="border border-primary/60 w-full m-2">
                <div class="grid justify-center gap-1 p-1 text-center text-2xl prose">
                    <a href="tel:227795411">22-779-54-11</a>
                    <a href="mailto:grymus16@wp.pl">grymus16@wp.pl</a>
                </div>
            </div>
            <div class="card aspect-square p-2 items-center justify-around hover:shadow-xl transition-shadow duration-500 slideInUp load-on-view" data-delay="400">
                <span class="material-symbols-outlined text-primary !text-8xl text-center">schedule</span>
                <h4 class="font-header text-center text-4xl text-primary pt-1">Godziny Otwarcia</h4>
                <hr class="border border-primary/60 w-full m-2">
                <div class="grid justify-center gap-1 p-1 text-center text-2xl prose">
                    7:00 - 17:00
                </div>
            </div>
        </div>
        <div class="card zoomIn max-w-main load-on-view" data-delay="600">
            <iframe
                title="maps"
                width="100%"
                height="450"
                class="border-0"
                loading="lazy"
                src="https://maps.google.pl/maps?f=q&source=s_q&hl=pl&geocode=&q=Grymu%C5%9B.+Przedszkole+nr+16+ul.+Karczewska+27A+05-400+Otwock&aq=&sll=52.102472,21.264124&sspn=0.023171,0.065875&ie=UTF8&hq=Grymu%C5%9B.+Przedszkole+nr+16+ul.&hnear=Karczewska+27A,+Otwock,+otwocki,+mazowieckie&t=m&ll=52.10247,21.264128&spn=0.006295,0.006295&output=embed"></iframe>
        </div>
    </article>
</main>

<?php get_footer() ?>