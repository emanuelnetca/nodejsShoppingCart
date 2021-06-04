const express = require('express');
const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const connectDB = require('./config/db');
const productsData = require("./data/products");
var id_product = '';
var cart_items = [];

// connect DB
connectDB();
// const addData = async () => {
//     try {
//         await Product.deleteMany({});
//         await Product.insertMany(productsData);

//         console.log("Data Added");
//     } catch (error) {
//         console.error("Error With Adding Data");
//         process.exit(1);
//     }
// };
// addData();

// express app
const app = express();
const port = 6789;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    Product.find()
    .then((result) => {
        res.render('index', {products: result, total_items: cart_items.length});
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/product/:id', (req, res) => {
    id_product = req.params.id;
    res.redirect('/product');
});

app.get('/product', (req, res) => {
    Product.findById(id_product)
    .then((result) => {
        res.render('product', {product: result});
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/cart', (req, res) => {
    Product.find()
    .then((result) => {
        res.render('cart', {data_db: result, cart: cart_items});
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/animation', (req, res) => {
    res.render('animation');
});

app.get('/game', (req, res) => {
    res.render('game');
});

app.post('/add-to-cart', (req, res) => {
    if (req.body.select > 0) {
        var find = false;
        for (let i = 0; i < cart_items.length; ++i) {
            if (cart_items[i].id == req.body.product_id) {
                cart_items[i].qty = (Number(cart_items[i].qty) + Number(req.body.select)).toString();
                find = true;
            }
        }
        if (find == false) {
            cart_items.push({
                id: req.body.product_id,
                qty: req.body.select
            });
        }
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

app.post('/pay', (req, res) => {
    cart_items = []
    res.redirect('/');
});

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:${port}`));