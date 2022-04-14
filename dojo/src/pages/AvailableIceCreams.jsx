import React, { useState, useEffect } from "react";
import Main from "../components/structure/Main";
import IceCreamCard from "../components/IceCreamCard";
import { getAvailableIceCreams } from "../data/iceCreamData";

const AvailableIceCreams = () => {
  const [iceCreams, setAvailableIceCreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const data = await getAvailableIceCreams();
        if (isMounted && data) {
          setAvailableIceCreams(data);
          setIsLoading(false);
        }
      } catch (err) {}
    };
    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  console.log(iceCreams);

  return (
    <Main headingText="Available Ice Creams">
      {iceCreams.length && (
        <ul className="container">
          {iceCreams.map((item) => (
            <IceCreamCard key={item.id} id={item.id} name={item.name}>
              {/* <div className="content card-content">
            <p className="price">{`${item.price.toFixed(2)}`}</p>
            <p className={`stock${item.inStock ? "" : " out"}`}>
              {item.inStock ? `${item.quantity} in stock` : `out of stock`}
            </p>
            <p className="description">{item.description}</p>
          </div> */}
            </IceCreamCard>
          ))}
        </ul>
      )}
    </Main>
  );
};

export default AvailableIceCreams;
