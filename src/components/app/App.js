import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import Skeleton from '../skeleton/Skeleton';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import bgVision from '../../resources/img/vision.png';

class App extends Component {
  state = {
    selectedChar: null
  }
  onCharSelected = (id) => {
    this.setState ({
      selectedChar: id
    })
  }


  render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
        <ErrorBoundary>
          <RandomChar/>
        </ErrorBoundary>
        
          <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={this.onCharSelected}/>
          </ErrorBoundary>

            <ErrorBoundary>
            <CharInfo charId={this.state.selectedChar}/>
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={bgVision}alt="vision"/>
        </main>
      </div>
    );
  }
}



export default App;
