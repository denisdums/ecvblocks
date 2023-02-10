import {useBlockProps, RichText} from '@wordpress/block-editor';
import {InnerBlocks} from '@wordpress/block-editor';

export default function save(props) {
	const blockProps = useBlockProps.save();
	return (
		<div {...blockProps}>
			<div className="denisdums-bannerblock-image-wrapper">
				<img src={props.attributes.pictureURL} alt={props.attributes.pictureAlt}/>
				<InnerBlocks.Content/>
			</div>
		</div>
	);
}
