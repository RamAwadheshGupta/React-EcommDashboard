const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const app = express();

app.use(express.json());
app.use(cors());
app.post('/register', async (req, resp) =>
{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
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
            resp.send(user);
        } else
        {
            resp.send({ result: "User Not found!" });
        }
    } else
    {
        resp.send({ result: "User Not found!" });
    }
});

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