const Content = ({contents})=> {
  if(contents.length ===0) return <p>No content found</p>
  return (
    <>
    {contents.map(value => <p key={value.id}>{value.name} : {value.exercises}</p>)}
    </>
  )
}
export default Content