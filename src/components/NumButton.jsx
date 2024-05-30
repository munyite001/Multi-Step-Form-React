export default function NumButton({value, active, changeActive }) {

    var text = ["your info", "select plan", "add-ons", "summary"]

    return(
        <div className="btn-box">
            <button className={active == value ? "active nav-button" : "nav-button"} onClick={() => changeActive(value)}>
                {value}
            </button>
            <div className="info">
                <h3>Step {value}</h3>
                <p>{text[value - 1]}</p>
            </div>
        </div>
    )
}