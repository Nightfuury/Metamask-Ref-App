import React from "react";
import { Toaster } from "react-hot-toast";

import Header from "../../components/Header/Header";
import Divider from "../../components/Divider/Divider";
import About from "../../components/About/About";
import TvlStats from "../../components/TvlStats/TvlStats";
import Funds from "../Funds/Funds";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div class="container-fluid">
      <Toaster position="top-center" reverseOrder={false} />

      <Header />
      <Divider />

      <About />
      <Divider />

      {/* <TvlStats />
      <Divider /> */}

      <Funds />
      <Divider />

      <Footer />
    </div>
  );
};

export default Home;
