import React, { Fragment } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./styles/ice-cream.scss";
import Header from "./components/structure/Header";
import Footer from "./components/structure/Footer";
import Menu from "./pages/Menu";
import IceCreamForm from "./components/IceCreamForm";
import AvailableIceCreams from "./pages/AvailableIceCreams";
import iceCreamImg from "./assets/img/ultimate-ice-cream.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <HelmetProvider>
      <Fragment>
        <Router>
          <Header
            headerText="Ultimate Ice Cream"
            image={iceCreamImg}
            altText="header image of ice cream"
          />
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/ice-creams" element={<AvailableIceCreams />} />
            <Route path="/edit/:id" element={<IceCreamForm />} />
            <Route path="/add/:id" element={<IceCreamForm newIceCream />} />
            <Route path="/*" element={<Navigate replace to="/" />} />
          </Routes>
          <Footer footerText="ULTIMATE ICE CREAM" />
        </Router>
      </Fragment>
    </HelmetProvider>
  );
};

export default App;
