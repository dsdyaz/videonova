import React from "react"
import "./App.css"
import "./style.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import HomePage from "./pages/home-page/home-page"
import UserPage from "./pages/user-page/user-page"
import { fetchUsers, fetchVideos } from "./modules/userdata"

export default function App() {
  const dispatch = useDispatch()
  dispatch(fetchUsers())
  dispatch(fetchVideos())
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/user/:module" element={<UserPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
