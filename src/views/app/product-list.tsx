import * as product from "../../db/repositories/product";
import React, { Fragment, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ProductList = () => {
    const history = useHistory();
    const headerTitle = "Product(s)";
    const [products, setProducts] = useState<Array<product.Product>>([]);

    useEffect(() => {
        fetchProducts("");
        
    }, []);

    const fetchProducts = async (filter: string) => {
        // clean the products array first
        setProducts([]);

        // fetch products from repository
        const _products = await product.all(filter);

        // set products to state
        setProducts(_products);
    };

    const remove = async (id: string) => {
        // clean the products state to prevent user double clicking the delete / edit button
        setProducts([]);

        // remove product
        await product.remove(id);

        // fetch again the products
        fetchProducts("");
    };

    const goToEdit = (id: string) => {

        history.push("/edit-product/" + id);

    };

    const removeProduct = async (id: string) => {

        let conf = window.confirm("Remove This Product?");

        if(conf){

            setProducts([]);

            // remove product
            await product.remove(id);

            // fetch again the products
            fetchProducts("");

        }

    };

    return (     
        <div className="app">
            <div className="header">
                {headerTitle}
            </div>

            <div className="container"> 
               
                

                <div className="product-filter">

                    <div className="w-100">

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Keywords"
                                onChange={ (e) => fetchProducts(e.target.value) }
                            />
                        </div>

                    </div>

                    <div className="w-100">

                        <div className="form-group">
                            <select className="form-control" onChange={ (e) => fetchProducts(e.target.value) }>
                                <option value="all">All</option>
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </select>
                        </div>

                    </div>

                    
                </div>

                {/* show if products is empty */}
                {products.length === 0 ? (
                    <div className="loading">
                        <span>Fetching Products ....</span>
                    </div>
                ) : null }

                <div className="product-lists">

                {products.map((product, index) => (

<div className="product-item" key={product.id}>
    
    <div className="w-80 ">
       <b className="product-name">{product.product_name}</b>  
        <p className="product-details">
        {product.description}
        </p>

        <div className="product-price">
        ${product.price}
        </div>
    </div>

    <div className="w-20">

        <button onClick={ () => { goToEdit(product.id) } } >Edit</button>
        <button onClick={ () => { removeProduct(product.id) } } >Remove</button>

    </div>
  
  <div className="clear"></div>

</div>                            
))
}

                </div>
                           
                    
            </div>
        </div>
    );

}; 

export default ProductList;