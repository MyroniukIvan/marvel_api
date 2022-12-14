import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {error, loading, request, clearError} = useHttp();


    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=effa876b96010ffef1f12f2c5d7085d3";
    const _baseOffset = 210;


    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllCharacters = async (offset = _baseOffset, name = '') => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}${name ? `&name=${name}` : ''}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0])
    }
    /*https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=210&apikey=effa876b96010ffef1f12f2c5d7085d3*/
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 200)}...` : 'There is no description for this hero!',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }
    const _transformComics = (comics) => {
        return {
            url: comics.urls.url,
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {
        loading,
        error,
        getCharacter,
        getAllCharacters,
        clearError,
        getComic: getComic,
        getAllComics,
        getCharacterByName
    }
}

export default useMarvelService;