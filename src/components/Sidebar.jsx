import NumButton from "./NumButton"

export default function Sidebar({ active, changeActive }) {
    return(
        <div className={window.innerWidth < 768 ? "sidebar-mobile" : "sidebar-desktop"}>
            <div className="btn-container">
                <NumButton value={1} active={active} changeActive={changeActive}/>
                <NumButton value={2} active={active} changeActive={changeActive}/>
                <NumButton value={3} active={active} changeActive={changeActive}/>
                <NumButton value={4} active={active} changeActive={changeActive}/>
            </div>
        </div>
    )
}