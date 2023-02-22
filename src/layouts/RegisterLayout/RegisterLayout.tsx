import { ReactNode } from 'react'

interface Props {
	children?: ReactNode
}
function RegisterLayout({ children }: Props) {
	return (
		<div>
			RegisterLayout
			<div>{children}</div>
		</div>
	)
}

export default RegisterLayout
