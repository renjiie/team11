const sortable = (obj) => {
	const sortObj = Object.entries(obj)
		.sort(([, a], [, b]) => b - a)
		.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
	return sortObj;
};
export const getKeyByValue = (object, value) => {
	return Object.keys(object).find((key) => object[key] === value);
};
export const findWinner = (team, points) => {
	// console.log('-----------LOG MATCH ID---------------', id);
	const teamObj = {};
	Object.values(team).map(
		(el) => (teamObj[`${el[0]} & ${el[1]}`] = points[el[0]] + points[el[1]])
	);
	const sort = sortable(teamObj);
	return sort;
};
export const findWins = (data) => {
	// console.log('-----------LOG MATCH ID---------------', id);
	const stats = {
		solo: {},
		totalPoints: {},
		duo: {},
	};
	const pointsArr = [];
	data.map((el) => {
		if (!el.live) {
			pointsArr.push(el.points);
			if (stats.solo[el.winner]) {
				stats.solo[el.winner] = stats.solo[el.winner] + 1;
			} else {
				stats.solo[el.winner] = 1;
			}
			Object.keys(findWinner(el.team, el.points))[0]
				.replace(/\s/g, '')
				.split('&')
				.map((player) => {
					if (stats.duo[player]) {
						stats.duo[player] = stats.duo[player] + 1;
					} else {
						stats.duo[player] = 1;
					}
					return null;
				});
		}
		return null;
	});

	const mergePoints = (data) => {
		const result = {};
		data.forEach((point) => {
			for (let [key, value] of Object.entries(point)) {
				if (result[key]) {
					result[key] += value;
				} else {
					result[key] = value;
				}
			}
		});
		return result;
	};
	stats.totalPoints = sortable(mergePoints(pointsArr));
	stats.solo = sortable(stats.solo);
	stats.duo = sortable(stats.duo);
	return stats;
};
