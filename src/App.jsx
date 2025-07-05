import { BrowserRouter, Routes, Route } from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import {GlobalProvider} from "./context/GlobalContext"

function App() {


  return (
    <>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
