import "./UnitEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useUnit} from "../../hooks/units/useUnit";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";
import {useUnits} from "../../hooks/units/useUnits";

const UnitEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const {deleteUnit} = useUnits()

    const { id } = useParams<{id: string}>()

    const {
        unit,
        fetchUnit,
        setName,
        setDescription,
        setImage
    } = useUnit()

    useEffect(() => {
        id && fetchUnit(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveUnit = async() => {
        let form_data = new FormData()

        form_data.append('name', unit.name)
        form_data.append('description', unit.description)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`units/${unit.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/units/")
        }
    }

    const handleDeleteUnit = async () => {

        const response = await deleteUnit(unit.id)

        if (response.status == 200) {
            setImg(undefined)
            navigate("/units/")
        }
    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (unit == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={unit.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange}>
                    Изменить фото
                </UploadButton>

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={unit.name} setValue={setName} />

                    <CustomTextarea placeholder="Адрес" value={unit.description} setValue={setDescription} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveUnit}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={handleDeleteUnit}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default UnitEditPage