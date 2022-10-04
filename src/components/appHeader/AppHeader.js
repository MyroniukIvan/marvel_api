import './appHeader.scss';
import {
    NavLink
} from "react-router-dom";

const AppHeader = () => {

    const style = {
        transition: "0.3s transform",
        cursor: "pointer",
    }

    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href='https://www.marvel.com/'>
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink style={
                        (isActive) => {
                            return isActive ? style : undefined
                        }
                    } to="/">Characters</NavLink></li>

                    <li><NavLink style={
                        (isActive) => {
                            return isActive ? style : undefined
                        }
                    } to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;