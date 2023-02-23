import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/component/Input'
import { getRules } from 'src/utils/validate'
interface FormLogin {
	email: string
	password: string
}
function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormLogin>()
	const rules = useMemo(() => getRules(), [])
	const onSubmit = handleSubmit((data) => {
		console.log(data)
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
								rules={rules.email}
								placeholder="Email"
								type="email"
							/>
							<Input
								className="mt-2"
								name="password"
								register={register}
								errorMessage={errors.password?.message}
								rules={rules.password}
								placeholder="Password"
								type="password"
							/>
							<div className="mt-3">
								<button
									type="submit"
									className="w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600"
								>
									Đăng nhập
								</button>
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
