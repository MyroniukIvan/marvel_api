import './charList.scss';
import {useEffect, useRef, useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";
import useMarvelService from "../../services/UseMarvelService";


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)

    }


    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length > 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList].slice(-9));
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }


    const itemRefs = useRef([]);


    const focusOnItem = () => {
            itemRefs.current.forEach(element => {
                itemRefs.current.classList.remove("char__item_selected")
                itemRefs.current.classList.add("char__item_selected")

            }
        )
    }




    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}

                    onClick={() => {
                        props.onCharSelected(item.id)
                        focusOnItem(i)
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
