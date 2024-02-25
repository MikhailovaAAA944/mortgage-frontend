import "./UnitPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useUnit} from "../../hooks/units/useUnit";

const UnitPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {unit, fetchUnit, setUnit} = useUnit()
    
    useEffect(() => {
        id && fetchUnit(id)
        return () => {
            setUnit(undefined)
        }
    }, [])

    if (unit == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={unit.image}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{unit?.name}</h2>

                    <br />

                    <span>Описание: {unit?.description}</span>

                </div>
                
            </div>

        </div>
    )
}

export default UnitPage;