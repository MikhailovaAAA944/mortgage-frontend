import {configureStore} from "@reduxjs/toolkit";

import unitReducer from "./units/unitSlice"
import draftCalculationReducer from "./calculations/calculationSlice"
import authReducer from "./users/authSlice"
import calculationsReducer from "./calculations/calculationsSlice"
import unitsReducer  from "./units/unitsSlice"

export default configureStore({
	reducer: {
		unit: unitReducer,
		units: unitsReducer,
		calculation: draftCalculationReducer,
		calculations: calculationsReducer,
		user: authReducer
	}
});