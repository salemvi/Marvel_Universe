import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';


const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, proccess, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();

    }, [props.charId])

    const updateChar = () => {
        if(!props.charId) {
            return;
        }
        clearError();
        
        getCharacter(props.charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(() => char);
    }   
        //

        // // 
        // const skeleton = char || error || loading ? null : <Skeleton/>
        // const errorMessage = error ? <ErrorMessage/> : null;
        // const spinner = loading ? <Spinner/> : null;
        // const content = !(loading || error || !char) ? <View char={char}/> : null

        return (
            <div className="char__info">
                 {setContent(proccess, char, View)}
            </div>
        )
}
CharInfo.propTypes = {
    charId: PropTypes.number
    
}
export default CharInfo;


const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data


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
                    const comicId = item.resourceURI.match(/\d{3,5}/g)
                return (
                    <Link to={`/comics/${comicId}`} key={index} className="char__comics-item">
                        {item.name} 
                    </Link>
                )
            })
                }
            </ul>
        </>
    )
}