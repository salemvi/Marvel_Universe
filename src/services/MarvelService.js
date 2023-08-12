
class MarvelService {
//fetch запрос по API
    // оптимизация кода
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    //API ключ
    _apiKey = 'apikey=fd9ca48e04ea5c0acc11af6c4579fcd4';

    //GET запрос на сервер
    getResource = async (url) => {
        let result = await fetch(url);
        //отлавливаем ошибку в случае ошибки и ловим любой статус, кроме 200
        if(!result.ok) {
            throw new Error(`Coult not fetch ${url}, status: ${result.status}`)
        }
        // получаем данные в формате json
        return await result.json();
    }
    //получаем 20 персонажей
    getAllCharacters = async () => {
        const result = await this.getResource(`${this._apiBase}characters?limit=9&offset=214&${this._apiKey}`);
        return result.data.results.map(item => this._transformCharacter(item));
    }
    //получаем персонажа по id
    getCharacter = async (id) => {
        const result = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(result.data.results[0])
    }
    
    
    _transformCharacter = (char) => {
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
        }
    }
}
export default MarvelService;