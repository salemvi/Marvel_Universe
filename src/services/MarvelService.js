import {useHttp} from '../hooks/http.hook';
const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();
//fetch запрос по API
    // оптимизация кода
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    //API ключ
    const _apiKey = 'apikey=fd9ca48e04ea5c0acc11af6c4579fcd4';
    const _baseOffsetChar = 210;
    

    //GET запрос на сервер
    
    //получаем 20 персонажей
    const getAllCharacters = async (offset = _baseOffsetChar) => {
        const result = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return result.data.results.map(item => _transformCharacter(item));
    }
    //получаем персонажа по id
    const getCharacter = async (id) => {
        const result = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(result.data.results[0]);
    }
    //получаем 8 комиксов
    const getAllComics = async (offset = 0) => {
        const result = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return result.data.results.map(item => _transformComics(item))
    }
    //получаем 1 комикс 
    const getComics = async (id) => {
        const result = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(result.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const result = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return result.data.results.map(_transformCharacter)
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ?
                       `${comics.pageCount} р.` :
                       'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || 'en-us', //?
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'NOT AVAILABLE',
        };
    };
    
    const _transformCharacter = (char) => {
        return {
            //меняем state, [0] потому что возвращается только 1 персонаж, к нему и обращаемся
            id: char.id,
            name: char.name,
            description: char.description ? char.description.slice(0, 175) + '...' :  'There is no information about this character yet',
            //картинка состоит из 2 полей, url и расширение, поэтому делаем конкатенацию , чтобы получить корректный путь
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.length <= 10 ? char.comics.items : char.comics.items.slice(0,10)
        };
    };
    return {loading, error, getAllCharacters, getCharacter, clearError, getComics, getAllComics, getCharacterByName}
}
export default useMarvelService;