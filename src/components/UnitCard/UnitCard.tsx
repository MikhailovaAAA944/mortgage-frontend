import "./UnitCard.sass"
import {Unit} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useCalculation} from "../../hooks/calculations/useCalculation";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const UnitCard = ({ unit, refetch }: {unit:Unit}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addUnitToCalculation, deleteUnitFromCalculation} = useCalculation()

    const handleAddUnit = async (e) => {
        e.preventDefault()
        await addUnitToCalculation(unit)
        refetch()
    }

    const handleDeleteUnitFromCalculation = async (e) => {
        e.preventDefault()
        await deleteUnitFromCalculation(unit)
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={unit.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {unit.name} </h3>

                </div>

                <div className="content-bottom">


                    <Link to={`/units/${unit.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>

                    {is_authenticated && !is_moderator && location.pathname.includes("units") &&
                        <CustomButton onClick={handleAddUnit} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("calculations") &&
                        <CustomButton onClick={handleDeleteUnitFromCalculation} bg={variables.red}>Удалить</CustomButton>
                    }
                    
                </div>

            </div>

        </div>
    )
}

export default UnitCard;