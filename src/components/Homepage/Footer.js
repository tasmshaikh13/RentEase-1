import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 text-white" style={{ backgroundColor: "rgb(74, 119, 47)" }}>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h5>Cost-Effective Solution</h5>
            <p>
              Renting from local owners on RentEase is a cost-effective
              alternative to purchasing items outright, saving you money.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Convenient and Flexible</h5>
            <p>
              RentEase offers a convenient and flexible way to access items you
              need without the commitment of ownership, providing freedom and
              choice.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Wide Variety of Items</h5>
            <p>
              Discover a wide range of items available for rent on RentEase,
              ensuring you can find exactly what you're looking for.
            </p>
          </div>
        </div>
        <hr className="bg-light" />
        <p className="mb-0">© 2025 RentEase. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
