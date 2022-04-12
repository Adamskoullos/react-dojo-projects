import React, { Fragment } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./styles/ice-cream.scss";
import Header from "./components/structure/Header";
import Footer from "./components/structure/Footer";
import Menu from "./components/Menu";
import iceCreamImg from "./assets/img/ultimate-ice-cream.svg";

const App = () => {
  return (
    <HelmetProvider>
      <Fragment>
        <Header
          headerText="Ultimate Ice Cream"
          image={iceCreamImg}
          altText="header image of ice cream"
        />
        <Menu />
        <Footer footerText="ULTIMATE ICE CREAM" />
      </Fragment>
    </HelmetProvider>
  );
};

export default App;
