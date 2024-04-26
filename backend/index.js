const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());




app.listen(process.env.port, () => {
    console.log(`Example app listening at http://localhost:${process.env.port}`);
    }
);
