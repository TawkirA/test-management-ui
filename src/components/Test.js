import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Test';

const Test = ({ subject, chapters, examDt, id }) => {   
    return <Wrapper>
        <header>
                <div className='main-icon'>{subject.charAt(0)}</div>
                <div className='info'>                                        
                </div>
                <div className='content'>
                    <div className='content-center'>
                        <h5>Subject - {subject}</h5>
                        <h5>Examination Date - {examDt}</h5>
                        <p>Chapter(s): {chapters}</p>                    
                    </div>
                    <footer className='actions'>                        
                        <Link to={`/test/${id}`} className="btn edit-btn">View Details</Link>                        
                    </footer>
                </div> 
        </header>
    </Wrapper>
}

export default Test