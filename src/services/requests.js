import axios from 'axios';

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
	postRequest,
	getRequest
}