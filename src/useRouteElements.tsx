import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile/Profile'
import { AppContext } from 'src/contexts/app.context'
import { useContext } from 'react'

function ProtectedRoute() {
	const { isAuthenticated } = useContext(AppContext)
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
function RejectedRoute() {
	const { isAuthenticated } = useContext(AppContext)
	return !isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
function useRouteElements() {
	const routeElements = useRoutes([
		{
			path: '',
			element: <RejectedRoute />,
			children: [
				{
					path: '/login',
					element: (
						<RegisterLayout>
							<Login />
						</RegisterLayout>
					)
				},
				{
					path: '/register',
					element: (
						<RegisterLayout>
							<Register />
						</RegisterLayout>
					)
				}
			]
		},

		{
			path: '',
			element: <ProtectedRoute />,
			children: [
				{
					path: 'profile',
					element: (
						<MainLayout>
							<Profile />
						</MainLayout>
					)
				}
			]
		},
		{
			path: '',
			index: true,
			element: (
				<MainLayout>
					<ProductList />
				</MainLayout>
			)
		}
	])
	return routeElements
}

export default useRouteElements
