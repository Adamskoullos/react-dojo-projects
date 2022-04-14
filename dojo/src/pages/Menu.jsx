import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMenu } from "../data/iceCreamData";
// import Loader from "../components/structure/Loader";
import Main from "../components/structure/Main";
import IceCreamCard from "../components/IceCreamCard";

const Menu = () => {
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    <Main headingText="Rock you taste buds with one of these!">
      {menu && (
        <ul className="container">
          {menu.map((item) => (
            <IceCreamCard
              key={item.id}
              id={item.id}
              name={item.iceCream.name}
              updateFlag
            >
              <div className="content card-content">
                <p className="price">{`${item.price.toFixed(2)}`}</p>
                <p className={`stock${item.inStock ? "" : " out"}`}>
                  {item.inStock ? `${item.quantity} in stock` : `out of stock`}
                </p>
                <p className="description">{item.description}</p>
              </div>
            </IceCreamCard>
          ))}
        </ul>
      )}
      {/* <Loader
        isLoading={isLoading}
        loadingMessage="Loading ice creams..."
        doneMessage="Ice creams loaded"
      /> */}
    </Main>
  );
};

export default Menu;
