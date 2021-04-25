/* eslint-disable no-sequences */
const sortable = (obj) => {
	const sortObject = (o) => {
		let max = 0;
		for (let property in o) {
			max = max < parseFloat(property) ? parseFloat(property) : max;
		}
		const maxObj = {};
		maxObj[max] = o[max];
		return maxObj;
	};

	const obj2 = {};
	Object.keys(obj).map((el) => {
		if (obj2[obj[el][2]]) {
			obj2[obj[el][2]] = [...obj2[obj[el][2]], obj[el][0], obj[el][1]];
		} else {
			obj2[obj[el][2]] = [obj[el][0], obj[el][1]];
		}
		return null;
	});
	const sortObj = sortObject(obj2);
	return sortObj;
};
export const getKeyByValue = (object, value) => {
	return Object.keys(object).find((key) => object[key] === value);
};
export const findWinner = (team, points) => {
	const teamObj = {};
	Object.values(team).map(
		(el, index) =>
			(teamObj[index] = [el[0], el[1], points[el[0]] + points[el[1]]])
	);
	const sort = sortable(teamObj);
	return sort;
};
export const findWins = (data) => {
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
			Object.values(findWinner(el.team, el.points))[0].map((player) => {
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
	stats.totalPoints = mergePoints(pointsArr);
	return stats;
};
