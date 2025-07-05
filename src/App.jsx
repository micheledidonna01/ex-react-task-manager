import { BrowserRouter, Routes, Route } from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import {GlobalProvider} from "./context/GlobalContext"
import TaskRow from "./pages/TaskRow"

function App() {


  return (
    <>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route>
          <Route path="/" element={<TaskList />} />
          <Route path=":id" element={<TaskRow />} />
          <Route path="/add-task" element={<AddTask />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
