import './comicsList.scss';
import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/UseMarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";



const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {error, loading, getAllComics} = useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (comicsList.length > 9) {
            ended = true;
        }

        setComicsList([...comicsList, ...newComicsList].slice(-8));
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setComicsEnded(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }



    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'contain'};
            if (item.thumbnail === 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }
            return (
                <li key={item.id}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onComicsSelected(item.id)
                        focusOnItem(i)
                    }}
                    className="comics__item">
                    <a href={item.url}>
                        <img style={imgStyle}
                             src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>

            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )

    }



    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                style={{"display": comicsEnded ? "null" : "block"}}
                onClick={() => onRequest(offset)}
                    className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
ComicsList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default ComicsList;