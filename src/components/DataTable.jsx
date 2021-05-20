import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Popup from "./Popup";
import {useState} from "react";

export const DataTable = (props) => {
    const [popUpShow, setPopUpShow] = useState(false);

    return (
        <div style={{ height: '90%',  marginTop: '20px', backgroundColor: '#F8FCFF'}}>
            <DataGrid rows={props.rows} columns={props.columns} pageSize={10} onRowClick={() => {setPopUpShow(true);}}/>
            <Popup show={popUpShow} onHide={() => setPopUpShow(false)}/>
        </div>
    );
}

