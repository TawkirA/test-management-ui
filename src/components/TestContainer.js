import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/TestContainer";
import { useEffect } from "react";
import Test from './Test.js';


const TestContainer = () => {
    const { getTests, tests } = useAppContext();

    useEffect(() => {
        getTests()
    }, [])

    return <Wrapper>
        <div className="tests">            
            {tests.map(test => {                    
                    return <Test key={test._id} subject={test.subject} chapters={test.chapters} examDt={test.examDt} id={test._id} />
                })}
        </div>            
        {/* <Test testInfo={tests} /> */}
    </Wrapper>
}

export default TestContainer