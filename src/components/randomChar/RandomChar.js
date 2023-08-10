import { Component } from 'react';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
    //применяем конструктор, чтобы сразу при рендере у нас конструировался метод с рандомным персонажем
    constructor(props) {
        super(props);
        this.updateChar();
    }
    //145 урок получаем state без конструктора
    state = {
        //name, desr, url и т.д
        char: {},
        //для обработки svg загрузки и ошибки
        loading: true,   
    }

    //создаем новое свойство внутри класса (будто this.marvelService)
    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
                //name, desr, url и т.д
            char: char, 
            //для обработки svg загрузки и ошибки (иконка загрузки)
            loading: false,
            //отлов ошибки из-за отсутсвия id по герою
            error: false
        })
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })

    }

    //метод, который обновляет рандомного персонажа
    updateChar = () => {
        //задаем id
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        //обращаемся и this.marvelService
        this.marvelService
        //обращаемся к методу свойства, чтобы получить 1 персонажа
            .getCharacter(id)
            //обрабатываем результат для получения корректной информации
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

        render () {
            const {char, loading, error} = this.state

            const errorMessage = error ? <ErrorMessage/> : null;
            const spinner = loading ? <Spinner/> : null;
            const content = !(loading || error) ? <View char={char}/> : null;

            return (
                <div className="randomchar">
                   {errorMessage}
                   {spinner}
                   {content}
                    <div className="randomchar__static">
                        <p className="randomchar__title">
                            Random character for today!<br/>
                            Do you want to get to know him better?
                        </p>
                        <p className="randomchar__title">
                            Or choose another one
                        </p>
                        <button className="button button__main">
                            <div className="inner">try it</div>
                        </button>
                        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                    </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;