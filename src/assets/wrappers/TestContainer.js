import styled from 'styled-components'

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .tests {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    .test-header {
        color: #2cb1bc;
        h4 {
        text-align: center;
        margin-bottom: 0.5rem;
        text-decoration: underline;
    }
    }
    
  }
  .question-label {
    display: inline-block;
    width: 100%;
    margin-bottom: 0;
  }
  .question-cont {
    margin: 0 0.5rem;
    /* box-shadow: 1px 1px 2px; */
    padding: 0.5rem;
    border-bottom: 0.5px solid var(--primary-700);
  }
  @media (min-width: 992px) {
    .tests {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0rem;
      
      .test-header {
        color: #2cb1bc;
        text-align: center;
        max-width: 100%;
        h4 {        
        margin-bottom: 0.5rem;
        text-decoration: underline;
      }
      }
      
    }
  }
`
export default Wrapper