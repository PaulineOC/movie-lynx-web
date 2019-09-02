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

export {
	postRequest
}