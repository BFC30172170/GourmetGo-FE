import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { LocationProvider } from "lib/location";
import { AuthProvider } from "lib/auth";
import { BasketProvider } from "lib/basket";
import { ThemeProvider } from "lib/theme";
import Homepage from 'page/Homepage';
import RestaurantIndex from 'page/RestaurantIndex';
import Restaurant from 'page/Restaurant';
import Layout from 'Layout';
import Signup from "page/Signup";
import Login from "page/Login";
import Profile from "page/Profile";
import Checkout from "page/Checkout";



function App() {

  return (
    <div>
      <LocationProvider>
        <AuthProvider>
          <BasketProvider>
            <ThemeProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="restaurants" element={<RestaurantIndex />} />
                    <Route path="restaurants/:id" element={<Restaurant />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="login" element={<Login />} />
                    <Route path="checkout" element={<Checkout />} />
                  </Route>
                </Routes>
              </Router>
            </ThemeProvider>
          </BasketProvider>
        </AuthProvider>
      </LocationProvider>
    </div>


  );
}


export default App;
