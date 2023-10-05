import logo from './logo.svg';
import React from "react";
import './App.css';
import Titulo from './comp/Titulo';
import Productos from './comp/Productos';
import { CarritoProvider } from './CarritoContext'; 

function App() {
  return (
    <div className="App">
      {/* */}
      <CarritoProvider>
        <Titulo/>
        <Productos/>
      </CarritoProvider>
    </div>
  );
}

export default App;
