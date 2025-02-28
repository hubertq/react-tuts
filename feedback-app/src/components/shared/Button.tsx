type ButtonPropsType = {
	children: React.ReactNode
	version?: string
	type?: 'submit' | 'reset' | 'button' | undefined
	isDisabled?: boolean
}
const Button = ({
	children,
	version = 'primary',
	type = 'button',
	isDisabled = false,
}: ButtonPropsType) => {
	return (
		<button
			type={type}
			disabled={isDisabled}
			className={`btn btn-${version}`}
		>
			{children}
		</button>
	)
}
export default Button
