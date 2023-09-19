import React from 'react';
import './style.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import React, {useEffect, useState, useMemo, useCallback, useRef} from 'react';

 function App() {
   const gridRef = useRef();

   const [rowData, setRowData] = useState([
    {make: 'Ford', model: 'focus', price: 4000},
    {make: 'Toyota', model: 'Celice', price: 4500},
    {make: 'BMW', model: '4 Series', price: 5000},
   ]);


   const [columnDefs, setColumnDefs] = useState([
       {field: 'make'},
       {field: 'model'},
       {field: 'price'},
   ]);


   const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

   const cellClickedListener = useCallback((e) => {
     console.log('cellClicked', e);
   })

   useEffect(() => {
     fetch('https://www.ag-grid.com/example-assets/row-data.json')
     .then((result) => result.json())
     .then((rowData) => setRowData(rowData));

   }, []);


   const pushMeClicked = useCallback((e) => {
    gridRef.current.api.deselectAll();
  });








  return (
    <div className='ag-theme-alpine' style={{height: '90vh'}}>
      <AgGridReact
         ref={gridRef}
         onCellClicked={cellClickedListener}
         rowData={rowData}
         columnDefs={columnDefs}
         rowSelection='multiple'
         animationsRows={true}
         defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default App;