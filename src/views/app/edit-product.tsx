import * as product from "../../db/repositories/product";
import React, { Fragment, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const EditProduct = ({match:{params:{id}}}) => {
    const selectedId = id;
    const headerTitle = "Edit Product";
    const history = useHistory();
    const [product_name,setProductName] = useState("");
    const [price,setPrice] = useState("");
    const [description, setDescription] = useState(""); 
    const [discount,setDiscount] = useState("");
    const [modified_date, setModifiedDate] = useState("");
    const [created_date, setCreatedDate] = useState("");


    useEffect(() => {
        fetchProduct();
        
    }, []);

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

    const fetchProduct = async () => {
        

        // fetch product from repository
        const _product = await product.get(selectedId);

        // set product to state
        setProductName(_product.product_name);
        setDescription(_product.description);
        setPrice(_product.price);
        setDiscount(_product.discount);
        setCreatedDate(_product.created_date);
    };

    const updateProduct = async () => {

        if(validate()){

            await product.update(selectedId, 
                { 
                    product_name: product_name, 
                    description: description, 
                    price: price, 
                    discount:discount, 
                    created_date: created_date, 
                    modified_date: new Date() 
                }
            );

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

                {product_name.length === 0 ? (
                    <div className="loading">
                        <span>Fetching Product Info ....</span>
                    </div>
                ) : null}


                {product_name.length !== 0 ? (

                    <Fragment>
                        
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            required
                            type="text" 
                            className="form-control"
                            value={product_name}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                    <label>Description</label>
                    <textarea  
                        required
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input 
                            required
                            type="number" 
                            value={price}
                            className="form-control"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Discount</label>
                        <input 
                            required
                            type="number" 
                            value={discount}
                            className="form-control"
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>

                    <button
                    className="form-submit"
                    onClick={ () => updateProduct() }
                    >
                        Update Product
                    </button>
                    
                    </Fragment>

                ) : null}
                    
                    
                    

                </div>

            </div>
        </div>
    )
};

export default EditProduct;