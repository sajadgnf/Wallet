import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

// redux
import store from "./redux/store"

// components
import AddForm from "./components/addForm/AddForm";
import LandingPage from "./components/landing/LandingPage";
import Header from "./components/header/Header";
import Crypto from "./components/crypto/Crypto";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/addExpense" element={<AddForm />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Provider>
  );
}

export default App;
