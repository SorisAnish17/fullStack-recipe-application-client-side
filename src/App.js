import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./Components/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import EditRecipe from "./Components/EditRecipe";
import SignUp from "./Components/SignUp";
import LoginPage from "./Components/LoginPage";
import Home from "./Components/Home";
import Recipes from "./Components/Recipes";
import SingleRecipe from "./Components/SingleRecipe";
import AdminForm from "./Components/AdminForm";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/Register" element={<SignUp />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/admin" element={<AdminForm />} />
          <Route path="/apiserver" element={<Admin />} />
          <Route path="/editRecipe/:id" element={<EditRecipe />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/singleRecipe/:id" element={<SingleRecipe />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </Router>
    </div>
  );
}

export default App;
