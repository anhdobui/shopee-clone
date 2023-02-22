import { ReactNode } from 'react'
import Footer from 'src/component/Footer'
import RegisterHeader from 'src/component/RegisterHeader'

interface Props {
	children?: ReactNode
}
function RegisterLayout({ children }: Props) {
	return (
		<div>
			<RegisterHeader />
			{children}
			<Footer />
		</div>
	)
}

export default RegisterLayout
