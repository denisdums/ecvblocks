import {useSelect} from '@wordpress/data';
import {useBlockProps} from "@wordpress/block-editor";
import {Spinner} from "@wordpress/components";
import {__} from "@wordpress/i18n";


export default function Edit(props) {
	const blockProps = useBlockProps();
	const posts = useSelect( select => {
		return select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: 3 } )
	}, [] );

	if ( ! posts ) {
		return (
			<div { ...blockProps }>
				<p className="capitaine-placeholder">
					<Spinner />
					{ __( 'Fetching posts', 'capitainewp-gut-bases' ) }
				</p>
			</div>
		)
	}

	if ( posts.length === 0 ) {
		return (
			<div { ...blockProps }>
				<p className="capitaine-placeholder">
					{ __( 'No post found', 'capitainewp-gut-bases' ) }
				</p>
			</div>
		)
	}

	return (
		<ul { ...blockProps }>
			{ posts.map( post => {
				return (
					<li>
						<a href={ post.link }>
							{ post.title.rendered }
						</a>
					</li>
				)
			} ) }
		</ul>
	)

}
