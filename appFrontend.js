import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [viewer2, setViewer2] = useState(false);
  // new Product
  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    name: "",
    price: 0.0,
    description: "",
    category: "",
    imageUrl: "",
    rating: 0.0,
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  //function to get all the products
  function getAllProducts() {
    fetch("http://localhost:8081/listProducts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  //function to get one product by its id
  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:8081/product/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setOneProduct(Array.isArray(data) ? data : [data]);
        });
      if (false === viewer2) setViewer2(true);
    } else {
      console.log("Wrong number of Product id.");
    }
  }
  //maps a single item in the data base
  const showOneItem = oneProduct.map((el) => (
    <div key={el.id}>
      <img src={el.imageUrl} width={30} alt="images" /> <br />
      Title: {el.name} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating} <br />
    </div>
  ));

  //maps all the items in the database
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
        {viewer1 && showAllItems}
      </div>
      <div>
        <h3>Show one Product by Id:</h3>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="id"
          onChange={(e) => getOneProduct(e.target.value)}
        />
        {viewer2 && showOneItem}
      </div>
    </div>
  );
}

export default App;
