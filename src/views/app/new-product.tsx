import * as product from "../../db/repositories/product";
import React, { Fragment, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AddProduct = () => {
    const headerTitle = "New Product";
    const history = useHistory();
    const [product_name,setProductName] = useState("");
    const [price,setPrice] = useState("");
    const [description, setDescription] = useState(""); 
    const [discount,setDiscount] = useState("");

    const saveProduct = async () => {

        await product.create({ 
            product_name: product_name, 
            description: description, 
            price: price, 
            discount:discount, 
            created_date: new Date(), 
            modified_date: new Date() 
        });

        history.push("/");

    };

    return (
        <div className="app">
            <div className="header">
                {headerTitle}
            </div>

            <div className="container">

                <div className="main-wrap">

                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            className="form-control"
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea  
                            className="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input 
                            type="number" 
                            className="form-control"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Discount</label>
                        <input 
                            type="number" 
                            className="form-control"
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>

                    <button
                    className="form-submit"
                    onClick={ () => saveProduct() }
                    >
                        Save Product
                    </button>

                </div>
                

            </div>
        </div>
    )

};

export default AddProduct;