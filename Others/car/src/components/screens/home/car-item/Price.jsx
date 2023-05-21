import React from 'react'
const Price = ({price}) => {
 return (
	<div>
		<p>
				{new Intl.NumberFormat('ru-RU', {
					style: 'currency',
					currency: 'USD',
				}).format(price)}
			</p>
	</div>
 )
}

export default React.memo(Price) 