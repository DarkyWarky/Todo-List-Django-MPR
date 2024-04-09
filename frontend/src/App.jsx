import {BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import Mylist from './pages/Mylist'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Navbar from './components/Navbar'


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}
function RegisterAndLogout() {
  localStorage.clear()
  return <Login route="/api/user/register/" method="register"/>
}

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        
        <Route path='/' element={<Mylist/>}/>
        <Route path='/mylist' element={<Mylist/>}/>
        <Route path="/logout" element={<Logout />} />
        <Route path='/login' element={<Login route="/api/token/" method="login"/>}/>
        <Route path='/register' element={<RegisterAndLogout/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
