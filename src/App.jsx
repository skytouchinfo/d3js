import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DemoChart from './components/DemoChart'
import PieChart from './components/PieChart'

function App() {
  const [data, setData] = useState([
    {
      "year": 2014,
      "value": 10
    },
    {
      "year": 2015,
      "value": 30
    },
    {
      "year": 2016,
      "value": 50
    },
    {
      "year": 2017,
      "value": 70
    },
    {
      "year": 2018,
      "value": 30
    },
    {
      "year": 2019,
      "value": 60
    },
    {
      "year": 2020,
      "value": 70
    }
  ]);

  return (
    <>
      <DemoChart />
      {/* <PieChart data={data} /> */}
    </>
  )
}

export default App
