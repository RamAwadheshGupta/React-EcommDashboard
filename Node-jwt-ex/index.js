const express = require("express");
const jwt = require('jsonwebtoken');
const secretKey = "ua"

const app = express();

app.get("/", (req, resp) =>
{
    resp.json({
        message: "A sample api..."
    });
});

app.post("/login", (req, resp) =>
{
    const user = {
        id: 1,
        username: 'urban avenues',
        email: 'abc@test.com'
    }
    jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (erro, token) =>
    {
        resp.json({
            token
        })
    })
})
app.post("/profile", verifyToken, (req, resp) =>
{
    jwt.verify(req.token, secretKey, (err, authData) =>
    {
        if (err)
        {
            resp.send({ result: "invalid token" });
        } else
        {
            resp.json({
                message: "profile accessed",
                authData
            });
        }
    })
})

function verifyToken(req, resp, next)
{
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        //console.log(token);
        req.token = token;
        next();
    } else
    {
        resp.send({ result: "Toek is not valid" })
    }
}

app.listen(5001, () =>
{
    console.log("App is running on 5000 port");
});