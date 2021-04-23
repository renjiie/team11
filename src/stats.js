import React from 'react';
import { Table } from 'antd';
import { findWins } from './utils';
const Stats = ({ data }) => {
	const totalPointsData = [];
	const totalPointsCols = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Total Points',
			dataIndex: 'points',
			key: 'points',
			sorter: (a, b) => a.points - b.points,
		},
		{
			title: 'Solo Wins',
			dataIndex: 'soloWins',
			key: 'soloWins',
			render: (text, row, index) => {
				if (text) {
					return text;
				} else {
					row.soloWins = 0;
					return 0;
				}
			},
			sorter: (a, b) => a.soloWins - b.soloWins,
		},
		{
			title: 'Duo Wins',
			dataIndex: 'duoWins',
			key: 'duoWins',
			sorter: (a, b) => a.duoWins - b.duoWins,
		},
	];
	const statistics = findWins(data);
	Object.keys(statistics.totalPoints).length > 0 &&
		Object.keys(statistics.solo).length > 0 &&
		Object.keys(statistics.duo).length > 0 &&
		Object.keys(statistics.totalPoints).map((el) =>
			totalPointsData.push({
				key: el,
				name: el,
				points: statistics.totalPoints[el],
				soloWins: statistics.solo[el],
				duoWins: statistics.duo[el],
			})
		);
	return (
		<React.Fragment>
			<Table dataSource={totalPointsData} columns={totalPointsCols} />
		</React.Fragment>
	);
};

export default Stats;
