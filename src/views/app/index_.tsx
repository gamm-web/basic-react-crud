import React, { FormEvent, useEffect, useState } from "react";
import "./style.css";
import * as product from "../../db/repositories/product";

const App1 = () => {
    // some needed states
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [products, setProducts] = useState<Array<product.Product>>([]);
    const [product_name, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [created_date, setCreatedDate] = useState("");
    const [modified_date, setModifiedDate] = useState("");
    const [selectedId, setSelectedId] = useState("");

    // fetch all products when this view mounted
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

    const onSubmit = async (e: FormEvent) => {
        // prevent form reload the page
        e.preventDefault();

        // disable the form input and button
        setIsSubmitting(true);

        // repository function to call is depend on isEditMode state
        if (!isEditMode) await product.create({ product_name: product_name, description: description, price: price, discount:discount, created_date: new Date(created_date), modified_date: new Date(modified_date) });
        else await product.update(selectedId, { product_name: product_name, description: description, price: price, discount:discount, created_date: new Date(created_date), modified_date: new Date(modified_date) });

        // clean the form
        setProductName("");
        setDescription("");
        setPrice("");
        setDiscount("");
        setCreatedDate("");
        setModifiedDate("");
       
        setIsSubmitting(false);
        setIsEditMode(false);
        fetchProducts();
    };

    const remove = async (id: string) => {
        // clean the products state to prevent user double clicking the delete / edit button
        setProducts([]);

        // remove product
        await product.remove(id);

        // fetch again the products
        fetchProducts();
    };

    const toEditMode = (id: string, product_name: string, description: string, price: number, discount: number, created_date: any, modified_date: any) => {
        // set editmode state
        setIsEditMode(true);

        // need to tweak the date first before put it in input datetime local
        const _created_date =
            new Date(created_date.toDate()).getFullYear() +
            "-" +
            (new Date(created_date.toDate()).getMonth() + 1) +
            "-" +
            (new Date(created_date.toDate()).getDate().toString().length === 1 ? "0" + new Date(created_date.toDate()).getDate() : new Date(created_date.toDate()).getDate());

        const time =
            new Date(created_date.toDate()).toLocaleTimeString().replaceAll("AM", "").replaceAll("PM", "").replace(/\s/g, "").length === 7
                ? "0" + new Date(created_date.toDate()).toLocaleTimeString().replaceAll("AM", "").replaceAll("PM", "").replace(/\s/g, "")
                : new Date(created_date.toDate()).toLocaleTimeString().replaceAll("AM", "").replaceAll("PM", "").replace(/\s/g, "");

        const dateString = (_created_date + "T" + time).toString();

        // set the form value
        setProductName(product_name);
        setDescription(description);
        setPrice(price);
        setDiscount(discount);
        setCreatedDate(dateString);
        setModifiedDate(dateString);

        // also the the selectedid state
        setSelectedId(id);
    };

    const test = () => {

        return <h1>wew</h1>;

    };

    
    return (
        <div className="app">
            <div className="container">
               
                {/* form for create or update the value */}
                
                <form onSubmit={onSubmit}>
                    <label>Product Name</label>                    
                    <input
                        type="text"
                        placeholder="Product Name"
                        required
                        disabled={isSubmitting}
                        value={product_name}
                        onChange={(e) => setProductName(e.target.value)}
                    />

                    <label>Product Description</label>

                    <textarea
                        required
                        disabled={isSubmitting}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label>Price</label>
                    <input
                        type="number"
                        placeholder=""
                        required
                        disabled={isSubmitting}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <label>Discount</label>
                    <input
                        type="number"
                        placeholder=""
                        required
                        disabled={isSubmitting}
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />

                    <label style={{ marginTop: "12px" }}>Created Date</label>

                    <input
                        type="datetime-local"
                        value={created_date}
                        onChange={(e) => setCreatedDate(e.target.value)}
                        placeholder=""
                        required
                        disabled={isSubmitting}
                    />

                    <input
                        type="datetime-local"
                        value={modified_date}
                        onChange={(e) => setModifiedDate(e.target.value)}
                        placeholder=""
                        required
                        disabled={isSubmitting}
                    />

                    {/* change the button value depends on isEditMode state  */}
                    <button type="submit" style={{ marginTop: "12px", backgroundColor: isEditMode ? "#eb9834" : "#44c922" }} disabled={isSubmitting}>
                        {isEditMode ? "Edit" : "Add"}
                    </button>
                </form>

                <h2>Products:</h2>

                {/* show if products is empty */}
                {products.length === 0 ? (
                    <div className="loading">
                        <span>Fetching Products ....</span>
                    </div>
                ) : null}

                {/* products item  */}
                {products.map((product, index) => (
                    <div className="list-item" key={product.id} style={{ marginTop: index > 0 ? "12px" : "" }}>
                        <span className="product_name">{product.product_name}</span>
                        <span className="created_date">On: {product.created_date.toDate().toDateString()}</span>

                        <span className="edit" onClick={() => toEditMode(product.id!!, product.product_name, product.description, product.price, product.discount, product.created_date, product.modified_date) }>
                            Edit
                        </span>

                        <span className="delete" onClick={() => remove(product.id!!)}>
                            Delete
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}; 

export default App1;