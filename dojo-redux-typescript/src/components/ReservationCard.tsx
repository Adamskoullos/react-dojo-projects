import React from "react";
import { useDispatch } from "react-redux";
import { removeReservation } from "../features/reservationSlice";
import { addCustomer } from "../features/customerSlice";

interface ReservationCardTypes {
  name: string;
}

export default function ReservationCard({ name }: ReservationCardTypes) {
  const dispatch = useDispatch();
  const removeReservationHandler = () => {
    const newCustomer = {
      name: name,
      id: Math.floor(Math.random() * 10000).toString(),
      food: [],
    };
    dispatch(addCustomer(newCustomer));
    dispatch(removeReservation(name));
  };
  return (
    <div
      onClick={removeReservationHandler}
      key={name}
      className="reservation-card-container"
    >
      {name}
    </div>
  );
}
