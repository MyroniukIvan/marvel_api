import React, {useState} from 'react';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import SearchCharacter from "../searchCharacter/SearchCharacter";

const CharPage = (props) => {
    const [selectedChar, setChar] = useState(null);
    const [selectedComics, setComics] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }
    const onComicsSelected = (id) => {
        setComics(id)
    }

    return (<div>
        <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
            <ErrorBoundary>
                <CharList onCharSelected={onCharSelected}/>
            </ErrorBoundary>
            <div>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <SearchCharacter/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </div>
    </div>);
}

export default CharPage;