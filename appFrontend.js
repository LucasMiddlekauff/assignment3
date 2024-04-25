import { useState, useEffect } from "react";
function App() {
  const [product, setProduct] = useState([]);

  //holds the product that will be returned when
  //a user searches for a product by id
  const [oneProduct, setOneProduct] = useState([]);

  // new Product to add with user form data
  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: 0.0,
  });

  useEffect(() => {
    getAllProducts();
  }, []);
  function getAllProducts() {
    fetch("http://localhost:8081/listProducts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
  }

  const showAllItems = product.map((el) => (
    <div key={el.id}>
      <img src={el.imageUrl} width={30} alt="images" /> <br />
      Title: {el.name} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Description :{el.description} <br />
    </div>
  ));

  return (
    <div>
      <h1>Catalog of Products</h1>
      <div>
        <h3>Show all available Products.</h3>
        <button onClick={() => getAllProducts()}>Show All ...</button>
        {showAllItems}
      </div>
    </div>
  ); // return end
}

export default App;
