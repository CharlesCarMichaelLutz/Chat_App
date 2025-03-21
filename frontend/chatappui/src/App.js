import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AuthProvider from "./components/AuthProvider"
import { Login } from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute"
import Chatroom from "./components/Chatroom"
import "../src/styling/styles.css"
import { LoginLayout } from "./layouts/LoginLayout"

function App() {
  return (
    <Router>
      <AuthProvider>
        <LoginLayout />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/chatroom" element={<Chatroom />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
