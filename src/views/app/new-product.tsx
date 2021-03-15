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

    const validate = () => {

        if(
            product_name.length > 2 &&
            description.length > 2 &&
            price > 0 &&
            discount >= 0
        ){

            return true;

        }

        return false;

    };

    const saveProduct = async () => {

        if(validate()){

            await product.create({ 
                product_name: product_name, 
                description: description, 
                price: price, 
                discount:discount, 
                created_date: new Date(), 
                modified_date: new Date() 
            });
    
            history.push("/");
            
        }
        else{

            alert('Check Fields!');

        }
        

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
                            required
                            type="text" 
                            className="form-control"
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea  
                            required
                            className="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input 
                            required
                            type="number" 
                            className="form-control"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Discount</label>
                        <input 
                            required
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