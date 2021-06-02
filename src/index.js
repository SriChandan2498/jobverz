import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import reportWebVitals from './reportWebVitals';

// const options = [{value : {amazonData}, label: 'Amazon'},
//                {value : {walmartData}, label: 'Walmart' },
//                {value : {exxonData}, label : 'Exxon Mobil'},
//                {value:{indeedData}, label: 'Indeed'},
//                {value : {mosnsterData}, label: 'Monster'}]

// var Data = []

// function HandleChange(selectedOption)
// {
// // { var dom = document.getElementById('root')
//   // console.log(dom)
//   // const [data, setData] = useState([]);
//   console.log(`Option selected:`, selectedOption);
//   Data = [...selectedOption[0].value]
//   // setData(selectedOption[0].value)
//   Data = [...data]
// }

// var getData = () => {return Data}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
