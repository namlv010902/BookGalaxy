import { useStoreUser } from "../../../store/hooks"

const DashBroad = () => {
   const {user} = useStoreUser()
   ;
  return (
    <div style={{marginLeft:"50px"}}>
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7N_pwhgaZyXLc6YUzApcnvmoxTs6Ia_ozwQ&usqp=CAU" alt="" />
      <h2 style={{textAlign:"center"}} >Welcome {user.name} to the Administration!</h2>
    </div>
  )
}

export default DashBroad