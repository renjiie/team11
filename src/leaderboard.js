import React, { useEffect, useState, useRef } from 'react';
import { Table, Tabs, Avatar, Image } from 'antd';
import { columns, player_names } from './configs';
import { message } from 'antd';
import { getImageByKey } from './utils/fetchImage';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import wip from './assets/wip.jpg';
import Leaders from './leaders';
const antIcon = (
	<LoadingOutlined
		style={{ fontSize: '4rem', color: '#c51d23', margin: '20% 0' }}
		spin
	/>
);
const error = () => {
	message.error('Something went wrong! Please contact 9940616329');
};
const { TabPane } = Tabs;
const ranking = (totalTeam) => {
	Object.keys(totalTeam).length > 0 &&
		totalTeam.sort(function (a, b) {
			return b.points - a.points;
		});

	var rank = 1;
	for (let i = 0; i < totalTeam.length; i++) {
		// increase rank only if current score less than previous
		if (i > 0 && totalTeam[i].points < totalTeam[i - 1].points) {
			rank++;
		}

		totalTeam[i].rank = rank;
	}
};
const Leaderboard = () => {
	const [matchResults, setMatchResults] = useState({
		teamPoints: {},
		live: false,
		teamCombo: {},
		matchName: null,
	});
	const leadRef = useRef();
	const [loading, setLoading] = useState(true);
	const removeId = (dbteam) => {
		const teamRemoveId = {};
		Object.keys(dbteam).map(
			(el) => el !== '_id' && (teamRemoveId[el] = dbteam[el])
		);
		return teamRemoveId;
	};
	useEffect(() => {
		fetch(`https://team11-api.herokuapp.com/refresh`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'GET',
		})
			.then((response) => response.json())
			.then((results) => {
				if (results.status === 'success') {
					setMatchResults({
						teamPoints: results.message,
						live: results.live,
						teamCombo: removeId(results.Dbteam),
						matchName: results.Dbteam._id,
					});
					setLoading(false);
				} else {
					setLoading(false);
					error();
				}
			})
			.catch((err) => {
				setLoading(false);
			});
	}, []);
	const { teamPoints, live, teamCombo, matchName } = matchResults;

	const teamObj =
		Object.keys(teamPoints).length > 0
			? Object.fromEntries(
					Object.entries(teamPoints).sort(([, a], [, b]) => b - a)
			  )
			: {};

	const teamMap = {};
	Object.keys(teamPoints).length > 0 &&
		Object.keys(teamPoints).map((el) => {
			return (teamMap[player_names[el]] = teamPoints[el]);
		});
	const totalTeamPoints =
		Object.keys(teamMap).length > 0
			? Object.values(teamCombo).map((el) => {
					return {
						teams: (
							<div className='table-cell-avatar'>
								<Avatar.Group>
									<Avatar
										src={
											<Image
												src={getImageByKey(el[0])}
												preview={{
													src: getImageByKey(el[0]),
												}}
											/>
										}
									/>
									<Avatar
										src={
											<Image
												src={getImageByKey(el[1])}
												preview={{
													src: getImageByKey(el[1]),
												}}
											/>
										}
									/>
								</Avatar.Group>
								<div ref={leadRef} className='team-name-cell'>
									{el[0]} & {el[1]}
								</div>
							</div>
						),
						points: parseFloat(teamMap[el[0]]) + parseFloat(teamMap[el[1]]),
					};
			  })
			: {};
	const totalTeamPts =
		Object.keys(teamMap).length > 0
			? Object.values(teamCombo).map((el) => {
					return {
						teams: `${el[0]} & ${el[1]}`,
						points: parseFloat(teamMap[el[0]]) + parseFloat(teamMap[el[1]]),
					};
			  })
			: {};

	ranking(totalTeamPoints);
	ranking(totalTeamPts);
	const match = live ? 'Live' : 'Completed';
	console.log('LOG total team point', totalTeamPts);
	return (
		<div className='leaderboard-container'>
			<div className='leaderboard-title'>
				{(matchName && matchName.trim().replace(/[0-9]/g, '')) ||
					'CONTEST DETAILS'}
			</div>
			{loading ? (
				<Spin indicator={antIcon} />
			) : Object.keys(teamPoints).length > 0 ? (
				<React.Fragment>
					<Tabs className='leaderboard-tabs' defaultActiveKey={match}>
						<TabPane className='leaderboard-tab-title' tab='Live' key='Live'>
							<Table
								className='leaderboard-table'
								columns={columns}
								dataSource={live ? totalTeamPoints : []}
								pagination={false}
							/>
							<Leaders
								show={live}
								totalTeamPts={totalTeamPts}
								teamObj={teamObj}
							/>
						</TabPane>
						<TabPane
							className='leaderboard-tab-title'
							tab='Completed'
							key='Completed'>
							{/* <Table
								className='leaderboard-table'
								columns={columns}
								dataSource={totalTeamPoints}
								pagination={false}
							/> */}
							<Image src={wip} />
						</TabPane>
					</Tabs>
				</React.Fragment>
			) : (
				<div className='suva-db'>
					Data has to be provided by Suva. Please ask him nicely !!
				</div>
			)}
		</div>
	);
};

export default Leaderboard;
