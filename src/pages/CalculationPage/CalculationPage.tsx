import {useEffect} from "react";
import {useCalculation} from "../../hooks/calculations/useCalculation";
import {useNavigate, useParams} from "react-router-dom"
import UnitCard from "../../components/UnitCard/UnitCard";
import "./CalculationPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import {formate_repayment_date} from "../../utils/utils";

const CalculationPage = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {calculation, debt, setToAirport, setFromAirport, setDebt, fetchCalculation, saveCalculation, sendCalculation, deleteCalculation, setCalculation, setCalculationId} = useCalculation()

    useEffect(() => {

        if (!id || !is_authenticated) {
            navigate("/")
        }

        setCalculationId(id)
        fetchCalculation(id)

        return () => {
            setCalculation(undefined)
            setDebt(undefined)
        };
    }, [])

    if (calculation == undefined)
    {
        return (
            <div className="calculation-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendCalculation = async() => {
        await saveCalculation()
        await sendCalculation()
        navigate("/calculations")
    }

    const onDeleteCalculation = async () => {
        await deleteCalculation()
        navigate("/units")
    }

    const cards = calculation.units.map(unit  => (
        <UnitCard unit={unit} key={unit.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveCalculation} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendCalculation} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteCalculation} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = calculation.status == 1

    const completed = [3, 4].includes(calculation.status)

    return (
        <div className="calculation-page-wrapper">

            <div className="calculation-units-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новый расчёт" :  "Расчёт №" + calculation.id}</h3>
                </div>

                <div className="calculation-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == calculation.status).name}</span>
                    {[2, 3, 4].includes(calculation.status) && <span>Дата вылета: {formate_repayment_date(calculation.state)}</span> }
                    {[2, 3, 4].includes(calculation.status) && <span>Задолженность: {calculation.debt} рублей</span>}
                    <span>Дата создания: {moment(calculation.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(calculation.status) && <span>Дата формирования: {moment(calculation.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(calculation.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                </div>

                <div className="inputs-container">

                    <CustomInput placeholder="Задолженность" value={debt} setValue={setDebt} disabled={!is_draft}  />

                </div>

                <div className="title">
                    <h3>Виды рассчётов</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default CalculationPage