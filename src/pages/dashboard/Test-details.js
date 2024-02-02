import { useParams } from "react-router-dom"
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/TestContainer";

const TestDetails = () => {
    let { id } = useParams();    
    const {tests, getTestById} = useAppContext();    
    const testInfo = getTestById(tests, id);    
    return (
        <Wrapper>
            <div className="tests">
                <p className="test-header">
                    <h4>Subject: {testInfo.subject} </h4>
                    <h5>Chapters: {testInfo.chapters} </h5>
                    <h5>Examination Date: {testInfo.examDt} </h5>
                    <h5>Total Marks: {testInfo.totalMarks} </h5>
                </p> 
                
                {testInfo.questions.map((ques, index) => {                    
                    return <div className="question-cont" key={ques._id}>
                        <h5>Q{`${index+1}`}. <p className="question-label">{ques.qText}</p> [{ques.marks}]</h5>    
                    </div>
                })}
            </div> 
        </Wrapper>
    )
}

export default TestDetails