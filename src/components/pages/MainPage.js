import { useState } from 'react';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import bgVision from '../../resources/img/vision.png';
import CharSearchForm from '../charSearchForm/CharSearchForm';
import { Helmet } from 'react-helmet';

const MainPage = () => {
    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
      setChar(id);
    }
    return (
        <>
        <Helmet>
            <meta
          name="Main page Marvel app"
          content="Marvel information portal"
          />
          <title>Marvel information portal</title>
      
        </Helmet>
            <ErrorBoundary>
              <RandomChar/>
            </ErrorBoundary>
          
            <div className="char__content">
              <ErrorBoundary>
                <CharList onCharSelected={onCharSelected}/>
              </ErrorBoundary>
                <div style={{position: 'sticky', top: '10px'}}>
                <ErrorBoundary>
                  <CharInfo charId={selectedChar}/>
                </ErrorBoundary>

                <ErrorBoundary>
                  <CharSearchForm/>
                </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={bgVision}alt="vision"/>

        </>
    )
}
export default MainPage