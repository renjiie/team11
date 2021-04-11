import React from 'react';
import { Table, Tabs } from 'antd';
import { columns, teamCombo, player_names } from './configs';
import gif from './assets/lead.gif';

const { TabPane } = Tabs;

const Leaderboard = ({ userDetails, teamPoints, live }) => {
	const teamMap = {};
	Object.keys(teamPoints).length > 0 &&
		Object.keys(teamPoints).map((el) => {
			return (teamMap[player_names[el]] = teamPoints[el]);
		});

	const totalTeamPoints = Object.values(teamCombo).map((el) => {
		return {
			teams: `${el[0]} + ${el[1]}`,
			points: parseFloat(teamMap[el[0]]) + parseFloat(teamMap[el[1]]),
		};
	});
	totalTeamPoints.sort(function (a, b) {
		return b.points - a.points;
	});
	var rank = 1;
	for (let i = 0; i < totalTeamPoints.length; i++) {
		// increase rank only if current score less than previous
		if (i > 0 && totalTeamPoints[i].points < totalTeamPoints[i - 1].points) {
			rank++;
		}

		totalTeamPoints[i].rank = rank;
	}
	return (
		<div className='leaderboard-container'>
			<div className='leaderboard-title'>CONTEST DETAILS</div>
			<Tabs className='leaderboard-tabs'>
				<TabPane
					className='leaderboard-tab-title'
					tab={live ? 'Live' : 'Completed'}
					key='1'>
					<Table
						className='leaderboard-table'
						columns={columns}
						dataSource={totalTeamPoints}
						pagination={false}
					/>
				</TabPane>
			</Tabs>
			<div className='leading-team'>
				<div className='leading-title'>
					🔥 {totalTeamPoints[0].teams.replaceAll('+', ' & ')}
				</div>
				<img src={gif} alt='Leading...' />;
			</div>
		</div>
	);
};

export default Leaderboard;
