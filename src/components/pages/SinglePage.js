import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";


const SinglePage = ({Component, dataType}) => {
    const {comicId, charId} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComics, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [comicId, charId])

    const updateData = () => {
        clearError();
        switch (dataType) {
            case 'comic':
                getComics(comicId).then(data => onDataLoaded(data));
                break;
            case 'character':
                getCharacter(charId).then(data => onDataLoaded(data));
                break;
            default: console.log('Whats wrong');
        }
    }
    const onDataLoaded = (data) => {
        setData(data);
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}
export default SinglePage;
