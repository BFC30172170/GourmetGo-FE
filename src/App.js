import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Homepage from './page/Homepage.js';
import RestaurantIndex from './page/RestaurantIndex.js';
import Layout from './Layout.js';
import { LocationProvider } from "./location.js";



function App() {

  return (
    <div>
      <LocationProvider>
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/restaurants" element={<RestaurantIndex />} />
            </Routes>
          </Router>
        </Layout>
      </LocationProvider>
    </div>


  );
}


export default App;
