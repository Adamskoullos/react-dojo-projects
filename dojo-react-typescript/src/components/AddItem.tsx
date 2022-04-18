import React, { useState } from "react";
import { IPerson } from "../App";

interface IProps {
  people: IPerson[];
  setPeople: React.Dispatch<React.SetStateAction<IPerson[]>>;
}

const initialState = {
  name: "",
  age: "",
  url: "",
  note: "",
};

const AddItem: React.FC<IProps> = ({ people, setPeople }) => {
  const [formState, setFormState] = useState<IPerson>(initialState);

  const onFormChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setPeople([...people, formState]);
    setFormState({ ...initialState });
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={formState?.name}
        onChange={onFormChangeHandler}
      />
      <label htmlFor="name">Age</label>
      <input
        type="text"
        name="age"
        value={formState?.age}
        onChange={onFormChangeHandler}
      />
      <label htmlFor="url">Url</label>
      <input
        type="text"
        name="url"
        value={formState?.url}
        onChange={onFormChangeHandler}
      />
      <label htmlFor="note">Note</label>
      <textarea
        name="note"
        value={formState?.note}
        onChange={onFormChangeHandler}
      />
      <button type="submit">Add Person</button>
    </form>
  );
};

export default AddItem;
