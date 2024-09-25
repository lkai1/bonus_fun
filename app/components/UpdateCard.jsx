import styles from "../styles/updateCard.module.css"
import { useState } from "react";
import finnishImg from "../images/finnish_flag.png"
import englishImg from "../images/english_flag.png"
import Image from "next/image";
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { getAuthToken } from "../utils/authToken";

const UpdateCard = ({ card, reloadCards, totalNumberOfCards }) => {

	const [showCategoryTagInputState, setShowCategoryTagInputState] = useState(card.category ? false : true)
	const [categoryTagState, setCategoryTagState] = useState(card.category)
	const [showCategoryTagInputFINState, setShowCategoryTagInputFINState] = useState(card.categoryFin ? false : true)
	const [categoryTagFINState, setCategoryTagFINState] = useState(card.categoryFin)

	const [selectedImageState, setSelectedImageState] = useState(undefined);
	const [imagePreviewState, setImagePreviewState] = useState(`data:image/png;base64,${card.image}`);
	const [showImageInputState, setShowImageInput] = useState(card.image ? false : true)

	const [showCasinoNameInputState, setShowCasinoNameInputState] = useState(card.title ? false : true)
	const [casinoNameState, setCasinoNameState] = useState(card.title)

	const [showDescriptionTitleInputState, setShowDescriptionTitleInputState] = useState(card.descriptionTitle ? false : true)
	const [descriptionTitleState, setDescriptionTitleState] = useState(card.descriptionTitle)
	const [showDescriptionTitleInputFINState, setShowDescriptionTitleInputFINState] = useState(card.descriptionTitleFin ? false : true)
	const [descriptionTitleFINState, setDescriptionTitleFINState] = useState(card.descriptionTitleFin)

	const [showDescriptionInputState, setShowDescriptionInputState] = useState(card.description ? false : true)
	const [descriptionState, setDescriptionState] = useState(card.description)
	const [showDescriptionInputFINState, setShowDescriptionInputFINState] = useState(card.descriptionFin ? false : true)
	const [descriptionFINState, setDescriptionFINState] = useState(card.descriptionFin)

	const [showClaimLinkInputState, setShowClaimLinkInputState] = useState(card.refLink ? false : true)
	const [claimLinkState, setClaimLinkState] = useState(card.refLink)

	const [selectedLanguage, setSelectedLanguage] = useState("en")

	const [showOrderSelectionMenu, setShowOrderSelectionMenu] = useState(false)
	const [cardOrderState, setCardOrderState] = useState(card.order)

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', "image/jpg"];
			if (!validImageTypes.includes(file.type)) {
				alert('Please upload a valid image file (JPEG, PNG, WEBP, JPG)');
				return;
			}
			setSelectedImageState(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreviewState(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	const handleUpdateCard = async () => {
		const formData = new FormData()
		formData.append("id", card.id)
		formData.append("category", categoryTagState)
		formData.append("categoryFin", categoryTagFINState)
		formData.append("image", selectedImageState ? selectedImageState : "")
		formData.append("title", casinoNameState)
		formData.append("descriptionTitle", descriptionTitleState)
		formData.append("descriptionTitleFin", descriptionTitleFINState)
		formData.append("description", descriptionState)
		formData.append("descriptionFin", descriptionFINState)
		formData.append("refLink", claimLinkState)
		formData.append("order", cardOrderState)

		await axios.patch("/api/card", formData, {
			headers: {
				Authorization: getAuthToken()
			}
		})
			.then(() => {
				alert("Successfully updated card.")
				reloadCards()
			}).catch((e) => {
				console.error(e.response.data)
			})
	}

	return (
		<div className={styles.main}>
			<div className={styles.contentContainer}>
				<div className={styles.cardContainer}>
					<div className={styles.cardContent}>


						{selectedLanguage === "en" ?
							<div className={styles.categoryTagEditContainer}>
								{showCategoryTagInputState === false ?
									<div className={styles.categoryTagContainer} onMouseOver={() => { setShowCategoryTagInputState(true) }}>
										<p className={styles.categoryTag}>{categoryTagState}</p>
									</div>
									:
									<div className={styles.categoryTagInputContainer} onMouseLeave={() => { if (categoryTagState) { setShowCategoryTagInputState(false) } }}>
										<input type="text" className={styles.categoryTagInput} placeholder="Enter category" value={categoryTagState} onChange={(e) => { setCategoryTagState(e.target.value) }} />
									</div>
								}
							</div>
							:
							<div className={styles.categoryTagEditContainer}>
								{showCategoryTagInputFINState === false ?
									<div className={styles.categoryTagContainer} onMouseOver={() => { setShowCategoryTagInputFINState(true) }}>
										<p className={styles.categoryTag}>{categoryTagFINState}</p>
									</div>
									:
									<div className={styles.categoryTagInputContainer} onMouseLeave={() => { if (categoryTagFINState) { setShowCategoryTagInputFINState(false) } }}>
										<input type="text" className={styles.categoryTagInput} placeholder="Enter category" value={categoryTagFINState} onChange={(e) => { setCategoryTagFINState(e.target.value) }} />
									</div>
								}
							</div>
						}


						<div className={styles.imageEditContainer}>
							{showImageInputState === false ?
								<div className={styles.imageContainer} onMouseOver={() => { { setShowImageInput(true) } }}>
									<img className={styles.image} src={imagePreviewState} alt="image" />
								</div>
								:
								<div className={styles.imageInputContainer} onMouseLeave={() => { if (imagePreviewState) { setShowImageInput(false) } }}>
									<input type="file" id="imageInput" className={styles.imageInput} onChange={(e) => { handleImageChange(e) }} />
									<label htmlFor="imageInput" className={styles.imageInputLabel}>{imagePreviewState ? "Change image" : "Upload image"}</label>
								</div>
							}
						</div>


						<div className={styles.casinoNameEditContainer}>
							{showCasinoNameInputState === false ?
								<div className={styles.casinoNameContainer} onMouseOver={() => { setShowCasinoNameInputState(true) }}>
									<h1 className={styles.casinoName} >{casinoNameState}</h1>
								</div>
								:
								<div className={styles.casinoNameInputContainer} onMouseLeave={() => { if (casinoNameState) { setShowCasinoNameInputState(false) } }}>
									<input type="text" className={styles.casinoNameInput} placeholder="Enter casino name" value={casinoNameState} onChange={(e) => { setCasinoNameState(e.target.value) }} />
								</div>
							}
						</div>


						{selectedLanguage === "en" ?
							<div className={styles.descriptionTitleEditContainer}>
								{showDescriptionTitleInputState === false ?
									<div className={styles.descriptionTitleContainer} onMouseOver={() => { setShowDescriptionTitleInputState(true) }}>
										<h4 className={styles.descriptionTitle}>{descriptionTitleState}</h4>
									</div>
									:
									<div className={styles.descriptionTitleInputContainer} onMouseLeave={() => { if (descriptionTitleState) [setShowDescriptionTitleInputState(false)] }}>
										<input type="text" className={styles.descriptionTitleInput} placeholder="Enter description title" value={descriptionTitleState} onChange={(e) => { setDescriptionTitleState(e.target.value) }} />
									</div>
								}
							</div>
							:
							<div className={styles.descriptionTitleEditContainer}>
								{showDescriptionTitleInputFINState === false ?
									<div className={styles.descriptionTitleContainer} onMouseOver={() => { setShowDescriptionTitleInputFINState(true) }}>
										<h4 className={styles.descriptionTitle}>{descriptionTitleFINState}</h4>
									</div>
									:
									<div className={styles.descriptionTitleInputContainer} onMouseLeave={() => { if (descriptionTitleFINState) [setShowDescriptionTitleInputFINState(false)] }}>
										<input type="text" className={styles.descriptionTitleInput} placeholder="Enter description title" value={descriptionTitleFINState} onChange={(e) => { setDescriptionTitleFINState(e.target.value) }} />
									</div>
								}
							</div>
						}


						{selectedLanguage === "en" ?
							<div className={styles.descriptionEditContainer}>
								{showDescriptionInputState === false ?
									<div className={styles.descriptionContainer} onMouseOver={() => { setShowDescriptionInputState(true) }}>
										<p className={styles.description}>{descriptionState}</p>
									</div>
									:
									<div className={styles.descriptionInputContainer} onMouseLeave={() => { if (descriptionState) { setShowDescriptionInputState(false) } }}>
										<textarea className={styles.descriptionInput} placeholder="Enter description" value={descriptionState} onChange={(e) => { setDescriptionState(e.target.value) }} />
									</div>
								}
							</div>
							:
							<div className={styles.descriptionEditContainer}>
								{showDescriptionInputFINState === false ?
									<div className={styles.descriptionContainer} onMouseOver={() => { setShowDescriptionInputFINState(true) }}>
										<p className={styles.description}>{descriptionFINState}</p>
									</div>
									:
									<div className={styles.descriptionInputContainer} onMouseLeave={() => { if (descriptionFINState) { setShowDescriptionInputFINState(false) } }}>
										<textarea className={styles.descriptionInput} placeholder="Enter description" value={descriptionFINState} onChange={(e) => { setDescriptionFINState(e.target.value) }} />
									</div>
								}
							</div>
						}


						<div className={styles.claimLinkEditContainer}>
							{showClaimLinkInputState === false ?
								<div className={styles.claimLinkContainer} onMouseOver={() => { setShowClaimLinkInputState(true) }}>
									<a className={styles.claimLink} href="https://stake.com/fi" target="_blank">Claim Bonus</a>
								</div>
								:
								<div className={styles.claimLinkInputContainer} onMouseLeave={() => { if (claimLinkState) { setShowClaimLinkInputState(false) } }}>
									<input className={styles.claimLinkInput} placeholder="Enter claim link" value={claimLinkState} onChange={(e) => { setClaimLinkState(e.target.value) }} />
								</div>
							}
						</div>


					</div>
				</div>
				<div className={styles.settingsContainer}>
					<Image className={selectedLanguage === "en" ? styles.languageSelectionButtonSelected : styles.languageSelectionButton} src={englishImg} alt="englishImg" onClick={() => { setSelectedLanguage("en") }} />
					<Image className={selectedLanguage === "fi" ? styles.languageSelectionButtonSelected : styles.languageSelectionButton} src={finnishImg} alt="finnishImg" onClick={() => { setSelectedLanguage("fi") }} />
					<div className={showOrderSelectionMenu ? styles.orderSelectionMenu : styles.orderSelectionMenuHidden}>
						{Array.from({ length: totalNumberOfCards }, (_, i) => i + 1).map((number) => {
							return <button key={uuidv4()} className={styles.orderSelectionButton} onClick={() => {
								setCardOrderState(number)
								setShowOrderSelectionMenu(!showOrderSelectionMenu)
							}}>
								{`#${number}`}
							</button>
						})}
					</div>
					<button className={styles.orderSelectionMenuButton} onClick={() => { setShowOrderSelectionMenu(!showOrderSelectionMenu) }}>{`#${cardOrderState}`}</button>
				</div>
				<button className={styles.updateCardButton} onClick={() => { handleUpdateCard() }}>
					Update card
				</button>
			</div>
		</div>
	)
}

export default UpdateCard 