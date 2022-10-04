import React, {useState} from 'react';
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = (props) => {
    const [selectedChar, setChar] = useState(null);
    const [selectedComics, setComics] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }
    const onComicsSelected = (id) => {
        setComics(id)
    }
    return (
        <>
            <ComicsList onComicsSelected={onComicsSelected} onCharSelected={onCharSelected}/>
        </>
    );
};

export default ComicsPage;