import reub from '../assets/reub.jpg';
import akm from '../assets/akm.jpg';
import suva from '../assets/suva.jpg';
import renj from '../assets/renj.jpg';
import dani from '../assets/dani.jpg';
import gopi from '../assets/gopi.jpg';
const images = {
	reub,
	akm,
	suva,
	renj,
	dani,
	gopi,
};

export const getImageByKey = (key) => {
	return images[key];
};
