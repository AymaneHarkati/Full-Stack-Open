import Header from './Header';
import Content from './Content';
import Total from './Total';


const Course = ({courses})=>{
  if(courses.length === 0) return <p>No courses found</p>
return (
  <>{courses.map(course => {
    return(
      <div key={course.id}>
       <Header name={course.name}/>
      <Content contents={course.parts}/>
      <Total contents={course.parts}/>
      </div>
    )
  })}
 
  </>
)
}
export default Course