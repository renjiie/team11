import React, { useState } from 'react';
import Login from './login';
// import { Spin } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';
import Leaderboard from './leaderboard';

// const antIcon = (
// 	<LoadingOutlined style={{ fontSize: '3rem', color: '#ccc' }} spin />
// );

const App = () => {
	const [userDetails, setUserDetails] = useState({
		phone: 0,
		otp: 0,
	});
	const [teamPoints, setTeamPoints] = useState([]);
	const [live, setLive] = useState(true);

	const handleTeamResults = ({ userDetails, teams, live }) => {
		setUserDetails(userDetails);
		setTeamPoints(teams);
		setLive(live);
		localStorage.setItem('userDetails', userDetails);
	};
	return (
		<div className='App'>
			{teamPoints && Object.keys(teamPoints).length > 0 ? (
				<Leaderboard
					live={live}
					userDetails={userDetails}
					teamPoints={teamPoints}
				/>
			) : (
				<Login handleTeamResults={handleTeamResults} />
			)}
		</div>
	);
};

export default App;
