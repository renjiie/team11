import React from 'react';
import gif from './assets/lead.gif';
import gif2 from './assets/celebrate.gif';

const Leaders = ({ totalTeamPts, teamObj, show }) => {
	return (
		show && (
			<div className='lead-container'>
				<div className='leading-team'>
					<div className='leading-title'>
						Best Team Performance: 🔥 {totalTeamPts[0].teams}
					</div>
					<img className='lead-gif-lb' src={gif} alt='Leading...' />;
				</div>
				<div className='leading-team'>
					<div className='leading-title'>
						Best Individual Performance: 🔥 {Object.keys(teamObj)[0]}
					</div>
					<img className='lead-gif-lb' src={gif2} alt='Leading...' />;
				</div>
			</div>
		)
	);
};

export default Leaders;
