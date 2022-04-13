import React, { Fragment } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./styles/ice-cream.scss";
import Header from "./components/structure/Header";
import Footer from "./components/structure/Footer";
import Menu from "./components/Menu";
import EditIceCream from "./components/EditIceCream";
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
          <main>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/edit/:id" element={<EditIceCream />} />
              <Route path="/*" element={<Navigate replace to="/" />} />
            </Routes>
          </main>
          <Footer footerText="ULTIMATE ICE CREAM" />
        </Router>
      </Fragment>
    </HelmetProvider>
  );
};

export default App;
