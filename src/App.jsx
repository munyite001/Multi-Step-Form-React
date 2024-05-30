import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Display from "./components/Display";


export default function App() {
  const [active, setActive] = useState(1);

  const changeActive = (val) => {
    setActive(val)
  }
  return (
    <div className="app">
      <Sidebar active={active} changeActive={changeActive}/>
      <Display active={active} setActive={setActive}/>
    </div>
  )
}