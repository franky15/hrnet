import React from 'react';
import { Route, Routes } from 'react-router-dom';



/////////////////
/*
import EmployeeList from 'managelistlibrairie';
import EmployeesSearch from 'managelistlibrairie';

import 'managelistlibrairie/dist/ManageList.css';
*/


// Utilisez le composant ManageList dans votre projet

//////////////////

//import PublicLayout from './PublicLayout';
import PublicLayout from './PublicLayout';
import Error from '../../_utils/Error';

import { CreateEmployee, EmployeeList } from './index';


const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout/>} >
                <Route path='/employee-list' element={<EmployeeList/>} />
                <Route path='/' element={<CreateEmployee/>} />
                <Route path='*' element={<Error/>} />
            </Route>
        </Routes>
    );
};

export default PublicRouter;