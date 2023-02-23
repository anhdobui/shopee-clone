import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/component/Input'
import { getRules } from 'src/utils/validate'
interface FormData {
	email: string
	password: string
	confirm_password: string
}
function Register() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors }
	} = useForm<FormData>()
	const rules = useMemo(() => getRules(getValues), [getValues])
	const onSubmit = handleSubmit((data) => {
		console.log(data)
	})
	return (
		<div className="bg-orange">
			<div className="container">
				<div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
					<div className="lg:col-span-2 lg:col-start-4">
						<form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit} noValidate>
							<div className="text-2xl">Đăng ký</div>
							<Input
								className="mt-8"
								name="email"
								register={register}
								errorMessage={errors.email?.message}
								placeholder="Email"
								rules={rules.email}
								type="email"
							/>
							<Input
								className="mt-2"
								name="password"
								placeholder="Password"
								autoComplete="on"
								register={register}
								errorMessage={errors.password?.message}
								rules={rules.password}
								type="password"
							/>
							<Input
								className="mt-2"
								name="confirm_password"
								placeholder="Confirm password"
								register={register}
								errorMessage={errors.confirm_password?.message}
								rules={rules.confirm_password}
								type="password"
								autoComplete="on"
							/>
							<div className="mt-2">
								<button className="w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600">
									Đăng ký
								</button>
							</div>
							<div className="mt-8 flex items-center justify-center">
								<span className="text-gray-400">Bạn đã có tài khoản?</span>
								<Link className="ml-1 text-red-400" to="/login">
									Đăng nhập
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
