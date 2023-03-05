import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/component/Input'
import { LoginSchema, loginSchema } from 'src/utils/validate'
import { useMutation } from '@tanstack/react-query'
import { login } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from './../../component/Button/Button'
type FormLogin = LoginSchema
function Login() {
	const navigate = useNavigate()
	const { setIsAuthenticated } = useContext(AppContext)
	const {
		register,
		setError,
		handleSubmit,
		formState: { errors }
	} = useForm<FormLogin>({
		resolver: yupResolver(loginSchema)
	})
	const loginMutation = useMutation({
		mutationFn: (body: FormLogin) => login(body)
	})
	const onSubmit = handleSubmit((data) => {
		loginMutation.mutate(data, {
			onSuccess: () => {
				setIsAuthenticated(true)
				navigate('/')
			},
			onError: (error) => {
				if (isAxiosUnprocessableEntity<ErrorResponse<FormLogin>>(error)) {
					const formError = error.response?.data.data
					if (formError) {
						Object.keys(formError).forEach((key) => {
							setError(key as keyof FormLogin, {
								message: formError[key as keyof FormLogin],
								type: 'Server'
							})
						})
					}
				}
			}
		})
	})
	return (
		<div className="bg-orange">
			<div className="container">
				<div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
					<div className="lg:col-span-2 lg:col-start-4">
						<form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit} noValidate>
							<div className="text-2xl">Đăng nhập</div>
							<Input
								className="mt-8"
								name="email"
								register={register}
								errorMessage={errors.email?.message}
								placeholder="Email"
								type="email"
							/>
							<Input
								className="mt-2"
								name="password"
								register={register}
								errorMessage={errors.password?.message}
								placeholder="Password"
								type="password"
							/>
							<div className="mt-3">
								<Button
									type="submit"
									className="flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600"
									isLoading={loginMutation.isLoading}
									disabled={loginMutation.isLoading}
								>
									Đăng nhập
								</Button>
							</div>
							<div className="mt-8 flex items-center justify-center">
								<span className="text-gray-400">Bạn chưa có tài khoản?</span>
								<Link className="ml-1 text-red-400" to="/register">
									Đăng ký
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
