export const TEMP = (props) => {
    return(
        <div className="App">
            <button onClick={() => props.onStateSwitch('locked')}>Log Out</button>
        </div>
    )
}