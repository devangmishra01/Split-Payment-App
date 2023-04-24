import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Finalise from './components/Finalise';
import UseNow from './components/UseNow';
import AboutUs from './components/AboutUs';
import AddTransactions from './components/AddTransactions';
import Expense from './cover/expense';
import {splitwise} from './utils/splitwise';

const App = () => {
  const [name, setName] = useState('');
  const [allNames, setAllNames] = useState([]);
  const [payer, setPayer] = useState('Choose Payer');
  const [payee, setPayee] = useState('Choose Payee');
  const [amount, setAmount] = useState('');
  const [allTransactions, setAllTransactions] = useState([]);
  const [finalTransactions, setFinalTransactions] = useState([]);
  const [outputList, setOutputList] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [flag, setFlag] = useState(true);
  const [graphData, setGraphData] = useState({});


   const resetState = () => {
    setName('');
    setAllNames([]);
    setPayer('Choose Payer');
    setPayee('Choose Payee');
    setAmount('');
    setAllTransactions([]);
    setFinalTransactions([]);
    setOutputList([]);
    setInputList([]);
    setFlag(true);
    setGraphData({});
  };

  const addParticipant = () => {
    setAllNames((previous) => [...previous, { name }]);
    setName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllTransactions((previous) => {
      return [...previous, { payer, payee, amount }];
    });
    setPayer('');
    setPayee('');
    setAmount('');
  };

  const splitwiseTransactions = () => {
    const input = [];
    for (let item of allTransactions) {
      input.push(new Expense(item.payer, item.payee, parseInt(item.amount)));
    }
    setInputList(input);
    const output = splitwise(input);
    setOutputList(output);
    setFinalTransactions(() =>
      output.map((x) => {
        return { payer: x.person1, payee: x.person2, amount: x.amount };
      })
    );
    setFlag(false);
    setGraphData(output);
  };

function App() {
  return (
   <Router>
      <Route exact path='/'>
        <HeroSection resetState={resetState}/>
      </Route>
      <Route exact path='/use-now'>
        <UseNowSection
          name={name}
          setName={setName}
          allNames={allNames}
          addParticipant={addParticipant}
        />
      </Route>
      <Route exact path='/about-us' component={AboutUs} />
      <Route exact path='/add-transactions'>
        <AddTransactions
          allNames={allNames}
          handleSubmit={handleSubmit}
          payer={payer}
          setPayer={setPayer}
          setPayee={setPayee}
          payee={payee}
          amount={amount}
          setAmount={setAmount}
          allTransactions={allTransactions}
          splitwiseTransactions={splitwiseTransactions}
          inputList={inputList}
          outputList={outputList}
          flag={flag}
          finalTransactions={finalTransactions}
          graphData={graphData}
        />
      </Route>
      </Router>
  );
}

export default App;
