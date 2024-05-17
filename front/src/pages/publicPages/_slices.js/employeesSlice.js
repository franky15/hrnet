import { createSlice } from "@reduxjs/toolkit"; 
import datas from "../../../datas"

const initialState = {

    datas: datas === null ?  localStorage.getItem('employeesList') : datas,
    listEmployees: localStorage.getItem('listEmployees') === null ? [] : JSON.parse(localStorage.getItem('listEmployees')),
    statusAddEmployee: "",
    error: null
}

//creation du slice
const employeesSlice = createSlice({

    name: 'employees',
    initialState,  //passage du state initial
    reducers: {

        addEmployee: (state, action) => {

            state.listEmployees.push(action.payload);
            state.statusAddEmployee = "success";
            state.error = null;

            console.log("****action.payload", action.payload);

            localStorage.setItem('employeesList', JSON.stringify(state.statusAddEmployee)); 
            
            localStorage.setItem('listEmployees', JSON.stringify(state.listEmployees)); 
            
        }
    }
})

//exportation des actions
export const { addEmployee } = employeesSlice.actions;

//exportation du reducer
const employeesReducer = employeesSlice.reducer;    
export default employeesReducer;