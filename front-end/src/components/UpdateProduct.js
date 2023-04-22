import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () =>
{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() =>
    {
        getProductDetails();

        // eslint-disable-next-line
    }, []);

    const getProductDetails = async (id) =>
    {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        //console.warn(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () =>
    {

        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
        navigate("/");
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