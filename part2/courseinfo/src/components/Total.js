const Total = ({contents})=> {
  if(contents.length ===0) return <p>No content found</p>
let total = contents.reduce((acc,value) => acc + value.exercises,0);
  return (
    <>
  <p><b>total of {total} exercices</b></p>
    </>
  )
}
export default Total