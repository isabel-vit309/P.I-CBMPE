import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "./Context/ContextRevisao"; // Import your FormProvider
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { List } from "./Pages/List";
import { NewOccurrence } from "./Pages/NewOccurrence";
import { Profile } from "./Pages/Profile";
import { Register } from "./Pages/Register";
import { Settings } from "./Pages/Settings";
import { StepTwo } from "./Pages/NewOccurrence/Step2";
import { StepThree } from "./Pages/NewOccurrence/Step3";
import { StepFour } from "./Pages/NewOccurrence/Step4";
import { StepFive } from "./Pages/NewOccurrence/Step5";
import { RegisterUser } from "./Pages/RegisterUser";
import { ListUsers } from "./Pages/ListUsers";

function App() {
  return (
    <BrowserRouter>
      <FormProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/listusers" element={<ListUsers />} />
          <Route path="/registeruser" element={<RegisterUser />} />
          <Route path="/new-occurrence" element={<NewOccurrence />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/steptwo" element={<StepTwo />} />
          <Route path="/stepthree" element={<StepThree />} />
          <Route path="/stepfour" element={<StepFour />} />
          <Route path="/stepfive" element={<StepFive />} />
          <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
        </Routes>
      </FormProvider>
    </BrowserRouter>
  );
}

export default App;
