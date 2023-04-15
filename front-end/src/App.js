import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent'

function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<h1>Products Listing Component</h1>} />
            <Route path='/add' element={<h1>Add Products Component</h1>} />
            <Route path='/update' element={<h1>Update Products Component</h1>} />
            <Route path='/logout' element={<h1>Logout Component</h1>} />
            <Route path='/profile' element={<h1>Profile Component</h1>} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        {/* <h1>E-Dashboard</h1> */}
        {/* <Footer /> */} {/* we use routing in Footer then use Footer Component in BrowserRouter */}
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
