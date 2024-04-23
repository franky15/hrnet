import React from 'react';
import { Route, Routes } from 'react-router-dom';

//import PublicLayout from './PublicLayout';
import PublicLayout from './PublicLayout';
import Error from '../../_utils/Error';

import { CreateEmployee, EmployeeList } from './index';


const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout/>} >
                <Route path='/' element={<EmployeeList/>} />
                <Route path='create' element={<CreateEmployee/>} />
                <Route path='*' element={<Error/>} />
            </Route>
        </Routes>
    );
};

export default PublicRouter;