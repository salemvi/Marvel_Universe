import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContent = (proccess, data, Component) => {
    switch(proccess) {
        case 'waiting':
            return  <Skeleton/>
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>
        case 'error':
            return <ErrorMessage/>
        default: new Error("What's wrong, please try it later")
    }
}
export default setContent;