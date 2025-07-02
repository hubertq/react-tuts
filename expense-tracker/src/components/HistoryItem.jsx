const HistoryItem = ({ transaction }) => {
	const { description, amount, type } = transaction

	return (
		<div
			className={`history-item-wrapper ${
				type === 'expense' ? 'negative' : 'positive'
			}`}
		>
			<span>{description}</span>
			<span>
				{type === 'expense' ? '-' : ''}
				{Number(amount).toLocaleString('en')}
			</span>
		</div>
	)
}
export default HistoryItem
