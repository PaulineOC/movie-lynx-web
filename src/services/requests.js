import axios from 'axios';

const config = {
	headers: {
		'Access-Control-Allow-Origin': '*',
		crossdomain: true,
	}
};

async function searchActors(queryString){
	let url = (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://movie-lynx-backend.herokuapp.com') + '/searchActor';
	let body = { 
		actor: queryString
	}; 
	
	axios.post(url, body, config).then((res) =>{
		console.log(res.data.results);
		return res.data.results;
	}).catch((err) =>{
		console.log(err);
		return err;
	});
}




async function postRequest(url, params, config){
	axios.post(url, params, config).then((res)=>{
		console.log(res);
		return res;
	}).catch((err)=>{
		console.log(err);
		return err;
	});
}

async function getRequest(url, params, config){
	axios.get(url, params, config)
	.then((res)=>{
		console.log(res);
		return res;
	})
	.catch((err)=>{
		console.log(err);
		return err;
	});
}

export {
	searchActors,
	postRequest,
	getRequest
}