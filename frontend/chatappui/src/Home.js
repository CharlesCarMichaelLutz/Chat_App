import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
//import Chatroom from "./components/Chatroom"
import LoginForm from "./components/LoginForm"
import AuthProvider from "./hooks/AuthProvider"
//import PrivateRoute from "./components/PrivateRoute"
import "../src/styling/App.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          {/* <Route element={<PrivateRoute />}>
              <Route path="/chatroom" element={<Chatroom />} />
            </Route> */}
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
