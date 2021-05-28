// import * as React from 'react';
// import {DataGrid} from '@material-ui/data-grid';
// import Popup from "./Popup";
// import {useState} from "react";
//
// export const DataTable = (props) => {
//     const [popUpShow, setPopUpShow] = useState(false);
//     const [rowData, setRowData] = useState([]);
//
//     function showPopUp(rowSelected){
//         setPopUpShow(true);
//         setRowData(rowSelected);
//     }
//
//     return (
//         <div style={{ height: '90%',  marginTop: '20px', backgroundColor: 'white'}}>
//             <DataGrid rows={props.rows} columns={props.columns} pageSize={10} onRowSelected={(e) => {showPopUp(e.data);}}/>
//             <Popup show={popUpShow} rowData={rowData} title = {props.title} onHide={() => setPopUpShow(false)}/>
//         </div>
//     );
// }