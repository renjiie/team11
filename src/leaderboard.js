import React from 'react';
import { Table, Tabs } from 'antd';
import { columns, teamCombo, player_names } from './configs';

const { TabPane } = Tabs;

const Leaderboard = ({ userDetails, teamPoints }) => {
	const teamMap = {};
	for (let i = 0; i < teamPoints.length - 1; i += 4) {
		console.log('teamPoints[i]', teamPoints[i]);
		teamMap[player_names[teamPoints[i]]] = teamPoints[i + 2];
	}
	const totalTeamPoints = Object.values(teamCombo).map((el) => {
		return {
			teams: `${el[0].toUpperCase()} + ${el[1].toUpperCase()}`,
			points: parseFloat(teamMap[el[0]]) + parseFloat(teamMap[el[1]]),
		};
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
			<Tabs>
				<TabPane className='leaderboard-tab-title' tab='Leaderboard' key='1'>
					<Table
						className='leaderboard-table'
						columns={columns}
						dataSource={totalTeamPoints}
						pagination={false}
					/>
				</TabPane>
			</Tabs>
		</div>
	);
};

export default Leaderboard;
