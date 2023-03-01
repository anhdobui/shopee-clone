import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const getRules = (
	getValues?: UseFormGetValues<{ email: string; password: string; confirm_password: string }>
): Rules => ({
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

export const schema = yup.object({
	email: yup
		.string()
		.required('Email là bắt buộc')
		.email('Email không đúng định dạng')
		.min(5, 'Độ dài tối thiểu là 5 kí tự')
		.max(160, 'Độ dài không quá 160 kí tự'),
	password: yup
		.string()
		.required('Password là bắt buộc')
		.min(6, 'Độ dài tối thiểu là 6 kí tự')
		.max(160, 'Độ dài không quá 160 kí tự'),
	confirm_password: yup
		.string()
		.required('Password là bắt buộc')
		.min(6, 'Độ dài tối thiểu là 6 kí tự')
		.max(160, 'Độ dài không quá 160 kí tự')
		.oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})
const loginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
