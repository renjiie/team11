export const columns = [
	{
		title: 'Teams',
		dataIndex: 'teams',
		width: '40%',
	},
	{
		title: 'Points',
		dataIndex: 'points',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.points - b.points,
		width: '25%',
	},
	{
		title: 'Position',
		dataIndex: 'rank',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.rank - b.rank,
		render: (text) => `#${text}`,
		width: '10%',
	},
];
export const player_names = {
	'Mighty Spearheads': 'reub',
	'Paavam XI': 'renj',
	'kaala Venghai': 'suva',
	PunkBW: 'gopi',
	'Aj team817KT': 'dani',
	SaidapetSuperkings: 'akm',
};
export const individualTeams = ['reub', 'gopi', 'akm', 'dani', 'renj', 'suva'];
