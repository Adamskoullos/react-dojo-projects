import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { Customer, addFood } from "../features/customerSlice";

export default function CustomerCard({
  id,
  name,
  food,
}: Customer): JSX.Element {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState("");

  const addFoodHandler = () => {
    if (food.includes(newItem)) {
      setNewItem("");
      return;
    }
    dispatch(addFood({ id: id, newItem }));
    setNewItem("");
  };

  return (
    <div className="customer-food-card-container">
      <p>{name}</p>
      <div className="customer-foods-container">
        <div className="customer-food">
          {food.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className="customer-food-input-container">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button type="button" onClick={addFoodHandler}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
