import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import Skeleton from '../skeleton/Skeleton';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';

import bgVision from '../../resources/img/vision.png';

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <RandomChar/>
        <div className="char__content">
          <CharList/>
          <CharInfo/>
        </div>
        <img className="bg-decoration" src={bgVision}alt="vision"/>
      </main>
    </div>
  );
}

export default App;
