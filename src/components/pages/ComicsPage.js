import React, {useState} from 'react';
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

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
            <AppBanner/>
            <ComicsList onComicsSelected={onComicsSelected} onCharSelected={onCharSelected}/>
        </>
    );
};

export default ComicsPage;