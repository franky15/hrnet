//gestion de la logique des employes


//importation de createAction pour la gestion la création des actions avec redux toolkit(remplace l'action creator)
import { createAction } from '@reduxjs/toolkit';

//importation de createReducer pour la gestion des reducers avec redux toolkit(remplace le reducer)
import { createReducer } from '@reduxjs/toolkit';


//importation de la data
import datas from '../../../datas';


const initialState = {

    employeesList: [],
    // employeesList: datas,
    
}

// Création des actions à l'aide de createAction de Redux Toolkit
export const addEmployee = createAction('employee/addEmployee');
//export const getEmployee = createAction('employee/getEmployee');

// Création du reducer à l'aide de createReducer de Redux Toolkit
const employeeManageReducer = createReducer(initialState, (builder) => { // createReducer prend deux paramètres, le premier est l'état initial et le deuxième est une fonction qui prend un paramètre un objet qui est le builder qui va permettre d'éxécuter la logique en fontion de l'action dispatchée

    builder
        .addCase(addEmployee, (state, action) => { // éxécution de ce cas lorsque loginSuccess sera dispatché, le deuxième paramètre est une fonction qui sera exécutée qui a également un premier paramètre qui est le state précédent et un deuxième paramètre qui est l'action actuelle dans laquelle on a le payload approprié
            
            //console.log("***bienvenue addEmployee")
            //console.log("***action.payload", action.payload)

            state.employeesList.push(action.payload); // Mis à jour du token d'authentification avec celui reçu en payload ou ajout du payload dans l'action
       
        })
        
       

})

//exportation du reducer AccountReducer
export default employeeManageReducer;


