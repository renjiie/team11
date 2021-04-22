import React, { useEffect, useState, useRef } from 'react';
import { Table, Tabs, Avatar, Image } from 'antd';
import { columns } from './configs';
import { message } from 'antd';
import { getImageByKey } from './utils/fetchImage';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Leaders from './leaders';
import CompletedMatch from './completedMatch';

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
	const leadRef = useRef();
	const [loading, setLoading] = useState(true);
	const [totalMatches, setTotalMatches] = useState([]);
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
					totalMatches.length === 0 &&
						setTotalMatches(results.message.completedTeams);
					setLoading(false);
				} else {
					setLoading(false);
					error();
				}
			})
			.catch((err) => {
				setLoading(false);
			});
	}, [totalMatches]);
	const currentMatch = [];
	totalMatches.length > 0 &&
		[...totalMatches].map((el) => el.live && currentMatch.push(el));

	const livePoints =
		currentMatch.length > 0
			? Object.values(currentMatch[0].team).map((valArr) => {
					return {
						teams: (
							<div className='table-cell-avatar'>
								<Avatar.Group>
									<Avatar
										src={
											<Image
												src={getImageByKey(valArr[0])}
												preview={{
													src: getImageByKey(valArr[0]),
												}}
											/>
										}
									/>
									<Avatar
										src={
											<Image
												src={getImageByKey(valArr[1])}
												preview={{
													src: getImageByKey(valArr[1]),
												}}
											/>
										}
									/>
								</Avatar.Group>
								<div ref={leadRef} className='team-name-cell'>
									{valArr[0]} & {valArr[1]}
								</div>
							</div>
						),
						points:
							parseFloat(currentMatch[0].points[valArr[0]]) +
							parseFloat(currentMatch[0].points[valArr[1]]),
					};
			  })
			: [];
	const totalTeamPts =
		currentMatch.length > 0
			? Object.values(currentMatch[0].team).map((el) => {
					return {
						teams: `${el[0]} & ${el[1]}`,
						points:
							parseFloat(currentMatch[0].points[el[0]]) +
							parseFloat(currentMatch[0].points[el[1]]),
					};
			  })
			: {};

	ranking(livePoints);
	ranking(totalTeamPts);
	return (
		<div className='leaderboard-container'>
			<div className='leaderboard-title'>
				{(currentMatch.length > 0 &&
					currentMatch[0]._id.trim().replace(/[0-9]/g, '')) ||
					'CONTEST DETAILS'}
			</div>
			{loading ? (
				<Spin indicator={antIcon} />
			) : totalMatches.length > 0 ? (
				<React.Fragment>
					<Tabs
						className='leaderboard-tabs'
						defaultActiveKey={currentMatch.length > 0 ? 'Live' : 'Completed'}>
						<TabPane className='leaderboard-tab-title' tab='Live' key='Live'>
							<Table
								className='leaderboard-table'
								columns={columns}
								dataSource={livePoints}
								pagination={false}
							/>
							<Leaders
								show={currentMatch.length > 0}
								totalTeamPts={totalTeamPts}
								winner={currentMatch.length > 0 && currentMatch[0].winner}
							/>
						</TabPane>
						<TabPane
							className='leaderboard-tab-title'
							tab='Completed'
							key='Completed'>
							<CompletedMatch data={totalMatches} />
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
