import '../todos-list.scss';

interface CardItemProps {
	value: string;
	id: number;
	status: string;
	handleRemove: (id: number) => void;
	handleSetStatus: (id: number) => void;
}

function CardItem({value, status, handleRemove, id, handleSetStatus}: CardItemProps) {
	const combClass = `${status} flex-box`;
	const combColor = `${status === 'open' ? 'grey' : 'green'} circle`;

	return(
			<div className='card'>
				<div className={combClass} onClick={() => handleSetStatus(id)}>
					<div className='circle-box'>
						<div className={combColor}><div className={status === 'closed' ? 'check' : ''}></div></div>
					</div>
					<span>{value}</span>
				</div>
				<div className='button-box'>
					<button onClick={() => handleRemove(id)}>delete</button>
				</div>
			</div>
	)
}

export default CardItem;