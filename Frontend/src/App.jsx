import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import Layout from "./pages/profile/components/Layout"
import Stats from "./pages/profile/Stats"
import Jobs from "./pages/profile/All-jobs/jobs"
import Profile from "./pages/profile/profile"
import { Toaster } from "react-hot-toast"
import { useSelector } from "react-redux"

function App() {
  const { user } = useSelector(state => state.auth)
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />} >
            <Route index element={user ? <Stats /> : <Navigate to="/login" />} />
            <Route path="all-jobs" element={user ? <Jobs /> : <Navigate to="/login" />} />
            <Route path="profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
          <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
