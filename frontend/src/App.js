import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";

function App(){
  return(
    <Router>
      <Routes>
        <Route path='/' element={<EventsPage/>}/>
        <Route path='/events/:id' element={<EventDetailsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;