import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () =>
{
    const [products, setProducts] = useState([]);
    useEffect(() =>
    {
        getProducts();
    }, []);
    const getProducts = async () =>
    {
        let result = await fetch('http://localhost:5000/products'); // get method not necessary to all filed api
        result = await result.json()
        setProducts(result);
    }
    //console.warn(products);
    const deleteProduct = async (id) =>
    {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete'
        });
        result = await result.json();
        if (result)
        {
            getProducts();
        }
    }

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Brand</li>
                <li>Action</li>
            </ul>
            {
                products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            &nbsp;
                            <button><Link style={{ textDecoration: "none" }} to={"/update/" + item._id}>Update</Link ></button>
                        </li>
                    </ul>
                )
            }
        </div >
    );
}

export default ProductList;