import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
            
    }
    onCharListLoaded = (charList) => {
        this.setState({
            charList: charList,
            loading: false
        })
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    

    render() {
        const {charList, loading, error} = this.state;

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? <View charList={charList} onCharSelected={this.props.onCharSelected}/> : null
            return (
                <div className="char__list">
                    {spinner}
                    {errorMessage}
                    {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
export default CharList;


const View = ({charList, onCharSelected}) => { //
    const items = charList.map((item) => {
        let imgStyle = {'objectFit': 'cover'};
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit': 'unset'}
        }
        return (
            <li className="char__item" key={item.id} onClick={() => onCharSelected(item.id)}>
                <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                <div className="char__name">{item.name}</div>
            </li>
        )
        
    });
    return (
        <ul className='char__grid'>
            {items}
        </ul>
    )

}