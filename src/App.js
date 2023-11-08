import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Homepage from './page/Homepage.js';
import RestaurantIndex from './page/RestaurantIndex.js';
import Restaurant from './page/Restaurant.js';
import Layout from './Layout.js';
import { LocationProvider } from "./location.js";
import Signup from "./page/Signup.js";
import Login from "./page/Login.js";



function App() {

  return (
    <div>
      <LocationProvider>
        {/* <Layout> */}
          <Router>
            <Routes>
              <Route path="/" element={<Layout/>}>
              <Route index element={<Homepage />} />
              <Route path="restaurants" element={<RestaurantIndex />} />
              <Route path="restaurants/:id" element={<Restaurant/>} />
              <Route path="signup" element={<Signup/>}/>
              <Route path="login" element={<Login/>}/>
              </Route>
            </Routes>
          </Router>
        {/* </Layout> */}
      </LocationProvider>
    </div>


  );
}


export default App;
