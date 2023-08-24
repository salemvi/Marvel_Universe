import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const setContent = (procces, Component, newItemLoading) => {
    switch(procces) {
        case 'waiting':
            return  <Spinner/>
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
            break;
        case 'confirmed':
            return <Component/>
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default: new Error("What's wrong, please try it later")
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(15);
    const [comicsEnded, setComicsEnded] = useState(false)

    const {getAllComics, proccess, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(charEnded => ended)
    }
    function renderItems(arr) {
        const items = arr.map((item, i) => {
           return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
           )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }


    return (
        <div className="comics__list">
                {setContent(proccess, () => renderItems(comicsList), newItemLoading )}

                <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
    )
}
export default ComicsList;