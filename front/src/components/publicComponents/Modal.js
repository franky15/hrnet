import React from 'react';

const Modal = ({closeModel}) => {
    
    return (
        <div className='modalContainer'>
             <div id="confirmation" className="modal modalContainer__modal">

               <p className='titleConfirm'>Employee Created!</p> 
               <p className='btnConfirm'><button onClick={closeModel} className="modalContainer__button">Close</button></p>
                
                
            </div>
            
        </div>
       
    );
};

export default Modal;