import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Details from "./Component/Pages/Details";
import Landing from "./Component/Pages/Landing";
import Properties from "./Component/Pages/Properties";
import Login from "./Component/Pages/Login";
import Signup from "./Component/Pages/Signup";
import PropertyForm from "./Component/Pages/UploadProperty";
import UpdatePropertyForm from "./Component/Pages/Updateproperty";
import LatestProperty from "./Component/Pages/LatestProperty";
import Aboutus from "./Component/Pages/Aboutus";
import Header from "./Component/Home/Header";
import Footer from "./Component/Home/Footer";
import Wishlist from "./Component/Pages/Wishlist";
import Forgetpass from "./Component/Pages/Forgetpass";
import Resetpass from "./Component/Pages/Resetpass";


function App() {
  return (
    <>
    <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/allproperties" element={<Properties/>}/>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/addproperty" element={<PropertyForm/>}></Route>
          <Route path="/updateproperty" element={<UpdatePropertyForm/>}></Route>
          <Route path="/latestproperties" element={<LatestProperty/>}></Route>
          <Route path="/aboutus" element={<Aboutus/>}></Route>
          <Route path="/wishlist" element={<Wishlist/>}></Route>
          <Route path="/forgetpassword" element={<Forgetpass/>}></Route>
          <Route path="/reset-password/:token" element={<Resetpass/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
