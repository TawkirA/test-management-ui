import { useState } from "react";
import Calendar from 'react-calendar';
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert } from "../../components";
import { DISPLAY_ALERT } from "../../context/actions";
import { useAppContext } from "../../context/appContext";

const AddTest = () => {
    const { addTest, showAlert, displayAlert } = useAppContext();

    const [inputFields, setInputFields] = useState([
        { qText: '', marks: 0}
    ])
    const [titleFields, setTitleFields] = useState({ subject: '', chapters: '', examDt: '', totalMarks: 0 });

    const handleTitleChange = (event) => {
        let data = {...titleFields}
        data[event.target.name] = event.target.value;
        setTitleFields(data);
    }

    const handleInputChange = (index, event) => {
        let data = [...inputFields];                 
        data[index][event.target.name] = event.target.value;
        setInputFields(data);        
    }

    const addNewField = (event) => {
        event.preventDefault();
        calcTotalMarks();              
        let newField = { qText: '', marks: 0}
        setInputFields([...inputFields, newField])        
    }

    const calcTotalMarks = () => {
        let total = 0;
        inputFields.forEach(item => {
            total += parseInt(item.marks); 
        })
        titleFields['totalMarks'] = total;
        setTitleFields(titleFields);          
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (titleFields.subject === '' || titleFields.chapters === '' || titleFields.examDt === '' || inputFields.length < 2) {
            displayAlert();
            return;
        }
        calcTotalMarks();        
        const testInfo = { questions: inputFields, subject: titleFields.subject, chapters: titleFields.chapters, examDt: titleFields.examDt, totalMarks: titleFields.totalMarks }
        console.log(testInfo);
        addTest(testInfo);
    }

    return (
        <Wrapper>
            <form className="form">
                <h3>Add Test</h3>                
                {showAlert && <Alert />}
                <div className="form-center">
                <FormRow 
                        type="text"
                        name="subject"
                        labelText="Subject"
                        value={titleFields.subject}
                        handleChange={e => handleTitleChange(e)}                    
                />

                <FormRow 
                        type="text"
                        name="chapters"
                        labelText="Chapters"
                        value={titleFields.chapters}
                        handleChange={e => handleTitleChange(e)}                    
                />
            
                {/* <Calendar /> */}
                <FormRow 
                        type="calendar"
                        name="examDt"
                        labelText="Exam Date"
                        value={titleFields.examDt}
                        handleChange={e => handleTitleChange(e)}                    
                />
                </div>
                {inputFields.map((input, index) => {
                    return (<div key={index} className="question-container">
                        <FormRow 
                        type="text"
                        name="qText"
                        labelText={`Q${index+1}`}
                        value={input.qText}
                        handleChange={event => handleInputChange(index, event)}                    
                    />
                    <FormRow 
                        type="text"
                        name="marks"
                        labelText="Marks"
                        value={input.marks}
                        handleChange={event => handleInputChange(index, event)}                    
                    />
                    </div>)
                })}
                {/* <div className="form-center">
                    <FormRow 
                        type="text"
                        name="Question Test"                        
                    />
                </div> */}
                    <div className="btn-container">
                        <button className="btn clear-btn" disabled>Total Marks: {titleFields.totalMarks}</button>
                        <button className="btn" onClick={e => addNewField(e)}>Add more</button>
                        <button type="submit" className="btn" onClick={e => handleSubmit(e)}>submit</button>
                    </div>
                
            </form>
        </Wrapper>
    )
}

export default AddTest
