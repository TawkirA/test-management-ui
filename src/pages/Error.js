import { Link } from 'react-router-dom';
import Wrapper from "../assets/wrappers/Error";

const Error = () => {
    return (
        <Wrapper className="full-page">
            <div>
                <h3>Ohh! Page not found</h3>
                <p>The page you are looking for does not exist.</p>
                <Link to='/'>Back home</Link>
            </div>
        </Wrapper>
    )
}

export default Error