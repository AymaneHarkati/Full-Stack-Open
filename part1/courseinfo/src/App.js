const Header = (props)=>{
  return (
<h1>{props.courseName}</h1>
  )
}
/*Exercice 1.1
const Content = (props)=>{
  return (
    <>
     <p>Name : {props.part1}, number of exercices : {props.exercises1}</p>
    <p>Name : {props.part2}, number of exercices : {props.exercises2}</p>
    <p>Name : {props.part3}, number of exercices : {props.exercises3}</p>
    </>
   
  )

}*/
const Part = (props)=>{
  return( 
    <p>Name : {props.name}, number of exercices : {props.number}</p>
  )
}
//Exercice 1.2
const Content = (props)=>{
  return (
    <>
     <Part name={props.parts[0].name} number={props.parts[0].exercises}/>
     <Part name={props.parts[0].name} number={props.parts[1].exercises}/>
     <Part name={props.parts[0].name} number={props.parts[0].exercises}/>
    </>
   
  )

}
const Total = (props)=>{
  console.log(props)
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header courseName={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App