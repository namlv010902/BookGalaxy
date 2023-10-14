
import { Outlet } from 'react-router-dom'
import HeaderAD from '../components/admin/HeaderAD'
import Aside from '../components/admin/Aside'

const LayoutAD = () => {
  return (
    <div>
      
     <HeaderAD></HeaderAD>
   <div className="main" style={{marginTop:"80px",display:"flex"}}>
    <Aside></Aside>
    <div className="outlet"> <Outlet></Outlet></div> 
   </div>
    </div>
  )
}

export default LayoutAD
