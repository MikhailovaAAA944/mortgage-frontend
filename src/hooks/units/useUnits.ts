import {useDispatch, useSelector} from 'react-redux';
import {
	updateUnits,
	updateQuery
} from "../../store/units/unitsSlice";
import {api} from "../../utils/api";
import {useCalculation} from "../calculations/useCalculation";
import {useToken} from "../users/useToken";

export function useUnits() {
	const units = useSelector(state => state.units.units);
	const query = useSelector(state => state.units.query);

	const {access_token} = useToken()

	const {setCalculation, setCalculationId} = useCalculation()

	const dispatch = useDispatch()

	const setUnits = (value) => {
		dispatch(updateUnits(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchUnits = async (navigate=null) => {

		const {data} = await api.get(`units/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_calculation_id = data["draft_calculation_id"]
		setCalculationId(draft_calculation_id)

		if (!draft_calculation_id) {
			setCalculation(undefined)
			navigate && navigate("/")
		}

		return data["units"]
	}

	const deleteUnit = async (unit_id) => {
		const response = await api.delete(`units/${unit_id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		return response
	}


	return {
		units,
		setUnits,
		query,
		setQuery,
		searchUnits,
		deleteUnit
	};
}