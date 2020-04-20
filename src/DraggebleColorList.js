import React from 'react'
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";
 const  DraggebleColorList=SortableContainer(({colors, deleteColorBox})=> {

  

   return (
     <div
       style={{
         height: "100%",
         width: "100%",
         display: "flex",
         flexWrap: "wrap",
         alignContent: "flex-start",
       }}
     >
       {colors.map((color, i,colors) => (
         <DraggableColorBox
          length={colors.length}
           index={i}
           color={color.color}
           name={color.name}
           key={color.name}
           delete={deleteColorBox}
         />
       ))}
     </div>
   );
 })


export default DraggebleColorList;