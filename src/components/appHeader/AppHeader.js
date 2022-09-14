import './appHeader.scss';

const AppHeader = () => {
    const link = 'https://www.marvel.com/'
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href={link}>
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="#">Characters</a></li>

                    <li><a href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;