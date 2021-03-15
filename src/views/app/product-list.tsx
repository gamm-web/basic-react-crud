import * as product from "../../db/repositories/product";
import React, { Fragment, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ProductList = () => {
    const history = useHistory();
    const headerTitle = "Product(s)";
    const [products, setProducts] = useState<Array<product.Product>>([]);

    useEffect(() => {
        fetchProducts();
        
    }, []);

    const fetchProducts = async () => {
        // clean the products array first
        setProducts([]);

        // fetch products from repository
        const _products = await product.all();

        // set products to state
        setProducts(_products);
    };

    const remove = async (id: string) => {
        // clean the products state to prevent user double clicking the delete / edit button
        setProducts([]);

        // remove product
        await product.remove(id);

        // fetch again the products
        fetchProducts();
    };

    const goToEdit = (id: string) => {

        history.push("/edit-product/" + id);

    };

    return (     
        <div className="app">
            <div className="header">
                {headerTitle}
            </div>

            <div className="container"> 
               
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
    </div>

    <div className="w-20">

        <button onClick={ () => { goToEdit(product.id) } } >🖉 Edit</button>

       <div className="product-price">
       ${product.price}
       </div>
         
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