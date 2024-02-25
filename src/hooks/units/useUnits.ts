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

	const {setCalculationId} = useCalculation()

	const dispatch = useDispatch()

	const setUnits = (value) => {
		dispatch(updateUnits(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchUnits = async () => {

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

		return data["units"]
	}

	const deleteUnit = async (unit) => {
		await api.delete(`units/${unit.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
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