import React from 'react';

const EmployeesSearch = ({resultsearch}) => {

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