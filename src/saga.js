import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import axios from 'axios'

const apiCall = async (text) => {
	let resp = await axios.get('https://yoda.p.mashape.com/yoda', {
		params: {
			sentence: "You will learn how to use sagas!"
		},
		headers: {
			'X-Mashape-Key': '#',
			"Accept": "text/plain"
		}
	})
	return resp;
}


function* fetchQuote(action) {
	try {
		const quote = yield apiCall(action);
		yield put({type: "QuoteFetchSucceeded@Saga", quote: quote});
	} catch (e) {
		yield put({type: "QuoteFetchFailed@Saga", message: e.message});
	}
}

function* mySaga() {
	yield takeLatest("QuoteFetchRequest@Saga", fetchQuote);
}

export default mySaga;
