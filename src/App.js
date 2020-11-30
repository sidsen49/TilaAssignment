import './App.css';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Store';
import TableGenerator from './Components/TableGenerator';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="*" component={TableGenerator} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
