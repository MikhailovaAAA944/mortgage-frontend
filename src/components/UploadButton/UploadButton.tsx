import "./UploadButton.sass"
import React, {useRef} from "react";

const UploadButton = ({handleFileChange, children}) => {
    const inputRef = useRef(undefined)

    const handleButtonClick = () => {
        inputRef.current.click()
    }

    return (
        <label className="input-file">
            <input type="file" accept="image/*" name="file" onChange={handleFileChange} ref={inputRef}/>
            <button className="input-file-btn" onClick={handleButtonClick}>
                {children}
            </button>
        </label>
    )
}

export default UploadButton