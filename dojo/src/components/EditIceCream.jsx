import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getIceCream, updateIceCream } from "../data/iceCreamData";
import Loader from "../components/structure/Loader";
import IceCreamImage from "./IceCreamImage";
import "../styles/form-spacer.scss";

const EditIceCream = () => {
  const [iceCream, setIceCream] = useState({
    price: "0.00",
    inStock: true,
    quantity: "0",
    description: "",
    iceCream: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const data = await getIceCream(id);
        if (data) {
          setIceCream({
            id: data.id,
            price: data.price.toFixed(2),
            inStock: data.inStock,
            quantity: data.quantity.toString(),
            description: data.description,
            iceCream: data.iceCream,
          });
          setIsLoading(false);
        }
      } catch (err) {
        if (err.response.status === 404) {
          navigate("/");
        }
      }
    };
    getData();
  }, [id]);

  const onFormChangeHandler = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    let newItem = {
      ...iceCream,
      [e.target.name]: value,
    };

    if (e.target.name === "quantity") {
      newItem.inStock = e.target.value !== "0";
    }
    if (e.target.name === "inStock" && !e.target.checked) {
      newItem.quantity = "0";
    }

    setIceCream(newItem);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newItem = {
      id: iceCream.id,
      iceCream: iceCream.iceCream,
      price: parseFloat(iceCream.price),
      inStock: iceCream.inStock,
      quantity: parseInt(iceCream.quantity),
      description: iceCream.description,
    };
    const res = await updateIceCream(newItem);
    navigate("/");
  };

  return (
    <Fragment>
      <Helmet>
        {"name" in iceCream.iceCream && (
          <title>{iceCream.iceCream.name} | Ultimate Ice Cream</title>
        )}
      </Helmet>
      {"name" in iceCream.iceCream && (
        <h1 className="main-heading">Update This Beauty</h1>
      )}
      <Loader
        isLoading={isLoading}
        loadingMessage="Loading ice cream..."
        doneMessage="Ice cream loaded"
      />

      <div className="form-frame">
        <div className="image-container">
          <IceCreamImage id={iceCream.id} />
        </div>
        <div className="form-container">
          <dl>
            <dt>Name: </dt>
            <dd>{iceCream.iceCream.name}</dd>
          </dl>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="description">Description:</label>
            <textarea
              value={iceCream.description}
              onChange={onFormChangeHandler}
              name="description"
              id="description"
              rows="3"
            />
            <label htmlFor="inStock">In Stock:</label>
            <div className="checkbox-wrapper">
              <input
                checked={iceCream.inStock}
                type="checkbox"
                name="inStock"
                onChange={onFormChangeHandler}
              />
              <div className="checkbox-wrapper-checked" />
            </div>
            <label htmlFor="quantity">Quantity: </label>
            <select
              name="quantity"
              id="quantity"
              value={iceCream.quantity}
              onChange={onFormChangeHandler}
            >
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={iceCream.price}
              onChange={onFormChangeHandler}
            />
            <div className="button-container">
              <button type="submit" className="ok">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditIceCream;
