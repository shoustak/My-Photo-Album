import './AppBar.css'
import Dropdown from "./AppBarUtils/Dropdown"
import SearchFiled from "./AppBarUtils/SearchFiled"

const AppBar = () => {
  return (
    <div className="appbar">
      <h1 className='app-title'>Photo Albums Page</h1>
      <div className="fildes">
        <SearchFiled />
        <Dropdown />
      </div>
    </div>
  )
}

export default AppBar