import * as product from "../../db/repositories/product";
import React, { Fragment, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
};

export default EditProduct;