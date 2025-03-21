import Home from "./components/Home";

import Input_detials from './components/Input_details.jsx'
import Survey from './components/Survey.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Result from './components/result.jsx'
import {  Routes, Route, HashRouter } from 'react-router-dom'
import ProtectedRoute from "./utils/PortectedRoute.jsx";
import RacePlanner from "./components/RacePlnner.jsx";
import MarathonSuccessPlan from "./components/MarathonSuccessPlan.jsx";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal_information" element={<Input_detials />} />
            <Route element={<ProtectedRoute />} >
              <Route path="/survey" element={<Survey />} />
              <Route path="/result" element={<Result />} />

            </Route>
            <Route path="/race_planner" element={<RacePlanner />} />
            <Route path="/marathon_success_plan" element={<MarathonSuccessPlan />} />

          </Routes>
        </HashRouter>
      </Provider>
    </div>
  );
};



export default App;

