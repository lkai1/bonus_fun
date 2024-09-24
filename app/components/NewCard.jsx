import styles from "../styles/newCard.module.css"
import { useState } from "react";
import finnishImg from "../images/finnish_flag.png"
import englishImg from "../images/english_flag.png"
import Image from "next/image";
import axios from "axios"

const NewCard = () => {

	const [showCategoryTagInputState, setShowCategoryTagInputState] = useState(true)
	const [categoryTagState, setCategoryTagState] = useState("")
	const [showCategoryTagInputFINState, setShowCategoryTagInputFINState] = useState(true)
	const [categoryTagFINState, setCategoryTagFINState] = useState("")

	const [selectedImageState, setSelectedImageState] = useState(undefined);
	const [imagePreviewState, setImagePreviewState] = useState(undefined);
	const [showImageInputState, setShowImageInput] = useState(true)

	const [showCasinoNameInputState, setShowCasinoNameInputState] = useState(true)
	const [casinoNameState, setCasinoNameState] = useState("")

	const [showDescriptionTitleInputState, setShowDescriptionTitleInputState] = useState(true)
	const [descriptionTitleState, setDescriptionTitleState] = useState("")
	const [showDescriptionTitleInputFINState, setShowDescriptionTitleInputFINState] = useState(true)
	const [descriptionTitleFINState, setDescriptionTitleFINState] = useState("")

	const [showDescriptionInputState, setShowDescriptionInputState] = useState(true)
	const [descriptionState, setDescriptionState] = useState("")
	const [showDescriptionInputFINState, setShowDescriptionInputFINState] = useState(true)
	const [descriptionFINState, setDescriptionFINState] = useState("")

	const [showClaimLinkInputState, setShowClaimLinkInputState] = useState(true)
	const [claimLinkState, setClaimLinkState] = useState("")

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
		setShowCategoryTagInputState(true)
		setCategoryTagState("")
		setShowCategoryTagInputFINState(true)
		setCategoryTagFINState("")

		setSelectedImageState(undefined)
		setImagePreviewState(undefined)
		setShowImageInput(true)

		setShowCasinoNameInputState(true)
		setCasinoNameState("")

		setShowDescriptionTitleInputState(true)
		setDescriptionTitleState("")
		setShowDescriptionTitleInputFINState(true)
		setDescriptionTitleFINState("")

		setShowDescriptionInputState(true)
		setDescriptionState("")
		setShowDescriptionInputFINState(true)
		setDescriptionFINState("")

		setShowClaimLinkInputState(true)
		setClaimLinkState("")

		setSelectedLanguage("en")
	}

	const handleCreateCard = async () => {

		const formData = new FormData()
		formData.append("category", categoryTagState)
		formData.append("categoryFin", categoryTagFINState)
		formData.append("image", selectedImageState)
		formData.append("title", casinoNameState)
		formData.append("descriptionTitle", descriptionTitleState)
		formData.append("descriptionTitleFin", descriptionTitleFINState)
		formData.append("description", descriptionState)
		formData.append("descriptionFin", descriptionFINState)
		formData.append("refLink", claimLinkState)

		await axios.post("/api/card", formData)
			.then(() => {
				emptyAll()
				alert("Successfully created new card.")
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
						"Enter category, description title, and description, only if you want this card to be in the english home page."
						:
						"Enter category, description title, and description, only if you want this card to be in the finnish home page."}
				</p>
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