import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

// redux
import store from "./redux/store"

// components
import AddForm from "./components/AddForm";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <Provider store={store}>
      <h1 className="title">Wallet</h1>
      <Routes>
        <Route path="/addExpense" element={<AddForm />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Provider>
  );
}

export default App;
