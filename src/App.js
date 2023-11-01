import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Homepage from './page/Homepage.js';
import Layout from './Layout.js';

function App() {
  
  return (
    <div>
      <Layout>
    <Router>
    <Routes>
      <Route path="/" element = {<Homepage/>}/>
    </Routes>
    </Router>
    </Layout>
    </div>

  );
}


export default App;
