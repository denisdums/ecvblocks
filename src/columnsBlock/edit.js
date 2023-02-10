import {__} from '@wordpress/i18n'
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	RichText,
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
			<div {...blockProps}>
				<div className="denisdums-columnsblock-image-wrapper">
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
						<Fragment>
							<img src={props.attributes.pictureURL} alt={props.attributes.pictureAlt}/>
							{props.isSelected && (
								<Button onClick={onRemoveImage} icon="dismiss" className="denisdums-remove-image"/>
							)}
						</Fragment>
					)}
				</div>
				<RichText
					tagName="div"
					multiline="p"
					placeholder="Texte"
					value={props.attributes.content}
					className="content"
					onChange={content => props.setAttributes({content})}
				/>
			</div>
	)
}
