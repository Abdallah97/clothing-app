import Home from "./routes/home/Home.component";  

import Navigation from "./routes/Navigation/Navigation.component";

import Authntication from "./routes/Authintication/Auth.component";

import {Routes,Route} from 'react-router-dom';



function Shop(){
  return <h3>Shop Now</h3>
}

function App() {

  return (
   <Routes>
      <Route path="/" element={<Navigation/>}>
       <Route index element={<Home/>}/>
       <Route path="/shop" element={<Shop/>}/>
       <Route path="/auth" element={<Authntication/>}/>
      </Route>
    </Routes>

  );
}
   


export default App;
