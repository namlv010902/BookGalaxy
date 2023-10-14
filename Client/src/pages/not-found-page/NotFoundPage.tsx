import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div style={{textAlign:"center",height:"500px",marginTop:"150px"}}>
      <img height={150} src="https://www.expertosdecomputadoras.com/wp-content/uploads/2011/12/como%20reiniciar%20un%20trabajo%20en%20unix%20sco.jpg" alt="" />
         <h1 style={{color:"#eb0303"}}> 404 - Not Found Page</h1>
      <p>The requested page does not exist.</p>
      <Link to="/" style={{textDecoration:"none",fontSize:"20px"}}>Go back to the homepage</Link>
    </div>
  )
}

export default NotFoundPage