import React, { useState } from "react";

const UpdateProduct = () =>
{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');

    const updateProduct = async () =>
    {
        console.warn(name, price, category, company);
    }
    return (
        <div className="product">
            <h1>Add Product</h1>
            <input className="inputBox" type="text"
                value={name} onChange={(e) => { setName(e.target.value) }}
                placeholder="Enter Name"
            />
            <input className="inputBox" type="text"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
                placeholder="Enter Price"
            />
            <input className="inputBox" type="text"
                value={category} onChange={(e) => { setCategory(e.target.value) }}
                placeholder="Enter Category"
            />
            <input className="inputBox" type="text"
                value={company} onChange={(e) => { setCompany(e.target.value) }}
                placeholder="Enter company"
            />
            <button onClick={updateProduct} className="appButton">Update Product</button>
        </div >
    );
}

export default UpdateProduct;