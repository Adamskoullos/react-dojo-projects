import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getMenu } from "../data/iceCreamData";
import IceCreamImage from "./IceCreamImage";
import Loader from "../components/structure/Loader";

const Menu = () => {
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      const data = await getMenu();
      console.log(data);

      if (isMounted && data) {
        setMenu(data);
        setIsLoading(false);
      }
    };
    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main>
      <Helmet>
        <title>
          Rock you taste buds with one of these! | Ultimate Ice Cream
        </title>
      </Helmet>
      <h2 className="main-heading">Rock you taste buds with one of these!</h2>
      <Loader isLoading={isLoading} loadingMessage="Loading ice creams..." />
      {menu && (
        <ul className="container">
          {menu.map((item) => (
            <li key={item.id}>
              <section className="card">
                <div className="image-container">
                  <IceCreamImage id={item.id} />
                </div>
                <div className="text-container">
                  <h3>{item.iceCream.name}</h3>
                  <div className="content card-content">
                    <p className="price">{`${item.price.toFixed(2)}`}</p>
                    <p className={`stock${item.inStock ? "" : " out"}`}>
                      {item.inStock
                        ? `${item.quantity} in stock`
                        : `out of stock`}
                    </p>
                    <p className="description">{item.description}</p>
                  </div>
                </div>
              </section>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Menu;
