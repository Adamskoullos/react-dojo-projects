import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store";
import CustomerCard from "./components/CustomerCard";
import ReservationCard from "./components/ReservationCard";
import { addReservation } from "./features/reservationSlice";

function App() {
  const reservations = useSelector(
    (state: RootState) => state.reservations.value
  );
  const customers = useSelector((state: RootState) => state.customers.value);
  const dispatch = useDispatch();

  const [reservationInput, setReservationInput] = useState("");

  const addReservationHandler = () => {
    if (!reservationInput) return;

    dispatch(addReservation(reservationInput));
    setReservationInput("");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="reservation-container">
          <div>
            <h5 className="reservation-header">Reservations</h5>
            <div className="reservation-cards-container">
              {reservations.map((item) => (
                <ReservationCard name={item} key={item} />
              ))}
            </div>
          </div>
          <div className="reservation-input-container">
            <input
              value={reservationInput}
              onChange={(e) => setReservationInput(e.target.value)}
            />
            <button onClick={addReservationHandler}>Add</button>
          </div>
        </div>
        <div className="customer-food-container">
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              name={customer.name}
              id={customer.id}
              food={customer.food}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
