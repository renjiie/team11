export const getKeyByValue = (object, value) => {
	return Object.keys(object).find((key) => object[key] === value);
};
export const findWinner = (team, points, id) => {
	// console.log('-----------LOG MATCH ID---------------', id);
	const teamObj = {};
	Object.values(team).map(
		(el) => (teamObj[`${el[0]} & ${el[1]}`] = points[el[0]] + points[el[1]])
	);
	const sortable = Object.entries(teamObj)
		.sort(([, a], [, b]) => b - a)
		.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
	// console.log('LOGGING SORTED TEAm', sortable);
	return sortable;
};
