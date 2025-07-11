import styles from "../styles/newCard.module.css"
import { useState } from "react";
import finnishImg from "../images/finnish_flag.png"
import englishImg from "../images/english_flag.png"
import Image from "next/image";
import axios from "axios"
import { getAuthToken } from "../utils/authToken";

const NewCard = ({ reloadCards }) => {

	const [showCategoryTagInputENState, setShowCategoryTagInputENState] = useState(true)
	const [categoryTagENState, setCategoryTagENState] = useState("")
	const [showCategoryTagInputFINState, setShowCategoryTagInputFINState] = useState(true)
	const [categoryTagFINState, setCategoryTagFINState] = useState("")

	const [selectedImageState, setSelectedImageState] = useState(undefined);
	const [imagePreviewState, setImagePreviewState] = useState(undefined);
	const [showImageInputState, setShowImageInput] = useState(true)

	const [showCasinoNameInputState, setShowCasinoNameInputState] = useState(true)
	const [casinoNameState, setCasinoNameState] = useState("")

	const [showDescriptionTitleInputENState, setShowDescriptionTitleInputENState] = useState(true)
	const [descriptionTitleENState, setDescriptionTitleENState] = useState("")
	const [showDescriptionTitleInputFINState, setShowDescriptionTitleInputFINState] = useState(true)
	const [descriptionTitleFINState, setDescriptionTitleFINState] = useState("")

	const [showDescriptionInputENState, setShowDescriptionInputENState] = useState(true)
	const [descriptionENState, setDescriptionENState] = useState("")
	const [showDescriptionInputFINState, setShowDescriptionInputFINState] = useState(true)
	const [descriptionFINState, setDescriptionFINState] = useState("")

	const [showClaimLinkInputENState, setShowClaimLinkInputENState] = useState(true)
	const [claimLinkENState, setClaimLinkENState] = useState("")
	const [showClaimLinkInputFINState, setShowClaimLinkInputFINState] = useState(true)
	const [claimLinkFINState, setClaimLinkFINState] = useState("")

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

	const emptyAll = () => {
		setShowCategoryTagInputENState(true)
		setCategoryTagENState("")
		setShowCategoryTagInputFINState(true)
		setCategoryTagFINState("")

		setSelectedImageState(undefined)
		setImagePreviewState(undefined)
		setShowImageInput(true)

		setShowCasinoNameInputState(true)
		setCasinoNameState("")

		setShowDescriptionTitleInputENState(true)
		setDescriptionTitleENState("")
		setShowDescriptionTitleInputFINState(true)
		setDescriptionTitleFINState("")

		setShowDescriptionInputENState(true)
		setDescriptionENState("")
		setShowDescriptionInputFINState(true)
		setDescriptionFINState("")

		setShowClaimLinkInputENState(true)
		setClaimLinkENState("")
		setShowClaimLinkInputFINState(true)
		setClaimLinkFINState("")

		setSelectedLanguage("en")
	}

	const handleCreateCard = async () => {
		const formData = new FormData()
		formData.append("categoryEN", categoryTagENState)
		formData.append("categoryFIN", categoryTagFINState)
		formData.append("image", selectedImageState)
		formData.append("title", casinoNameState)
		formData.append("descriptionTitleEN", descriptionTitleENState)
		formData.append("descriptionTitleFIN", descriptionTitleFINState)
		formData.append("descriptionEN", descriptionENState)
		formData.append("descriptionFIN", descriptionFINState)
		formData.append("refLinkEN", claimLinkENState)
		formData.append("refLinkFIN", claimLinkFINState)

		await axios.post("/api/card", formData, {
			headers: {
				Authorization: getAuthToken()
			}
		})
			.then(() => {
				emptyAll()
				alert("Successfully created new card.")
				reloadCards()
			}).catch((e) => {
				console.error(e.response.data)
			})
	}

	return (
		<div className={styles.main}>
			<h1 className={styles.title}>Create new card</h1>
			<div className={styles.contentContainer}>
				<p className={styles.guideText}>
					{selectedLanguage === "en" ?
						"Enter category, description title, description and reflink, only if you want this card to be in the english home page."
						:
						"Enter category, description title, description and reflink, only if you want this card to be in the finnish home page."}
				</p>
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

						{selectedLanguage === "en" ?
							<div className={styles.claimLinkEditContainer}>
								{showClaimLinkInputENState === false ?
									<div className={styles.claimLinkContainer} onMouseOver={() => { setShowClaimLinkInputENState(true) }}>
										<a className={styles.claimLink}>Claim Bonus</a>
									</div>
									:
									<div className={styles.claimLinkInputContainer} onMouseLeave={() => { if (claimLinkENState) { setShowClaimLinkInputENState(false) } }}>
										<input className={styles.claimLinkInput} placeholder="Enter claim link" value={claimLinkENState} onChange={(e) => { setClaimLinkENState(e.target.value) }} />
									</div>
								}
							</div>
							:
							<div className={styles.claimLinkEditContainer}>
								{showClaimLinkInputFINState === false ?
									<div className={styles.claimLinkContainer} onMouseOver={() => { setShowClaimLinkInputFINState(true) }}>
										<a className={styles.claimLink}>Claim Bonus</a>
									</div>
									:
									<div className={styles.claimLinkInputContainer} onMouseLeave={() => { if (claimLinkFINState) { setShowClaimLinkInputFINState(false) } }}>
										<input className={styles.claimLinkInput} placeholder="Enter claim link" value={claimLinkFINState} onChange={(e) => { setClaimLinkFINState(e.target.value) }} />
									</div>
								}
							</div>
						}


					</div>
				</div>
				<div className={styles.languageSelectionContainer}>
					<Image className={selectedLanguage === "en" ? styles.languageSelectionButtonSelected : styles.languageSelectionButton} src={englishImg} alt="englishImg" onClick={() => { setSelectedLanguage("en") }} />
					<Image className={selectedLanguage === "fi" ? styles.languageSelectionButtonSelected : styles.languageSelectionButton} src={finnishImg} alt="finnishImg" onClick={() => { setSelectedLanguage("fi") }} />
				</div>
				<button className={styles.createCardButton} onClick={() => { handleCreateCard() }}>
					Create card
				</button>
			</div>
		</div>
	)
}

export default NewCard 