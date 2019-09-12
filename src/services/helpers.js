import axios from 'axios';

const config = {
	headers: {
		'Access-Control-Allow-Origin': '*',
		crossdomain: true,
	}
};
const baseApiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://movie-lynx-backend.herokuapp.com';

async function searchActors(queryString){
	const response = await axios.post(`${baseApiUrl}/searchActor`, {actor: queryString}, config);
	return response.data.results;
}

async function searchMovies(queryString){
	const response = await axios.post(`${baseApiUrl}/searchMovie`, {movie: queryString}, config);
	return response.data.results;
}

export {
	searchActors,
	searchMovies,
}