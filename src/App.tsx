import Dashboard from "./components/Dashboard"
import LoginForm from "./components/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/dashboard" element={ <Dashboard/>} />
</Routes>

    </Router>
  )
}

export default App