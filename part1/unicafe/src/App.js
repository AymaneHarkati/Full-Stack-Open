import { useState } from 'react'

const Button = ({handleClick, name}) => <button onClick={handleClick}>{name}</button> 
const Display = ({value, name}) =>  {

return <tr><td>{name} {value}</td></tr>
}
const Statistics = ({good, bad, neutral}) => {
    const total = bad + good + neutral
   if(total===0)
        return <p>No FeedBack Given</p>
    return(
    <>
    <table>
      <tbody>
        <Display value={good} name="Good"/>
        <Display value={neutral} name="Neutral"/>
        <Display value={bad} name="Bad"/>
        <Display value={total} name="Total"/>
        <Display value={(good-bad) /total} name="Average"/>
        <Display value={((good) /total)*100} name="Positive"/>

      </tbody>
    </table>
    
   
    
    
    </>

    )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const goodScore = () => setGood(good +1);
  const neutralScore = () => setNeutral(neutral +1);
  const badScore = () => setBad(bad +1);
  return (
    <div>
      <h1>Give FeedBack</h1>
      <Button handleClick={goodScore} name="good"/>
      <Button handleClick={neutralScore} name="neutral"/>
      <Button handleClick={badScore} name="bad"/>
      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App