export const columns = [
	{
		title: 'Teams',
		dataIndex: 'teams',
	},
	{
		title: 'Points',
		dataIndex: 'points',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.points - b.points,
	},
	{
		title: 'Position',
		dataIndex: 'rank',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.rank - b.rank,
		render: (text) => `#${text}`,
	},
];
export const player_names = {
	'Mighty Spearheads': 'reub',
	'Paavam XI': 'renj',
	'kaala Venghai': 'suva',
	GOPI5: 'gopi',
	'Aj team817KT': 'dani',
	SaidapetSuperkings: 'akm',
};
export const teamCombo = {
	t1: ['reub', 'gopi'],
	t2: ['akm', 'dani'],
	t3: ['renj', 'suva'],
};
