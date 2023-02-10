import {__} from '@wordpress/i18n'
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	InspectorControls,
	PanelColorSettings, InnerBlocks
} from '@wordpress/block-editor'
import {Placeholder, Button} from '@wordpress/components'
import {Fragment} from '@wordpress/element'

import './editor.scss'

export default function Edit(props) {
	const blockProps = useBlockProps()

	const onSelectImage = picture => {
		props.setAttributes({
			pictureID: picture.id,
			pictureURL: picture.url,
			pictureAlt: picture.alt,
		})
	}

	const onRemoveImage = () => {
		props.setAttributes({
			pictureID: null,
			pictureURL: null,
			pictureAlt: null,
		})
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelColorSettings title={__('Couleurs')}
									colorSettings={
										[{
											value: props.attributes.textColor,
											onChange: textColor => props.setAttributes({textColor}),
											label: __('Couleur du texte')
										}]
									}/>
			</InspectorControls>
			<div {...blockProps}>
				{!props.attributes.pictureID ? (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={['image']}
							value={props.attributes.pictureID}
							render={({open}) => (
								<Placeholder
									icon="images-alt"
									label={__('Image de bannière')}
									instructions={__('Ajouter une image de bannière')}
								>
									<Button isPrimary isLarge onClick={open} icon="upload">
										{__('Ajouter une image')}
									</Button>
								</Placeholder>
							)}
						/>
					</MediaUploadCheck>
				) : (
					<div className="denisdums-bannerblock-image-wrapper"
						 style={{color: props.attributes.textColor ? props.attributes.textColor : 'inherit'}}>
						<img src={props.attributes.pictureURL} alt={props.attributes.pictureAlt}/>
						<InnerBlocks allowedBlocks={['core/heading', 'core/paragraph']}/>
						{props.isSelected && (
							<Button
								className="denisdums-bannerblock-remove-image"
								onClick={onRemoveImage}
								icon="dismiss"
							/>
						)}
					</div>
				)}
			</div>
		</Fragment>
	)
}
