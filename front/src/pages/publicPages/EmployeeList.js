import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


import ManageList from "managelist";

//permettent d'utiliser les sélecteurs pour récupérer les données du state global et de dispatcher les actions
import { useSelector } from 'react-redux';

// //importation des actions
// import EmployeesSearch from '../../components/EmployeesSearch';

const EmployeeList = () => {


    //récupération du de la liste d'employés dans le store stocker lors du dispatch de l'action addEmployee
    let listEmployeesStore = useSelector( (state) => state.employees.listEmployees);

    console.log("***listEmployeesStore",listEmployeesStore);
    return (
        <>
            <ManageList listEmployeesStore={listEmployeesStore} />
        </>
        
    )

}

export default EmployeeList;

/*
const EmployeeList = () => {

    //récupération du de la liste d'employés dans le store stocker lors du dispatch de l'action addEmployee
    let listEmployeesStore = useSelector( (state) => state.employees.listEmployees);

    //gestion du state des employés
    let [employees, setEmployees] = useState([]);

    //gestion du state de l'index de la page
    let [indexPage, setIndexPage] = useState(1);
    let [indexPageFilter, setIndexPageFilter] = useState(1);
    

    //gestion du state du nombre d'éléments par page
    let [quantityElementsPerPage, setQuantityElementsPerPage] = useState(10);

    let [listPerPage, setListPerPage] = useState([]);

    //gestion du state de la liste finale d'employés à afficher
    let [listEmployeesFinale, setListEmployeesFinale] = useState([]);


    //gestion du state de la recherche et filtre
    let [isOpensearch, setisOpenSearch] = useState(false);
    let [isOpenFilter, setisOpenFilter] = useState(false);
    let [listPerPageFilter, setListPerPageFilter] = useState([]);
    let [resultsearch, setResultsearch] = useState([]);

    let listData ;

    
    useEffect(() => {

        if(listEmployeesStore && listEmployeesStore.length > 0){
    
            setEmployees(listEmployeesStore);

            //constitution des sous listes en fonction du nombre d'éléments par page
            const listElementsPerPage1 = listEmployeesStore.reduce((accumulateur, _, index, array) => {
        
                if (index % quantityElementsPerPage === 0) {
                    accumulateur.push(array.slice(index, index + quantityElementsPerPage));
                }
                return accumulateur;

            }, []);
            
            //sous liste d'employés
            setListPerPage(listElementsPerPage1);

            //liste d'employés à afficher dans une page
            setListEmployeesFinale(listElementsPerPage1[indexPage - 1]);
        

        }

        //constitution des sous listes en fonction du résultat de la recherche
        const listElementsPerPageFilter = resultsearch.reduce((accumulateur, _, index, array) => {
        
            if (index % quantityElementsPerPage === 0) {
                accumulateur.push(array.slice(index, index + quantityElementsPerPage));
            }
            return accumulateur;

        }, []);

        setListPerPageFilter(listElementsPerPageFilter);

        

        disabledButton();
       


    }, [indexPage,indexPageFilter,isOpensearch,listEmployeesStore,quantityElementsPerPage]);
   

    /////////////////////////////////////

function EmployeesSearch(resultsearch) {


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

}






    //////////////////////////////////

    //fonction permettant de changer le nombre d'éléments par page
    const quantityElementsChange = (value) => {

        setQuantityElementsPerPage(value);
    }

    // let listEmployeesFinale = listPerPage[0];
     let listElementsPerPage = listPerPage;

    //fonction permettant de désactiver les boutons suivant et précédent
    function disabledButton () {

        //récupération des l'éléments
        const elementPre = document.querySelector('.previous');
        const elementNext = document.querySelector('.next');

        if( isOpenFilter === false ){

            if( indexPage === 1  ){ //&& listEmployeesFinale.length !== 0
                
                elementPre.style.display ="none";
                elementNext.style.display ="block";
    
            }else if(indexPage === listElementsPerPage.length ){
               
            
    
                elementPre.style.display ="block";
                elementNext.style.display ="none";
    
            }else {
                
                elementPre.style.display ="block";
                elementNext.style.display ="block";
            }

        } else if( isOpenFilter === true ){

            if(  indexPageFilter === 1 && indexPageFilter === listPerPageFilter.length){
            
                elementPre.style.display ="none"; 
                elementNext.style.display ="none";
    
            }else if( indexPageFilter === 1 && indexPageFilter < listPerPageFilter.length){
            
                elementPre.style.display ="none";
                elementNext.style.display ="block";
    
            }else if( indexPageFilter > 1 && indexPageFilter === listPerPageFilter.length){
              
                elementPre.style.display ="block";
                elementNext.style.display ="none";
            }

        }
      

    }
    

    //fonction permettant de passer à la page précédente
    const handleIndexPrevious = () => {

        //réinitialisation des boutons de tri
        resetButtonSort();
        
        if(isOpenFilter === false){ //si le champ de recherche n'est pas activé

            if(indexPage < listElementsPerPage.length && indexPage > 1){

                setIndexPage(indexPage -= 1);
    
            }else if(indexPage === listElementsPerPage.length){
    
                setIndexPage(indexPage -= 1);
            }
    
            setListEmployeesFinale(listElementsPerPage[indexPage]);

        }else if(isOpenFilter === true){  //si le champ de recherche est activé

            if(indexPageFilter < resultsearch.length ){

                setIndexPageFilter(indexPageFilter -= 1);
                
                setResultsearch(resultsearch[indexPageFilter]);
    
            }
    
           
        }
       

    }

    

    //fonction permettant de passer à la page suivante
    const handleIndexNext = () => {

        //réinitialisation des boutons de tri
        resetButtonSort();

        if(isOpenFilter === false){ //si le champ de recherche n'est pas activé
        

            if(indexPage < listElementsPerPage.length && indexPage <  listElementsPerPage.length){

                setIndexPage(indexPage += 1);
            }
    
            setListEmployeesFinale(listElementsPerPage[indexPage -= 1])
        
        }else if(isOpenFilter === true) {  //si le champ de recherche est activé
                
            if(indexPageFilter < resultsearch.length ){

                setIndexPageFilter(indexPageFilter += 1);

                setResultsearch(resultsearch[indexPageFilter]);

            }
    
            
        }
        

    }

    let listOrder = ["firstName", "lastName", "dateOfBirth", "startDate", "street", "city", "state", "zipCode", "department"];

    //gestion du state des boutons de tri
    let [buttonSort, setButtonSort] = useState({
        firstName: {up: false, down: false},
        lastName: {up: false, down: false},
        dateOfBirth: {up: false, down: false},
        startDate: {up: false, down: false},
        street: {up: false, down: false},
        city: {up: false, down: false},
        state: {up: false, down: false},
        zipCode: {up: false, down: false},
        department: {up: false, down: false}
    });

    //réinitialisation des boutons de tri
    const resetButtonSort = () => {
            
        

        setButtonSort({
            firstName: {up: false, down: false},
            lastName: {up: false, down: false},
            dateOfBirth: {up: false, down: false},
            startDate: {up: false, down: false},
            street: {up: false, down: false},
            city: {up: false, down: false},
            state: {up: false, down: false},
            zipCode: {up: false, down: false},
            department: {up: false, down: false}
        });

    }

    //fonction permettant de trier les employés par ordre croissant
    const sortedEmployeesAscending = (value) => {

        let valueAscending 

       

        for(let i = 0; i < listOrder.length; i++){

            let valueCurrent = listOrder[i];

            if(value === valueCurrent){

                valueAscending = listEmployeesFinale.slice().sort((a, b) => {

                    if (a[value] < b[value]) {
                        return -1;
                    }
                    if (a[value] > b[value]) {
                        return 1;
                    }
                    return 0;
                } );
            }
        }

        setListEmployeesFinale(valueAscending);
      
    }

    //fonction permettant de trier les employés par ordre décroissant
    const sortedEmployeesDescending = (value) => {

        let valueDescending 


        for(let i = 0; i < listOrder.length; i++){

            let valueCurrent = listOrder[i];

            if(value === valueCurrent){

                valueDescending = listEmployeesFinale.slice().sort((a, b) => {

                    if (a[value] > b[value]) {
                        return -1;
                    }
                    if (a[value] < b[value]) {
                        return 1;
                    }
                    return 0;
                } );

               

            }
        }

        setListEmployeesFinale(valueDescending);
       
    }



     //fonction permettant de filtrer les employés dans le champ de recherche
    const filterEmployees = (e) => {

        let valueSearch = ""
        valueSearch = listEmployeesStore.filter( employee => 
                
            employee.firstName.toLowerCase() === e.trim().toLowerCase() || 
            employee.lastName.toLowerCase() === e.trim().toLowerCase() || 
            employee.department.toLowerCase() === e.trim().toLowerCase()
        );

        
        if(valueSearch !== "" && valueSearch.length > 0){

            setisOpenSearch(true);
            setResultsearch(valueSearch);
            setisOpenFilter(true);


        }else if(valueSearch.length === 0){

            setisOpenSearch(false);
            setResultsearch([]);
            setisOpenFilter(false);
        }
       
     
    }
    
    return (
        <div className='EmployeeList'>
            <div className='EmployeeList__title'>
                <title>HRnet - Current Employees</title>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
                
            </div>
            <form className='EmployeeList__filters'>

                <div className='containerSelect'>
                    <label htmlFor="numberResult" className='containerSelectTitle'>Show </label>
                    <select name="numberResult" id="numberResult"
                        onChange={(e) => quantityElementsChange(e.target.value)}
                    >
                        <option value="10" >10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                      
                    </select>
                    <span className='containerSelectTitle'>entries</span>
                </div>
                <div className='containerSearch'>

                    <label htmlFor="search">Search :</label>
                    <input type='text' name='search' placeholder='Search by First Name,Last Name, Department '
                        onChange={(e) => filterEmployees(e.target.value)}
                    />

                </div>
            
            </form>
            <div className='EmployeeList__table'>
                <div id="employee-div" className="container">
                    <h1>Current Employees</h1>
                    <table id="employee-table" className="display">
                        <thead>
                            <tr>
                                <th>
                                    <div className='tableTh'>
                                        First Name
                                        <span className='sort'>
                                            <i className="fa-solid fa-caret-up ufirstName"
                                                onClick={() => {
                                                    sortedEmployeesAscending("firstName");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        firstName: {
                                                            ...prevState.firstName,
                                                            up: !prevState.firstName.up,
                                                            down: false
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.firstName.up === false ? "rgb(191, 191, 191)" : "black" }}
                                            ></i>
                                            
                                            <i className="fa-solid fa-caret-down dfirstName"

                                                onClick={() => {
                                                    sortedEmployeesDescending("firstName");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        firstName: {
                                                            ...prevState.firstName,
                                                            up: false,
                                                            down: !prevState.firstName.down
                                                           
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.firstName.down === false ? "rgb(191, 191, 191)" : "black" }}
                                            >

                                            </i>
                                        </span>
                                    </div>
                                    
                                </th>
                                <th>
                                    <div className='tableTh'>
                                        Last Name
                                        <span className='sort'>
                                            <i className="fa-solid fa-caret-up ulastName"
                                                    onClick={() => {
                                                        sortedEmployeesAscending("lastName");
                                                        resetButtonSort();
                                                        setButtonSort(prevState => ({
                                                            ...prevState,
                                                            lastName: {
                                                                ...prevState.lastName,
                                                                up: !prevState.lastName.up,
                                                                down: false
                                                            }
                                                        }));
                                                    }}
                                                    style={{ color: buttonSort.lastName.up === false ? "rgb(191, 191, 191)" : "black" }}
                                                ></i>
                                                
                                                <i className="fa-solid fa-caret-down"

                                                    onClick={() => {
                                                        sortedEmployeesDescending("lastName");
                                                        resetButtonSort();
                                                        setButtonSort(prevState => ({
                                                            ...prevState,
                                                            lastName: {
                                                                ...prevState.lastName,
                                                                up: false,
                                                                down: !prevState.lastName.down
                                                            
                                                            }
                                                        }));
                                                    }}
                                                    style={{ color: buttonSort.lastName.down === false ? "rgb(191, 191, 191)" : "black" }}
                                                >

                                                </i>

                                        </span>
                                    </div>
                                   
                                </th>
                                <th>
                                    <div className='tableTh'>
                                        Date of Birth
                                        <span className='sort'>

                                            <i className="fa-solid fa-caret-up udateOfBirth"
                                                onClick={() => {
                                                    sortedEmployeesAscending("dateOfBirth");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        dateOfBirth: {
                                                            ...prevState.dateOfBirth,
                                                            up: !prevState.dateOfBirth.up,
                                                            down: false
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.dateOfBirth.up === false ? "rgb(191, 191, 191)" : "black" }}
                                            ></i>
                                                    
                                            <i className="fa-solid fa-caret-down"

                                                onClick={() => {
                                                    sortedEmployeesDescending("dateOfBirth");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        dateOfBirth: {
                                                            ...prevState.dateOfBirth,
                                                            up: false,
                                                            down: !prevState.dateOfBirth.down
                                                        
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.dateOfBirth.down === false ? "rgb(191, 191, 191)" : "black" }}
                                            >

                                            </i>


                                        </span>
                                    </div>
                                </th>
                                <th>
                                    <div className='tableTh'>
                                        Start Date
                                        <span className='sort'>

                                            <i className="fa-solid fa-caret-up ustartDate"
                                                onClick={() => {
                                                    sortedEmployeesAscending("startDate");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        startDate: {
                                                            ...prevState.startDate,
                                                            up: !prevState.startDate.up,
                                                            down: false
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.startDate.up === false ? "rgb(191, 191, 191)" : "black" }}
                                            ></i>
                                                        
                                            <i className="fa-solid fa-caret-down"

                                                onClick={() => {
                                                    sortedEmployeesDescending("startDate");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        startDate: {
                                                            ...prevState.dateOfBirth,
                                                            up: false,
                                                            down: !prevState.startDate.down
                                                        
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.startDate.down === false ? "rgb(191, 191, 191)" : "black" }}
                                            >

                                            </i>

                                           
                                        </span>
                                    </div>
                                </th>
                                <th>
                                    <div className='tableTh'>
                                        Street
                                        <span className='sort'>

                                            <i className="fa-solid fa-caret-up ustreet"
                                                onClick={() => {
                                                    sortedEmployeesAscending("street");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        street: {
                                                            ...prevState.street,
                                                            up: !prevState.street.up,
                                                            down: false
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.street.up === false ? "rgb(191, 191, 191)" : "black" }}
                                            ></i>
                                                        
                                            <i className="fa-solid fa-caret-down"

                                                onClick={() => {
                                                    sortedEmployeesDescending("street");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        street: {
                                                            ...prevState.street,
                                                            up: false,
                                                            down: !prevState.street.down
                                                        
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.street.down === false ? "rgb(191, 191, 191)" : "black" }}
                                            >

                                            </i>

                                        </span>
                                    </div>
                                </th>
                                <th>
                                    <div className='tableTh'>
                                        City
                                        <span className='sort'>

                                            <i className="fa-solid fa-caret-up ucity"
                                                onClick={() => {
                                                    sortedEmployeesAscending("city");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        city: {
                                                            ...prevState.city,
                                                            up: !prevState.city.up,
                                                            down: false
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.city.up === false ? "rgb(191, 191, 191)" : "black" }}
                                            ></i>
                                                    
                                            <i className="fa-solid fa-caret-down"

                                                onClick={() => {
                                                    sortedEmployeesDescending("street");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        city: {
                                                            ...prevState.city,
                                                            up: false,
                                                            down: !prevState.city.down
                                                        
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.city.down === false ? "rgb(191, 191, 191)" : "black" }}
                                            >

                                            </i>

                                        </span>
                                    </div>
                                </th>
                                <th>
                                    <div className='tableTh'>
                                        State
                                        <span className='sort'>

                                            <i className="fa-solid fa-caret-up ustate"
                                                onClick={() => {
                                                    sortedEmployeesAscending("state");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        state: {
                                                            ...prevState.state,
                                                            up: !prevState.state.up,
                                                            down: false
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.state.up === false ? "rgb(191, 191, 191)" : "black" }}
                                            ></i>
                                                    
                                            <i className="fa-solid fa-caret-down"

                                                onClick={() => {
                                                    sortedEmployeesDescending("state");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        state: {
                                                            ...prevState.state,
                                                            up: false,
                                                            down: !prevState.state.down
                                                        
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.state.down === false ? "rgb(191, 191, 191)" : "black" }}
                                            >

                                            </i>

                                        </span>
                                    </div>
                                </th>
                                <th>
                                    <div className='tableTh'>
                                        Zip Code
                                        <span className='sort'>

                                            <i className="fa-solid fa-caret-up uzipCode"
                                                onClick={() => {
                                                    sortedEmployeesAscending("zipCode");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        zipCode: {
                                                            ...prevState.zipCode,
                                                            up: !prevState.zipCode.up,
                                                            down: false
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.zipCode.up === false ? "rgb(191, 191, 191)" : "black" }}
                                            ></i>
                                                    
                                            <i className="fa-solid fa-caret-down"

                                                onClick={() => {
                                                    sortedEmployeesDescending("zipCode");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        zipCode: {
                                                            ...prevState.zipCode,
                                                            up: false,
                                                            down: !prevState.zipCode.down
                                                        
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.zipCode.down === false ? "rgb(191, 191, 191)" : "black" }}
                                            >

                                            </i>

                                            
                                        </span>
                                    </div>
                                </th>
                                <th>
                                    <div className='tableTh'>
                                        Department
                                        <span className='sort'>

                                            <i className="fa-solid fa-caret-up udepartment"
                                                onClick={() => {
                                                    sortedEmployeesAscending("department");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        department: {
                                                            ...prevState.department,
                                                            up: !prevState.department.up,
                                                            down: false
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.department.up === false ? "rgb(191, 191, 191)" : "black" }}
                                            ></i>
                                                    
                                            <i className="fa-solid fa-caret-down"

                                                onClick={() => {
                                                    sortedEmployeesDescending("department");
                                                    resetButtonSort();
                                                    setButtonSort(prevState => ({
                                                        ...prevState,
                                                        department: {
                                                            ...prevState.department,
                                                            up: false,
                                                            down: !prevState.department.down
                                                        
                                                        }
                                                    }));
                                                }}
                                                style={{ color: buttonSort.department.down === false ? "rgb(191, 191, 191)" : "black" }}
                                            >

                                            </i>

                                        </span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        {
                            isOpensearch ?


                        EmployeesSearch(resultsearch)
                           


                                :
                            <tbody>
                            { listEmployeesFinale && listEmployeesFinale.length > 0 && listEmployeesFinale.map((employee, index) => (
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
                            
                          
                        
                        }

                    </table>
                    <div className='arrowContainer'>
                        <div className='arrowContainer__changePage'>
                            <p className='arrowButton previous' >
                                <i className="fa-solid fa-chevron-left"
                                    onClick={ handleIndexPrevious }
                                ></i>
                            </p>
                            { 
                                isOpenFilter === false && 
                                (
                                    isOpensearch ?      
                                    <p className='indexPage'>{listEmployeesFinale.length === 0 ? 0 :  indexPage}/{listEmployeesFinale.length}</p>
                                    :
                                    <p className='indexPage'>{listEmployeesFinale.length === 0 ? 0 :  indexPage}/{listElementsPerPage.length}</p>
                                )
                            }

                            {       
                                isOpenFilter === true && 

                                   ( 
                                    isOpensearch ?      
                                        <p className='indexPage'>{indexPageFilter}/{listPerPageFilter.length}</p>
                                        :
                                        <p className='indexPage'>{indexPageFilter}/{listPerPageFilter.length}</p>
                                   )
                            }

                            <p className='arrowButton next'>
                                <i className="fa-solid fa-chevron-right"
                                    onClick={handleIndexNext }
                                ></i>
                            </p>
                        </div>
                       
                    </div>
                    <Link to="/">Home</Link>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;

*/


// {/*<EmployeesSearch resultsearch={resultsearch} />*/}