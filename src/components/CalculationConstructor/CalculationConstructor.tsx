import "./CalculationConstructor.sass"
import {useCalculation} from "../../hooks/calculations/useCalculation";
import {Link} from "react-router-dom";

const CalculationConstructor = () => {

    const {calculation_id} = useCalculation()

    if (calculation_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новый расчёт</span>
            </div>
        )
    }

    return (
        <Link to={`/calculations/${calculation_id}`} className="constructor-container">
            <span className="title">Новый расчёт</span>
        </Link>
    )
}

export default CalculationConstructor