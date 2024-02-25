import {useDispatch, useSelector} from 'react-redux';
import {
	updateUnit
} from "../../store/units/unitSlice";
import {api} from "../../utils/api";

export function useUnit() {
	const unit = useSelector(state => state.unit.unit);

	const dispatch = useDispatch()

	const setUnit = (value) => {
		dispatch(updateUnit(value))
	}

	const fetchUnit = async (id) => {
		const {data} = await api.get(`units/${id}/`);
		setUnit(data)
	};

	return {
		unit,
		setUnit,
		fetchUnit
	};
}