import "./UnitAddPage.sass"
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import mock from "/src/assets/default.jpg"
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const UnitAddPage = () => {

    const {access_token} = useToken()

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const [imgFile, setImgFile] = useState<File | undefined>()
    const [imgURL, setImgURL] = useState<string | undefined>(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImgFile(img)
            setImgURL(URL.createObjectURL(img))
        }
    }

    const addUnit = async () => {

        const response = await api.post(`units/create/`, {}, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200){
            const unit_id = response.data["id"]
            await updateUnit(unit_id)
        }

    }

    const updateUnit = async (unit_id) => {

        const form_data = new FormData()

        form_data.append('name', name)
        form_data.append('description', description)

        if (imgFile != undefined) {
            form_data.append('image', imgFile, imgFile.name)
        }

        const response = await api.put(`units/${unit_id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200){
            navigate("/units/")
        }
    }


    return (
        <div className="add-page-wrapper">
            <div className="left">

                <img src={imgURL} alt=""/>

                <UploadButton handleFileChange={handleFileChange}>
                    Выбрать фото
                </UploadButton>

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={name} setValue={setName} />

                    <CustomTextarea placeholder="Описание" value={description} setValue={setDescription} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={addUnit}>
                            Создать
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default UnitAddPage