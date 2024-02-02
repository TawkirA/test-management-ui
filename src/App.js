import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Register, Error } from './pages';
import { AddTest, AllTest, AddPost, Posts, TestDetails, ProtectedRoutes, SharedLayout } from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <SharedLayout />
          </ProtectedRoutes>
        }>
          <Route index element={<AllTest />} />
          <Route path="test/:id" element={<TestDetails />} />
          <Route path="add-test" element={<AddTest />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="posts" element={<Posts />} />
        </Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
