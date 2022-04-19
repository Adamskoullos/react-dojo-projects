import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
  id: string;
  name: string;
  food: string[];
}

interface AddFoodToCustomerPayload {
  id: string;
  newItem: string;
}

interface CustomersState {
  value: Customer[];
}

const initialState: CustomersState = {
  value: [],
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.value.push(action.payload);
    },
    addFood: (state, action: PayloadAction<AddFoodToCustomerPayload>) => {
      state.value.forEach((customer) => {
        if (customer.id === action.payload.id) {
          customer.food.push(action.payload.newItem);
        }
      });
    },
  },
});

export const { addCustomer, addFood } = customersSlice.actions;

export default customersSlice.reducer;
