import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	unit: undefined,
};

const unitSlice = createSlice({
	name: 'unit',
	initialState: initialState,
	reducers: {
		updateUnit(state, action) {
			state.unit = action.payload
		}
	}
})

export const {
	updateUnit
} = unitSlice.actions;

export default unitSlice.reducer;