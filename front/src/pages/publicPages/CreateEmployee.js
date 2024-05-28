import React,{useState} from 'react';

import { Link } from 'react-router-dom';

//importation des actions
//import { addEmployee } from '../../_services/redux/reducers/Employees.Reducer';
import { addEmployee } from './_slices.js/employeesSlice';

//permettent d'utiliser les sélecteurs pour récupérer les données du state global et de dispatcher les actions
import {  useSelector,useDispatch } from 'react-redux';

//importation des composants
import Modal from '../../components/publicComponents/Modal';
//import CommonlyUsedComponents from '../../components/publicComponents/CommonlyUsedComponents';
import CommonlyUsedComponents from '../../components/DateTimePicker';

//import datas from '../../datas';

const CreateEmployee = () => {

    const datas = useSelector(state => state.employees.datas);

     //permet d'éxécuter les actions
     const dispatch = useDispatch();

     //gestion du state de la modal
     const [isOpenmodal, setIsOpenModal] = useState(false);


    //gestion du state de l'employé
    const [employee, setEmployee] = useState({

                                firstName: '',
                                lastName: '',
                                dateOfBirth: '',
                                startDate: '',
                                street: '',
                                city: '',
                                state: '',
                                zipCode: '',
                                department: ''
                            
                            });

   //fonction de récupération des données du DatePicker vers le parent
    const getDate = (dateOfBirth, startDate) => {
            
        setEmployee({
            ...employee,
            dateOfBirth: dateOfBirth,
            startDate: startDate
        });

    }

    console.log(employee);

   //fonction permet de mettre à jour le state de l'employé
   const handleChange = (e) => {

        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });

      

    }
   

    //fonction permet de sauvegarder un employé
    const saveEmployee = () => {

        setIsOpenModal(true);

        //éxécution de l'action addEmployee en lui passant en paramètre l'employé
        dispatch( addEmployee(employee) );
        
    
    }
    const closeModel = () => {

        setIsOpenModal(false);
    
    }


    return (
        <>
        <div className="container">

            <Link to="employee-list.html">View Current Employees</Link>
            <h2>Create Employee</h2>
            <form action="#" id="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input type="text" name='firstName' value={employee.firstName} id="first-name" onChange={handleChange} />

                <label htmlFor="last-name">Last Name</label>
                <input type="text" name="lastName" id="last-name" value={employee.lastName}  onChange={handleChange}   />

                {  /*
                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input id="dateOfBirth" type="date" name="dateOfBirth" value={employee.dateOfBirth} onChange={handleChange}  />

                    <label htmlFor="startDate">Start Date</label>
                    <input id="start-date" type="date" name="startDate" value={employee.startDate} onChange={handleChange} />
                */
                }


                {<CommonlyUsedComponents  getDate={getDate} /> }

               
                <fieldset className="address">
                    <legend>Address</legend>

                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" name="street" value={employee.street} onChange={handleChange} />

                    <label htmlFor="city">City</label>
                    <input id="city" type="text"  name="city" value={employee.city}  onChange={handleChange} />

                    <label htmlFor="state">State</label>
                    <select name="state" id="state" value={employee.state} onChange={handleChange}>
                        {datas.map((employee, index) => (
                            <option key={index}>{employee.name}</option>
                        ))}
                    </select>

                    <label htmlFor="zipCode">Zip Code</label>
                    <input id="zip-code" type="number" name="zipCode" value={employee.zipCode} onChange={handleChange}  />
                </fieldset>

                <label htmlFor="department">Department</label>
                <select name="department" id="department" value={employee.department} onChange={handleChange}>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Legal</option>
                </select>
            </form>

            <button onClick={saveEmployee}>Save</button>
        </div>
        { isOpenmodal && <Modal closeModel={closeModel} />}
        </>
    );
};

export default CreateEmployee;
