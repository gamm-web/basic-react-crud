import React, { Fragment, FormEvent, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./style.css";
import * as product from "../../db/repositories/product";
import { useHistory } from "react-router-dom";

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
      <Route path="/about/:name" component={About} />
      <Route path="/edit-product/:id" component={EditProduct} />
      <Route path="/add-product" component={AddProduct} />
      <Route path="/contact"  component={Contact} />
      <Route path="/app1"  component={App1} />
    </Switch>
</Router>
  );
} 

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

const EditProduct = ({match:{params:{id}}}) => {
    const headerTitle = "Edit Product";

    return (
        <div className="app">
            <div className="header">
                {headerTitle}
            </div>

            <div className="container">
            </div>
        </div>
    )
}

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
                {
                products.map((product, index) => (
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
                ))
                }
                
            </div>
        </div>
    );
}; 

const Home = () => (
  <Fragment>
    <h1>Home</h1>
     
  </Fragment>
  );

const About = ({match:{params:{name}}}) => (
  // props.match.params.name
  <Fragment>
    <h1>About {name}</h1>
     
  </Fragment>
);

const Contact = () => (
  <Fragment>
    <h1>Contact</h1>
     
  </Fragment>
  );

  export default App;