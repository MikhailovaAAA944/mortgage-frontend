import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	units: [],
	query: ""
};

const unitsSlice = createSlice({
	name: 'units',
	initialState: initialState,
	reducers: {
		updateUnits(state, action) {
			state.units = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateUnits,
	updateQuery
} = unitsSlice.actions;

export default unitsSlice.reducer;