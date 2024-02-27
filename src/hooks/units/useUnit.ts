import {useDispatch, useSelector} from 'react-redux';
import {
	updateUnit,
	updateName,
	updateDescription,
	updateImage
} from "../../store/units/unitSlice";
import {api} from "../../utils/api";

export function useUnit() {
	const unit = useSelector(state => state.unit.unit);

	const dispatch = useDispatch()

	const setUnit = (value) => {
		dispatch(updateUnit(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchUnit = async (id) => {

		const {data} = await api.get(`units/${id}`);

		setUnit(data)

	};

	return {
		unit,
		setUnit,
		fetchUnit,
		setName,
		setDescription,
		setImage
	};
}