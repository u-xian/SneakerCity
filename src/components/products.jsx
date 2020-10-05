import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productsdata from "../Data/shoes.json";
import CartPage from "./cartpage";
import { useDispatch } from "react-redux";
import { itemsAdded } from "../store/cart";

export default function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productsDetails, setProductsDetails] = useState([]);
  const [shoesizetype, setShoeSizeType] = useState("");
  const [qty, setQty] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setProducts(productsdata);
    }
    fetchData();
  }, []);

  const getProductDetails = (productId) => {
    const response = products.filter((c) => c.id === Number(productId));
    setProductsDetails(response);
  };

  const addItems = (itemid) => {
    const product = products.filter((p) => p.id === Number(itemid));
    dispatch(
      itemsAdded({
        selectedItems: {
          productID: product[0].id,
          productName: product[0].model,
          productSize: shoesizetype,
          price_unit: product[0].price,
          quantity: qty,
          totalPrice: product[0].price * qty,
        },
      })
    );
  };

  return (
    <div className="row">
      <div className="col-sm">
        Products
        <ul className="products">
          {products.map((p) => (
            <li className="items" key={p.id}>
              <Link to={"#"} onClick={() => getProductDetails(p.id)}>
                <img
                  className="card-img-top"
                  alt="Sneaker brand"
                  src={`${process.env.PUBLIC_URL}/assets/images/${p.picture}`}
                />
              </Link>
              <h5>Brand : {p.brand_name}</h5>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <small>Model : {p.model}</small>
                </li>
                <li className="list-inline-item">
                  <small>Price :{p.price} </small>
                </li>
                <li className="list-inline-item">
                  <small>Released Date :{p.release_date} </small>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-sm">
        <h2>Sneak Details</h2>
        <div className="card-group">
          {productsDetails.map((p) => (
            <div className="card" key={p.id}>
              <div className="row">
                <div className="card-body">
                  <img
                    className="card-img-top"
                    alt="Sneaker brand"
                    src={`${process.env.PUBLIC_URL}/assets/images/${p.picture}`}
                  />
                  <h4 className="card-title">Brand :{p.brand_name} </h4>
                  <div className="card-text">
                    <ul className="list-inline">
                      <li className="list-inline-item">Model :{p.model}</li>
                      <li className="list-inline-item">Price :{p.price} </li>
                      <li className="list-inline-item">
                        Released Date : {p.release_date}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm">
                  <ul className="list-inline">
                    {p.shoessize.map((s) => (
                      <li className="list-inline-item" key={s.id}>
                        {s.size}
                        <input
                          value={s.size}
                          type="radio"
                          checked={shoesizetype === s.size}
                          onChange={() => setShoeSizeType(s.size)}
                        />
                      </li>
                    ))}
                  </ul>
                  Qty :
                  <input
                    placeholder="Qty"
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
                <div className="col-sm">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => addItems(p.id)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-sm">
        <CartPage />
      </div>
    </div>
  );
}
