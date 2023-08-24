import { useState, useEffect } from 'react';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';

const RandomChar = () => {
    
    const [char, setChar] = useState({});
    const {getCharacter, clearError, proccess, setProcess} = useMarvelService();


    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);
        return () => [
            clearInterval(timerId)
        ]
    }, [])

    //создаем новое свойство внутри класса (будто this.marvelService)

    const onCharLoaded = (char) => {
        //name, desr, url и т.д
        setChar(() => char);

    }
    //метод, который обновляет рандомного персонажа
    const updateChar = () => {
        clearError();
        //задаем id
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        //обращаемся и this.marvelService

        //обращаемся к методу свойства, чтобы получить 1 персонажа
            getCharacter(id)
            //обрабатываем результат для получения корректной информации
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }


        return (
            <div className="randomchar">
                {setContent(proccess, char, View)}
                
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data
    let imgStyleRandomImg = {'objectFit': 'cover'}
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyleRandomImg = {'objectFit': 'contain'}
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className='randomchar__img' style={imgStyleRandomImg}/>
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