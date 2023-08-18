import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        console.log('update');

    }, [props.charId])

    const updateChar = () => {
        if(!props.charId) {
            return;
        }
        

        onCharLoading();

        marvelService.getCharacter(props.charId)
            .then(onCharLoaded)
            .catch(onError)
    }

 

    const onCharLoaded = (char) => {

        setChar(() => char);
        setLoading(loading => false)
    }
    const onCharLoading = () => {

        setLoading(loading => true)
    }
    const onError = () => {

        setLoading(loading => false);
        setError(error => true);
    }
    

        
        const skeleton = char || error || loading ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null

        return (
            <div className="char__info">
                  {skeleton}
                  {errorMessage}
                  {spinner}
                  {content}  
            </div>
        )

}
CharInfo.propTypes = {
    charId: PropTypes.number
    
}

export default CharInfo;


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char


    
    let imgStyle = {'objectFit': 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'unset'}
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'This character has not appeared in the comic books'}
                {
                comics.map((item, index) => {
                return (
                    <li key={index} className="char__comics-item">
                        {item.name} 
                    </li>
                )
            })
                }
            </ul>
        </>
    )
}