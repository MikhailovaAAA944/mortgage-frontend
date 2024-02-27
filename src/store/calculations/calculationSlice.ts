import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	calculation: undefined,
	calculation_id: undefined,
	fromAirport: undefined,
	toAirport: undefined,
	debt: undefined
};

const calculationSlice = createSlice({
	name: 'calculation',
	initialState: initialState,
	reducers: {
		updateCalculation(state, action) {
			state.calculation = action.payload
		},
		updateDebt(state, action) {
			state.debt = action.payload
		},
		updateCalculationId(state, action) {
			state.calculation_id = action.payload
		}
	}
})

export const {
	updateCalculation,
	updateDebt,
	updateCalculationId
} = calculationSlice.actions;

export default calculationSlice.reducer;