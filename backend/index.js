const express = require('express');
const app = express();

app.get("/", (req, resp) =>
{
    resp.send("Apps is working .....");
});

app.listen(5000);