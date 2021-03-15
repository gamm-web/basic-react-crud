import React, { Fragment, FormEvent, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./style.css";
import AddProduct from "./new-product";
import EditProduct from "./edit-product";
import ProductList from "./product-list";

const App = () => {
  const name = 'John Doe'
  return (
   <Router>

    <main>
        <Link to="/add-product">
            <button>&#43;</button>
        </Link>
       
        <Link to="/">
            <button>&#128195;</button>
        </Link>
        
    </main>
    <Switch>
      <Route path="/" exact component={ProductList} />
      <Route path="/edit-product/:id" component={EditProduct} />
      <Route path="/add-product" component={AddProduct} />
    </Switch>
</Router>
  );
} 

export default App;