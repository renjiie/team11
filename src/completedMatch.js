import React from 'react';
import { Card, Avatar, Image } from 'antd';
import { findWinner } from './utils';
import { getImageByKey } from './utils/fetchImage';
const gridStyle = {
	width: '25%',
	textAlign: 'center',
};
const CompletedMatch = ({ data }) => (
	<div className='complete-match-container'>
		<div className='complete-flex-title'>
			<div className='match-name-title'> MATCH </div>
			<div className='match-combo-title'> TEAMS </div>
			<div className='match-team-winner-title'>TEAM WINNERS</div>
			<div className='match-winner-title'> MATCH WINNERS </div>
		</div>
		{data.map(
			(el) =>
				!el.live && (
					<div className='complete-flex'>
						<div className='match-name'>
							{el._id.trim().replace(/[0-9]/g, '')}
						</div>
						<div className='match-combo'>
							{Object.values(el.team).map((elArr, index) => (
								<div className='team-category-container'>
									<Card title={`T ${index + 1}`}>
										<Card.Grid style={gridStyle} className='card-grid-cont'>
											<div className='team-category'>
												<div className='cat-flex'>
													<div>{elArr[0]}</div>:{' '}
													<div>{el.points[elArr[0]]}</div>
												</div>
												<div className='cat-flex'>
													<div>{elArr[1]}</div>:{' '}
													<div>{el.points[elArr[1]]}</div>
												</div>
											</div>
										</Card.Grid>
									</Card>
								</div>
							))}
						</div>
						<div className='match-team-winner'>
							<div className='team-win-flex'>
								<Avatar.Group className='avatar-group-icons'>
									{findWinner(el.team, el.points) &&
										Object.values(
											findWinner(el.team, el.points)
										)[0].map((el) => (
											<Avatar
												src={
													<Image
														preview={false}
														src={getImageByKey(el)}
														alt='winner-img'
													/>
												}
											/>
										))}
								</Avatar.Group>
								<div>
									{Object.values(findWinner(el.team, el.points))[0].join(' & ')}
								</div>
								<div>{Object.keys(findWinner(el.team, el.points))[0]}</div>
							</div>
						</div>
						<div className='match-winner'>
							<div className='team-win-flex'>
								<div className='avatar-winner'>
									<Avatar
										src={
											<Image
												alt='winner-img'
												preview={false}
												src={getImageByKey(el.winner)}
											/>
										}
									/>
									{el.winner}
								</div>
								<div>{el.points[el.winner]}</div>
							</div>
						</div>
					</div>
				)
		)}
	</div>
);

export default CompletedMatch;
