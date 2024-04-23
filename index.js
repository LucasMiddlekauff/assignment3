import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { useState, useEffect } from "react";
function App() {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8081/listProducts");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setProducts(data);
      setDisplayProducts(true); // Set displayProducts to true after fetching products
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const listItems = products.map((el) => (
    // PRODUCT
    <div class="row border-top border-bottom" key={el.id}>
      <div class="row main align-items-center">
        <div class="col-2">
          <img class="img-fluid" src={el.imageUrl} width="50" />
        </div>
        <div class="col">
          <div class="row text-muted">{el.name}</div>
          <div class="row">{el.category}</div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <h1>Product List</h1>

      <button onClick={fetchProducts}>Display Products</button>

      {displayProducts && ( // Show products only if displayProducts is true
        <ul>{listItems}</ul>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
