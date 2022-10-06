import React from 'react';
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const Page404 = () => {
    const h1 = {
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
    }
    const h2 = {
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
    }
    const linkStyle = {
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
        backdropFilter: "sepia(90%)",
        color: "#202020",
        after:" -webkit-font-smoothing: antialiased",
        transition: "font-size .2s ease"
    }
    return (
        <div>
        <h1 style={h1}>404 PAGE NOT FOUND</h1>
            <h2 style={h2}>Hydra is currently attacking this page</h2>
            <ErrorMessage/>
            <h2 style={h2}>
                Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.
                or go to <br/>
                <Link style={linkStyle} to={"/"}>Main page!</Link>
            </h2>
        </div>
    );
};

export default Page404;