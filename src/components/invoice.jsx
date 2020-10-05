import React from "react";
import dateFormat from "dateformat";
import { useSelector } from "react-redux";

export default function Invoice() {
  const { items } = useSelector((state) => state.entities.cart);

  const total = () => {
    return items.reduce((result, c) => result + c.totalPrice, 0);
  };

  const printOutInvoice = () => {
    window.location = "/pos";
  };

  return (
    <div className="card">
      <div className="card-header">
        Invoice Number:
        <strong> CX20201008309WSJ</strong>
        <br />
        <strong>Date and Time:</strong>
        {dateFormat(new Date(), "yyyy-mm-dd hh:MM TT")}
      </div>
      <div className="card-body">
        <div className="row mb-8">
          <div className="col-sm-8">
            <div>
              <strong>Retailer : Sneaker City</strong>
            </div>
            <div>Kigali, Rwanda</div>
            <div>Email: info@sneakercity.com</div>
            <div>Phone: +25071 444 3333</div>
          </div>
          <br />
          <div className="col-sm-6">
            <div>
              <strong>Customer : Murenzi Martin</strong>
            </div>
            <div>Kigali, Rwanda</div>
            <div>Email: murenzi.martin@email.com</div>
            <div>Phone: +250799999999</div>
          </div>
        </div>

        <div className="table-responsive-sm">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Label</th>
                <th>Size</th>
                <th>Price Unit</th>
                <th>Quantity</th>
                <th>Total</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-5"></div>

          <div className="col-lg-4 col-sm-5 ml-auto">
            <table className="table table-clear">
              <tbody>
                <tr>
                  <td className="left">
                    <strong>VAT (10%)</strong>
                  </td>
                  <td className="right">{(total() * 10) / 100} RWF</td>
                </tr>
                <tr>
                  <td className="left">
                    <strong>Total</strong>
                  </td>
                  <td className="right">
                    <strong>{total()} RWF</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-success  btn-lg"
              onClick={() => printOutInvoice()}
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
