import "./UnitCard.sass"
import {Unit} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.jpg"

const UnitCard = ({ unit, isMock }: {unit:Unit, isMock:boolean }) => {

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : unit.image} />
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {unit.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/units/${unit.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default UnitCard;