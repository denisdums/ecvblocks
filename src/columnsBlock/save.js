import {useBlockProps, RichText} from '@wordpress/block-editor';

export default function save(props) {
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className="denisdums-columnsblock-image-wrapper">
				<div>
					<img src={props.attributes.pictureURL} alt={props.attributes.pictureAlt}/>
				</div>
			</div>
			<RichText.Content
				tagName="div"
				value={props.attributes.content}
				className="content"
			/>
		</div>
	)
}
