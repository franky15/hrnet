import React from 'react'; //{useState}
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//importation des  routers

import PublicRouter from './pages/publicPages/PublicRouter';



function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/*' element={<PublicRouter/>} />
     
      </Routes>
    
    
    </BrowserRouter> 
  );
}

export default App;
