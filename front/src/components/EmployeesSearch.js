import React, {useState, useEffect} from 'react';

//permettent d'utiliser les sélecteurs pour récupérer les données du state global et de dispatcher les actions
import { useSelector } from 'react-redux';

const EmployeesSearch = ({resultsearch}) => {

     //récupération du de la liste d'employés dans le store stocker lors du dispatch de l'action addEmployee
     /*let listEmployeesStore = useSelector( (state) => state.employees.listEmployees);

     console.log("****listEmployeesStore", listEmployeesStore);*/

     console.log("****resultsearch", resultsearch);

    return (
        <tbody>
            { resultsearch && resultsearch.length > 0 && resultsearch.map((employee, index) => (
                <tr key={index}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.dateOfBirth}</td>
                    <td>{employee.startDate}</td>
                    <td>{employee.street}</td>
                    <td>{employee.city}</td>
                    <td>{employee.state}</td>
                    <td>{employee.zipCode}</td>
                    <td>{employee.department}</td>

                </tr>
            ))}
        </tbody>
    );
};

export default EmployeesSearch;