const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Products');

const Jwt = require('jsonwebtoken');
const jwtKey = 'UA';

const app = express();

app.use(express.json());
app.use(cors());
app.post('/register', async (req, resp) =>
{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    //resp.send(result);
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) =>
    {
        if (err)
        {
            resp.send({ result: "Something went wrong, please try after sometime!" })
        }
        resp.send({ result, auth: token });
    })

    /*  console.log(result); */
});

app.post("/login", async (req, resp) =>
{
    // console.log(req.body);
    let user = await User.findOne(req.body).select("-password");
    if (req.body.email && req.body.password)
    {
        if (user)
        {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) =>
            {
                if (err)
                {
                    resp.send({ result: "Something went wrong, please try after sometime!" })
                }
                resp.send({ user, auth: token });
            })

        } else
        {
            resp.send({ result: "User Not found!" });
        }
    } else
    {
        resp.send({ result: "User Not found!" });
    }
});

//add product
app.post("/add-product", verifyToken, async (req, resp) =>
{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

//product list api

app.get("/products", verifyToken, async (req, resp) =>
{
    let products = await Product.find();
    // console.log(products.length);
    if (products.length > 0)
    {
        resp.send(products);
    } else
    {
        resp.send({ result: 'No Product found' });
    }
});

// product delete api

app.delete("/product/:id", verifyToken, async (req, resp) =>
{
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);

});
//get single product api
app.get("/product/:id", verifyToken, async (req, resp) =>
{

    let result = await Product.findOne({ _id: req.params.id });
    /* console.log(result);
    resp.send("ok"); */
    if (result)
    {
        resp.send(result);
    } else
    {
        resp.send({ result: "No Record Found!" });
    }
});
//update single product data using put method  api
app.put("/product/:id", verifyToken, async (req, resp) =>
{
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    resp.send(result);
});
//search api using get method
app.get("/search/:key", verifyToken, async (req, resp) =>
{
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } }
        ]
    });
    resp.send(result);
});
function verifyToken(req, resp, next) // call middleware 
{
    let token = req.headers.authorization;
    if (token)
    {
        token = token.split(' ')[1];
        console.warn("Middleware callled!....", token);
        Jwt.verify(token, jwtKey, (error, valid) =>
        {
            if (error)
            {
                resp.status(401).send({ result: "Please provide valid token with header" });

            } else
            {
                next();
            }
        })
    } else
    {
        resp.status(403).send({ result: "Please add token with header" });
    }
    // console.warn("Middleware callled!....", token);
}
/* const connectDB = async () =>
{
    mongoose.connect('mongodb://localhost:27017/e-comm');
    const productSchema = new mongoose.Schema({});
    const product = mongoose.model('products', productSchema);
    const data = await product.find();
    console.warn(data);

}
connectDB(); */

app.listen(5000);