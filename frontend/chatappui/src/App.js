import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AuthProvider from "./components/AuthProvider"
import LoginForm from "./components/LoginForm"
import PrivateRoute from "./components/PrivateRoute"
import Chatroom from "./components/Chatroom"
import "../src/styling/App.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route element={<PrivateRoute />}>
            <Route path="/chatroom" element={<Chatroom />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
