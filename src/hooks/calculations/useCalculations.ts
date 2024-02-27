import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/calculations/calculationsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useCalculations() {
	const status = useSelector(state => state.calculations.status)
	const date_start = useSelector(state => state.calculations.date_start)
	const date_end = useSelector(state => state.calculations.date_end)
	const user = useSelector(state => state.calculations.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchCalculations = async () => {

		const {data} = await api.get(`calculations/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(calculation => calculation.owner.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchCalculations,
		setDateStart,
		setDateEnd,
		setUser
	};
}