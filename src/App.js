import React from 'react';
import './App.css';
import Palette from "./Palette"
import seedColor from "./seedColors"
import {Route,Switch,Link,NavLink} from "react-router-dom"
import { generatePalette } from "./ColorHelper";


function App() {
  		console.log(generatePalette(seedColor[4]));

  return (


<div>
    
<Palette {...seedColor[4]}></Palette>

      
      </div>
  
  );
}

export default App;
