import styles from "../styles/updateCard.module.css"
import { useState } from "react";
import finnishImg from "../images/finnish_flag.png"
import englishImg from "../images/english_flag.png"
import deleteImg from "../images/delete_icon.png"
import Image from "next/image";
import axios from "axios"
import { getAuthToken } from "../utils/authToken";

const UpdateCard = ({ card, reloadCards }) => {

	const [showCategoryTagInputENState, setShowCategoryTagInputENState] = useState(card.categoryEN ? false : true)
	const [categoryTagENState, setCategoryTagENState] = useState(card.categoryEN)
	const [showCategoryTagInputFINState, setShowCategoryTagInputFINState] = useState(card.categoryFIN ? false : true)
	const [categoryTagFINState, setCategoryTagFINState] = useState(card.categoryFIN)

	const [selectedImageState, setSelectedImageState] = useState(undefined);
	const [imagePreviewState, setImagePreviewState] = useState(`data:image/png;base64,${card.image}`);
	const [showImageInputState, setShowImageInput] = useState(card.image ? false : true)

	const [showCasinoNameInputState, setShowCasinoNameInputState] = useState(card.title ? false : true)
	const [casinoNameState, setCasinoNameState] = useState(card.title)

	const [showDescriptionTitleInputENState, setShowDescriptionTitleInputENState] = useState(card.descriptionTitleEN ? false : true)
	const [descriptionTitleENState, setDescriptionTitleENState] = useState(card.descriptionTitleEN)
	const [showDescriptionTitleInputFINState, setShowDescriptionTitleInputFINState] = useState(card.descriptionTitleFIN ? false : true)
	const [descriptionTitleFINState, setDescriptionTitleFINState] = useState(card.descriptionTitleFIN)

	const [showDescriptionInputENState, setShowDescriptionInputENState] = useState(card.descriptionEN ? false : true)
	const [descriptionENState, setDescriptionENState] = useState(card.descriptionEN)
	const [showDescriptionInputFINState, setShowDescriptionInputFINState] = useState(card.descriptionFIN ? false : true)
	const [descriptionFINState, setDescriptionFINState] = useState(card.descriptionFIN)

	const [showClaimLinkInputState, setShowClaimLinkInputState] = useState(card.refLink ? false : true)
	const [claimLinkState, setClaimLinkState] = useState(card.refLink)

	const [selectedLanguage, setSelectedLanguage] = useState("en")

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
		formData.append("categoryEN", categoryTagENState)
		formData.append("categoryFIN", categoryTagFINState)
		formData.append("image", selectedImageState ? selectedImageState : "")
		formData.append("title", casinoNameState)
		formData.append("descriptionTitleEN", descriptionTitleENState)
		formData.append("descriptionTitleFIN", descriptionTitleFINState)
		formData.append("descriptionEN", descriptionENState)
		formData.append("descriptionFIN", descriptionFINState)
		formData.append("orderNumberEN", card.orderNumberEN)
		formData.append("orderNumberFIN", card.orderNumberFIN)
		formData.append("refLink", claimLinkState)

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

	const handleDeleteCard = async () => {
		const confirmed = window.confirm("Delete this card? (It will be deleted from both finnish and english pages. If you want to delete just finnish or english version, use update.)");
		if (confirmed) {
			const formData = new FormData()
			formData.append("id", card.id)

			await axios.delete('/api/card', {
				headers: {
					'Authorization': getAuthToken()
				},
				data: formData
			})
				.then(() => {
					reloadCards()
				}).catch((e) => {
					console.error(e.response.data)
				})
		}
	}

	return (
		<div className={styles.main}>
			<div className={styles.contentContainer}>
				<div className={styles.cardContainer}>
					<div className={styles.cardContent}>


						{selectedLanguage === "en" ?
							<div className={styles.categoryTagEditContainer}>
								{showCategoryTagInputENState === false ?
									<div className={styles.categoryTagContainer} onMouseOver={() => { setShowCategoryTagInputENState(true) }}>
										<p className={styles.categoryTag}>{categoryTagENState}</p>
									</div>
									:
									<div className={styles.categoryTagInputContainer} onMouseLeave={() => { if (categoryTagENState) { setShowCategoryTagInputENState(false) } }}>
										<input type="text" className={styles.categoryTagInput} placeholder="Enter category" value={categoryTagENState} onChange={(e) => { setCategoryTagENState(e.target.value) }} />
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
								{showDescriptionTitleInputENState === false ?
									<div className={styles.descriptionTitleContainer} onMouseOver={() => { setShowDescriptionTitleInputENState(true) }}>
										<h4 className={styles.descriptionTitle}>{descriptionTitleENState}</h4>
									</div>
									:
									<div className={styles.descriptionTitleInputContainer} onMouseLeave={() => { if (descriptionTitleENState) [setShowDescriptionTitleInputENState(false)] }}>
										<input type="text" className={styles.descriptionTitleInput} placeholder="Enter description title" value={descriptionTitleENState} onChange={(e) => { setDescriptionTitleENState(e.target.value) }} />
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
								{showDescriptionInputENState === false ?
									<div className={styles.descriptionContainer} onMouseOver={() => { setShowDescriptionInputENState(true) }}>
										<p className={styles.description}>{descriptionENState}</p>
									</div>
									:
									<div className={styles.descriptionInputContainer} onMouseLeave={() => { if (descriptionENState) { setShowDescriptionInputENState(false) } }}>
										<textarea className={styles.descriptionInput} placeholder="Enter description" value={descriptionENState} onChange={(e) => { setDescriptionENState(e.target.value) }} />
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
					<Image className={styles.deleteButton} src={deleteImg} alt="deleteImg" onClick={() => { handleDeleteCard() }} />
				</div>
				<button className={styles.updateCardButton} onClick={() => { handleUpdateCard() }}>
					Update card
				</button>
			</div>
		</div>
	)
}

export default UpdateCard 