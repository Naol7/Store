import express from 'express';
import mongoose from 'mongoose';
import Product from './models/product.model.js';

const app = express();

// Use express.json() to parse incoming JSON requests
app.use(express.json()); // This was missing parentheses

app.get('/', (req, res) => {
  res.send('Hello from Node');
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message }); // Corrected from 'error' to 'err'
  }
});

app.put('/product/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(500).json({ message: err.message })

  }
})

app.delete('/product/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ message: "file deleted." })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
mongoose.connect("enter mongodb connection string here")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  })
  .catch(() => {
    console.log("Unable to connect to MongoDB");
  });
