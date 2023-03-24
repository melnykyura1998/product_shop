import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom'
import {MainLayouts} from "./layouts";
import {ProductsPages} from "./pages";
import {SingleProductPage} from "./pages/singleProductPage";

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayouts/>}>
          <Route index element={<Navigate to={'products'}/>}/>
          <Route path={'products'} element={<ProductsPages/>}/>
          <Route path={'products/:idProduct'} element={<SingleProductPage/>}/>
      </Route>

    </Routes>
  );
}

export default App;
