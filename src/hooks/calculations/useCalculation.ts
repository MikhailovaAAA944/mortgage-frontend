import {useDispatch, useSelector} from 'react-redux';
import {
	updateCalculation,
	updateCalculationId,
	updateDebt
} from "../../store/calculations/calculationSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useCalculation() {

	const {access_token} = useToken()

	const calculation = useSelector(state => state.calculation.calculation)
	const calculation_id = useSelector(state => state.calculation.calculation_id)
	const debt = useSelector(state => state.calculation.debt)

	const navigate = useNavigate()

	const is_draft = calculation?.status == 1

	const dispatch = useDispatch()

	const setCalculation = (value) => {
		dispatch(updateCalculation(value))
	}

	const setDebt = (value) => {
		dispatch(updateDebt(value))
	}

	const setCalculationId = (value) => {
		dispatch(updateCalculationId(value))
	}

	const sendCalculation = async () => {

		const response = await api.put(`calculations/${calculation.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setCalculation(undefined)
			setDebt(undefined)
		}
	}

	const deleteCalculation = async () => {

		const response = await api.delete(`calculations/${calculation.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setCalculation(undefined)
			setDebt(undefined)
		}

	}

	const saveCalculation = async () => {

		const form_data = new FormData()

		form_data.append('debt', debt)

		await api.put(`calculations/${calculation.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchCalculation = async (calculation_id) => {

		const {data} = await api.get(`calculations/${calculation_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setCalculation(data)
		setDebt(data["debt"])
	}

	const addUnitToCalculation = async (unit) => {
		await api.post(`units/${unit.id}/add_to_calculation/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteUnitFromCalculation = async (unit) => {
		const response = await api.delete(`calculations/${calculation.id}/delete_unit/${unit.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200) {
			await fetchCalculation(calculation_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		calculation,
		calculation_id,
		is_draft,
		debt,
		setCalculation,
		setDebt,
		saveCalculation,
		sendCalculation,
		deleteCalculation,
		fetchCalculation,
		addUnitToCalculation,
		deleteUnitFromCalculation,
		setCalculationId
	};
}