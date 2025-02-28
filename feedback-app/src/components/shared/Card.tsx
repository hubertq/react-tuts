type CardProps = {
	children: React.ReactNode
	reverse?: boolean
}
const Card = ({ children, reverse = false }: CardProps) => {
	return (
		<div className={`card ${reverse && 'reverse'}`}>{children}</div>
	)
}
export default Card
