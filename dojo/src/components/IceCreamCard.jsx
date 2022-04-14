import React from "react";
import { useNavigate, Link } from "react-router-dom";
import IceCreamImage from "./IceCreamImage";

const IceCreamCard = ({ children, id, name, updateFlag }) => {
  const navigate = useNavigate();

  const path = updateFlag ? `/edit/${id}` : `/add/${id}`;

  return (
    <li key={id}>
      <section onClick={() => navigate(path)} className="card">
        <div className="image-container">
          <IceCreamImage id={id} />
        </div>
        <div className="text-container">
          <h3>
            <Link to={path}>{name}</Link>
          </h3>
          {children}
        </div>
      </section>
    </li>
  );
};

export default IceCreamCard;
