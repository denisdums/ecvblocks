<?php
/**
 * Plugin Name:       Denisdumsblocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       denisdumsblocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

add_action('init', function () {
	register_block_type(__DIR__ . '/build/bannerBlock');
	register_block_type(__DIR__ . '/build/columnsBlock');
	register_block_type(__DIR__ . '/build/dynamicBLoc', [
		'render_callback' => 'dynamicBLoc_render_callback',
	]);
});


add_filter( 'block_categories_all', function ( $categories ) {
	$categories[] = [
		'slug' => 'denisdums',
		'title' => 'DenisDums Blocks',
	];
	return $categories;
} );

function dynamicBLoc_render_callback(): string
{
	$args = [
		'posts_per_page' => 3,
	];

	$posts = get_posts( $args );

	if( count( $posts ) == 0 ) {
		return '<p>Pas d’article</p>';
	}

	$markup = '<ul class="wp-block-capitainewp-dynamic">';

	foreach( $posts as $post ) {

		$markup .= sprintf(
			'<li><a href="%1$s">%2$s</a></li>',
			esc_url( get_permalink( $post->ID ) ),
			esc_html( get_the_title( $post->ID ) )
		);
	}
	$markup .= '</ul>';

	return $markup;
}
