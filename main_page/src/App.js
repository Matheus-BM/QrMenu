
import './App.css';
import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Welcome_Page from './pages/WelcomePage/Welcome_Page';
import Auth_page from './pages/Auth_page/Auth_page';

function App() {

  return (
    <Router>
      <Routes>
        
        <Route exact path="/" element={<Welcome_Page/>} />  
        <Route exact path="/auth" element={<Auth_page/>} />
      
      </Routes>
    </Router>

   
  )
}

export default App;
