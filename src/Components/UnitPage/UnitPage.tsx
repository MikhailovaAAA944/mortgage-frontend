import "./UnitPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iUnitsMock, requestTime} from "../../Consts";
import {Unit} from "../../Types";
import mockImage from "/src/assets/mock.jpg"

const UnitPage = ({ selectedUnit, setSelectedUnit }: { selectedUnit:Unit | undefined, setSelectedUnit: Dispatch<Unit| undefined>}) => {

    const { id } = useParams<{id: string}>();

    if (id == undefined){
        return;
    }

    useEffect(() => {
        return () => {
            setSelectedUnit(undefined)
        }
    }, [])


    const [isMock, setIsMock] = useState<boolean>(false);

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/units/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const unit: Unit = await response.json()

            setSelectedUnit(unit)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedUnit(iUnitsMock.find((unit:Unit) => unit?.id == parseInt(id)))
        setIsMock(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : selectedUnit?.image} />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedUnit?.name}</h2>

                    <br />

                    <span>Описание: {selectedUnit?.description}</span>

                </div>

            </div>

        </div>
    )
}

export default UnitPage;