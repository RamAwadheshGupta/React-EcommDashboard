import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () =>
{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const addProduct = async () =>
    {
        console.warn(name);
        if (!name || !price || !category || !company)
        {
            setError(true);
            console.log('empty');
            return false;
        }
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        //console.log(userId);
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result)
        {
            navigate("/");
        }
        console.warn(result);
    }
    return (
        <div className="product">
            <h1>Add Product</h1>
            <input className="inputBox" type="text"
                value={name} onChange={(e) => { setName(e.target.value) }}
                placeholder="Enter Name"
            />
            {error && !name && <span className="invalid-input"> Enter vaild name</span>}
            <input className="inputBox" type="text"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
                placeholder="Enter Price"
            />
            {error && !price && < span className="invalid-input" > Enter vaild price</span>}
            <input className="inputBox" type="text"
                value={category} onChange={(e) => { setCategory(e.target.value) }}
                placeholder="Enter Category"
            />
            {error && !category && <span className="invalid-input">Enter vaild category </span>}
            <input className="inputBox" type="text"
                value={company} onChange={(e) => { setCompany(e.target.value) }}
                placeholder="Enter company"
            />
            {error && !company && <span className="invalid-input">Enter vaild company</span>}
            <button onClick={addProduct} className="appButton">Add Product</button>
        </div >
    );
}

export default AddProduct;

