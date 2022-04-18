import React from "react";
import { IPerson } from "../App";

interface IProps {
  people: IPerson[];
}

const renderList = (items: IPerson[]): JSX.Element[] =>
  items.map((item) => <li key={item.name}>{item.name}</li>);

const List: React.FC<IProps> = ({ people }) => {
  return <ul>{renderList(people)}</ul>;
};

export default List;
