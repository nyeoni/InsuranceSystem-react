import React from "react";
import {Link} from "react-router-dom";

export const MyLink = ({children, to}) => {
    return(
        <Link to={to} style={{textDecoration: 'none'}}>
            <i></i>
            {to ? children : <span>{children}</span>}
        </Link>
    )
}
