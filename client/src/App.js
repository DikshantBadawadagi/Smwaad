import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./component/Home/Home.js";
import Practice from "./component/Practice/Practice";
import BeforeAfter from "./component/Practice/Before_After/Before_After";
import Sum from "./component/Practice/Sum/Sum";
import Test from "./component/Test/Test";
import store from "./redux/store";
import Form from "./component/Form/Form";
import TeachersPage from "./component/TeacherPage/TeacherPage";
import Login from "./component/Login/Login";
import ScoreBoard from "./component/Scorecard/Scorecard";
import GreaterSmaller from "./component/Practice/Greater_Smaller/Greater_Smaller";
import StudentData from "./component/StudentData/StudentData";
import Questions from "./component/Questions/Questions";
const App = () => {
  console.log("Ap here");
  return (
    <Provider store={store}>
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/exercises" exact element={<Practice />} />
        <Route path="/bf_af" exact element={<BeforeAfter />} />
        <Route path='/gr_sm' exact element={<GreaterSmaller/>}/>
        <Route path="/sum" exact element={<Sum/>}/>
        <Route path="/test" exact element={<Test />} />
        <Route path="/form" exact element={<Form/>}/>
        <Route path="/teacher" exact element={<TeachersPage/>}/>
        <Route path="/login" exact element={<Login />} />
        <Route path='/scorecard' exact element={<ScoreBoard/>}/>
        <Route path='/dashboard' exact element={<StudentData/>}/>
        <Route path="/questions" exact element={<Questions/>}/>
               {/* <Route path="/practice" exact element={<Practice />} />
        <Route path="/test" exact element={<Test />} />
        <Route path="/sum_test" exact element={<Test />} />
        <Route path="/greater_test" exact element={<Greater_test />} />
        <Route path="/form" exact element={<Form />} />
        <Route path="/exercises" exact element={<Exercises />} />
        <Route path="/test_page" exact element={<StudentLogin />} /> */}
      </Routes>
    </BrowserRouter>
     </Provider>
  );
};
export default App;