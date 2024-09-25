import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
  const isAuthed = localStorage.getItem("token");
return (
    isAuthed ? <Outlet/> : <Navigate to='/login'/>
  )
}
export default PrivateRoutes;