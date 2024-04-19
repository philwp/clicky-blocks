<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>

<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="phil-webs"
    data-wp-watch="callbacks.logIsOpen"
    data-wp-watch--ismatch="callbacks.checkIsMatch"
>
    <h2><?php esc_html_e('Game Stats', 'phil-webs'); ?></h2>
    <ul>
        <li><?php esc_html_e('Attempts:', 'phil-webs'); ?> <span data-wp-text="state.attemptCount"></span></li>
        <li><?php esc_html_e('Matches:', 'phil-webs'); ?> <span data-wp-text="state.matchCount"></span></li>
    </ul>
    <div class="card-wrapper">
        <template 
            data-wp-each--card="state.cards"
            data-wp-each-key="context.card.id"
        >
            <div
            class="card"
            data-wp-on--click="actions.flip"
            data-wp-class--matched="context.card.matched"
            >
                <div data-wp-bind--hidden="!context.card.flipped" >
                    <!-- Replace this with an image -->
                    <h2 data-wp-text="context.card.value"></h2>
                </div> 
            </div>
        </template>
    </div>
</div>
