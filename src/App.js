import Fetch from "./components/Fetch";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Overview from "./components/Overview";
import Item from "./components/Item";
import Footer from "./components/Footer";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Fetch />
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Overview type="home" />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Overview type="cart" />} />
          <Route path="/favourite" element={<Overview type="favourite" />} />
          <Route path="/:section" element={<Overview type="section" />} />
          <Route path="/:section/:item" element={<Item />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
