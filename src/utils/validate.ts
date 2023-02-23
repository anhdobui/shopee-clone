import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
	email: {
		required: {
			value: true,
			message: 'Email là trường bắt buộc'
		},
		pattern: {
			value: /^\S+@\S+\.\S+$/,
			message: 'Email không đúng định dạng'
		},
		maxLength: {
			value: 160,
			message: 'Độ dài không quá 160 kí tự'
		},
		minLength: {
			value: 6,
			message: 'Độ dài tối thiểu là 5 kí tự'
		}
	},
	password: {
		required: {
			value: true,
			message: 'Nhập lại password là trường bắt buộc'
		},
		maxLength: {
			value: 160,
			message: 'Độ dài không quá 160 kí tự'
		},
		minLength: {
			value: 6,
			message: 'Độ dài tối thiểu là 6 kí tự'
		}
	},
	confirm_password: {
		required: {
			value: true,
			message: 'Nhập lại password là trường bắt buộc'
		},
		maxLength: {
			value: 160,
			message: 'Độ dài không quá 160 kí tự'
		},
		minLength: {
			value: 6,
			message: 'Độ dài tối thiểu là 6 kí tự'
		},
		validate:
			typeof getValues === 'function'
				? (value) => getValues('password') === value || 'Mật khẩu nhập lại không chính xác'
				: undefined
	}
})
