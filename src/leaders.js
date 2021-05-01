import React from 'react';
import gif from './assets/lead.webp';
import gif2 from './assets/celebrate.webp';

const Leaders = ({ totalTeamPts, winner, show }) => {
	return (
		show && (
			<div className='lead-container'>
				<div className='leading-team'>
					<div className='leading-title'>
						Best Team Performance: 🔥 {totalTeamPts[0].teams}
					</div>
					<img alt='team-lead-gif' className='lead-gif-lb' src={gif} />
				</div>
				<div className='leading-team'>
					<div className='leading-title'>
						Best Individual Performance: 🔥 {winner}
					</div>
					<img alt='individual-lead-gif' className='lead-gif-lb' src={gif2} />
				</div>
			</div>
		)
	);
};

export default Leaders;
