import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {error, loading, request} = useHttp();


    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=effa876b96010ffef1f12f2c5d7085d3";
    const _baseOffset = 210;

    /*  https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=9&apikey=1293bfd8e76c4c5b27063fd959956341*/


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=20&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

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
    return {loading, error, getCharacter, getAllCharacters}
}

export default useMarvelService;