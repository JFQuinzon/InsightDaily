import "./App.css";
import NavbarComponent from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import { useAuthContext } from "./context/AuthContext";
import Bookmarks from "./pages/bookmarks";
import { useState } from "react";

function App() {
  const { userData } = useAuthContext();

  const [category, setCategory] = useState("global");
  const [country, setCountry] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const handleCategoryChange = (category) => {
    setCategory(category);
  };
  const handleSearch = (search) => {
    setSearch(search);
  };
  const handleSort = (sort) => {
    setSort(sort);
  };

  return (
    <div>
      <Router>
        {userData?.accessToken && (
          <NavbarComponent
            category={category}
            country={country}
            changeCategory={handleCategoryChange}
            setCountry={setCountry}
            handleSearch={handleSearch}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              !userData?.accessToken ? (
                <Navigate to="/login" />
              ) : (
                <Landing
                  category={category}
                  country={country}
                  search={search}
                  sort={sort}
                  handleSearch={handleSearch}
                  handleSort={handleSort}
                />
              )
            }
          />
          <Route
            path="/bookmarks"
            element={
              !userData?.accessToken ? <Navigate to="/login" /> : <Bookmarks />
            }
          />
          <Route
            path="/login"
            element={userData?.accessToken ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={userData?.accessToken ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
