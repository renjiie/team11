import React, { useState } from 'react';
import Login from './login';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Leaderboard from './leaderboard';

const antIcon = (
	<LoadingOutlined style={{ fontSize: '3rem', color: '#ccc' }} spin />
);

const App = () => {
	const [loading, setLoading] = useState(false);
	const [userDetails, setUserDetails] = useState({
		phone: 0,
		otp: 0,
	});
	const [teamPoints, setTeamPoints] = useState([]);

	const handleTeamResults = ({ userDetails, teams }) => {
		setUserDetails(userDetails);
		setTeamPoints(teams);
	};
	return loading ? (
		<div className='spinner-component'>
			<Spin indicator={antIcon} />
		</div>
	) : (
		<div className='App'>
			{teamPoints.length > 0 ? (
				<Leaderboard userDetails={userDetails} teamPoints={teamPoints} />
			) : (
				<Login handleTeamResults={handleTeamResults} />
			)}
		</div>
	);
};

export default App;
