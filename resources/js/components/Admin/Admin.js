import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Categories from "./CategoriesManager/CategoriesManager";

export default function Admin() {
    return (
        <div className="admin">
            <Categories/>
        </div>
    );
}
