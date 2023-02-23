import { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props {
	className?: string
	type: React.HTMLInputTypeAttribute
	name: string
	placeholder?: string
	register: UseFormRegister<any>
	rules?: RegisterOptions
	errorMessage?: string
	autoComplete?: string
}
function Input({ className, name, register, type, placeholder, rules, errorMessage, autoComplete }: Props) {
	return (
		<div className={className}>
			<input
				type={type}
				autoComplete={autoComplete}
				className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm"
				placeholder={placeholder}
				{...register(name, rules)}
			/>
			<div className="mt-1 min-h-[1.25rem] text-sm text-red-600">{errorMessage}</div>
		</div>
	)
}

export default Input
