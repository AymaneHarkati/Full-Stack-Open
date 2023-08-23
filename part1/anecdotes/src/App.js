import { useState } from 'react'
const Button = ({handleClick, name})=>{
  return <button onClick={handleClick}>{name}</button>
}
const Score = ({value})=>{
      return <p>this Quotes has a score of : {value ? value : 0}</p>
}
const Biggest = ({scores, listQuotes}) =>{
  if(scores.size === 0){
    return <p>No Quotes is Voted</p>
  }
    const sortedMap = new Map([...scores].sort((a, b) => b[1] - a[1]));
  const [firstKey, firstValue] = sortedMap.entries().next().value;

  return (<>
  <p>{listQuotes[firstKey]}</p>
  <p>{firstValue}</p>
  </>
  
  )
  
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  let [mapScore, setMapScore] = useState(new Map());
  const nextQuotes=()=>{
    let i = Math.floor(Math.random() * anecdotes.length)
    setSelected(i);
  }
  const voteQuote =(index)=>{
    const handler = () => {
      let newMap = new Map(mapScore);
      if(newMap.has(`${index}`)){
        setMapScore(newMap.set(`${index}`,newMap.get(`${index}`)+1));
      }else{
        setMapScore(newMap.set(`${index}`, 1))
      }
    }
    return handler
    
  }
  return (
    <div>
      {anecdotes[selected]}<br/>
      <Score value={mapScore.get(`${selected}`)}/>
      <Button handleClick={nextQuotes} name="Next Quotes"/>
      <Button handleClick={voteQuote(selected)}name={"vote"}/>
      <Biggest scores={mapScore} listQuotes={anecdotes}/>
    </div>
  )
}

export default App