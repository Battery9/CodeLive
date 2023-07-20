import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    return (
        <div 
        style={{height:"4.5vh", backgroundColor: '#80aaff', alignItems:"center", display:"flex"}}
        >
            <FontAwesomeIcon icon={faLaptopCode} style={{color: "#ffffe6", fontSize: "25px", margin: "9px"}} fixedWidth/>
            <a href='/' style={{textDecoration: "none"}}><h2 style={{color:"#ffffe6"}}>CodeLive</h2></a>
        </div>
    )
}