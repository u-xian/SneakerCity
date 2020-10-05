import React, { useState } from "react";
import Invoice from "./invoice";
import { useDispatch, useSelector } from "react-redux";
import { itemRemoved } from "../store/cart";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.entities.cart);
  const [showCart, setShowCart] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const total = () => {
    return items.reduce((result, c) => result + c.totalPrice, 0);
  };
  return (
    <React.Fragment>
      {showCart && (
        <div>
          <h2>Cart</h2>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Label</th>
                <th>Size</th>
                <th>Price Unit</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id}>
                  <td>{c.productName}</td>
                  <td>{c.productSize}</td>
                  <td>{c.price_unit}</td>
                  <td>{c.quantity}</td>
                  <td>{c.totalPrice}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => dispatch(itemRemoved({ itemID: c.id }))}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-sm btn-primary float-right"
            onClick={() => setShowCheckout(true)}
          >
            Check-out
          </button>
          Total : {total()} RWF
        </div>
      )}

      <br />
      <br />
      {showCheckout && (
        <div className="checkoutDiv">
          <h5 className="text-center">Pay with BK Visa Card</h5>
          <label htmlFor="cc-name">Name on card</label>
          <input
            type="text"
            className="form-control"
            id="cc-name"
            placeholder=""
            required
          />

          <div className="invalid-feedback">Name on card is required</div>
          <div className="form-group">
            <label htmlFor="cc-number">Card number</label>
            <input
              id="cc-number"
              name="cc-number"
              type="tel"
              className="form-control"
              required
            />
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="cc-exp">Expiration</label>
                <input
                  id="cc-exp"
                  name="cc-exp"
                  type="tel"
                  className="form-control"
                  required
                  placeholder="MM / YY"
                />
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="x_card_code">Security code</label>
              <div className="input-group">
                <input
                  id="x_card_code"
                  name="x_card_code"
                  type="tel"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              setShowInvoice(true);
              setShowCart(false);
              setShowCheckout(false);
            }}
          >
            Pay
          </button>
        </div>
      )}
      <br />
      {showInvoice && <Invoice />}
    </React.Fragment>
  );
}
