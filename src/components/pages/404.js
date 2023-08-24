import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const Page404 = () => {
    return (
        
        <div>
            <Helmet>
            <meta
            name="404"
            content="Page not found"
            />
            </Helmet>
            <ErrorMessage/>
            <p style={{'textAlign': "center", 'fontWeight': 'bold', 'fontSize': '24px',}}>Page doesnt't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to='/'>Back to main page</Link>
        </div>
    )
}
export default Page404