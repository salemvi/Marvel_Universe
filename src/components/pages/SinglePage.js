import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";


import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";


const SinglePage = ({Component, dataType}) => {
    const {comicId, charId} = useParams();
    const [data, setData] = useState(null);
    const { getComics, getCharacter, clearError, proccess, setProcess} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [comicId, charId])

    const updateData = () => {
        clearError();
        switch (dataType) {
            case 'comic':
                getComics(comicId).then(data => onDataLoaded(data))
                                  .then(() => setProcess('confirmed'))
                break;
            case 'character':
                getCharacter(charId).then(data => onDataLoaded(data))
                                    .then(() => setProcess('confirmed'))

                break;
            default: console.log("What's wrong...");
        }
    }
    const onDataLoaded = (data) => {
        setData(data);
    }
  
    return (
        <>
            <AppBanner/>
            {setContent(proccess, data, Component )}
        </>
    )
}
export default SinglePage;
