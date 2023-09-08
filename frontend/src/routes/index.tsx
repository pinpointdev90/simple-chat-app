import { Navigate, RouteObject, useRoutes } from "react-router-dom"
import { LoginPage } from "../pages/auth/login"
import { useDispatch, useSelector } from "react-redux"
import { RegisterPage } from "../pages/auth/register"
import { HomePage } from "../pages/dashboard"
import { RoomPage } from "../pages/room"

type User = {
  id: number
}

const routes = (currentUser?: User): RouteObject[] => {
  return [
    {
      path: "/",
      element: currentUser?.id? <HomePage />: <Navigate to="/login" />,
    },
    {
      path: "/chats",
      element: currentUser?.id? <RoomPage />: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
  ]
}

export const Routes = () => {
  const currentUser = useSelector((state: any) => state.persists.user.currentUser)
  return useRoutes(routes(currentUser))
}