import {call, all, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import { types } from './redux';
const { textUpdate, request, success, fail, spellchecked, statusChange } = types;

axios.defaults.headers['X-Mashape-Key'] = '#';
// unnecessary async and await, generator (saga?) handle promises for us
const requestYodified = (text) => {
	let resp = axios.get('https://yoda.p.mashape.com/yoda', {
		params: {
			sentence: text
		}
	})
	return resp;
}
const spellcheck = (text) => {
	console.log(text);
	let resp = axios.get(
		'https://montanaflynn-spellcheck.p.mashape.com/check/', {
			params: { text }
	})
	return resp;
}

function* fetchQuoteWhilSpellchecking(action) {
	try {
		yield put({type: statusChange, newState: 'loading'});
		const [quote, spellcheckedText] = yield all([
			call(requestYodified, action.text),
			call(spellcheck, action.text)
		]);

		yield put({type: success, quote: quote.data, spellcheckData: spellcheckedText.data});
		yield put({type: statusChange, newState: 'loaded'});
	} catch (e) {
		yield put({type: fail, message: e.message});
	}
}

function* fetchQuote(action) {
	try {
		yield put({type: statusChange, newState: 'loading'});
		const quote = (yield call(requestYodified, action.text)).data;
		const spellcheckedQuote = yield call(spellcheck, quote);

		yield put({type: success, quote: quote, spellcheckData: spellcheckedQuote.data});
		yield put({type: statusChange, newState: 'loaded'});
	} catch (e) {
		yield put({type: statusChange, newState: 'failed'});
		try {
			const spellcheckedQuote = yield call(spellcheck, action.text);
			yield put({type: spellchecked, results: spellcheckedQuote.data});
		}
		finally {
			yield put({type: fail, message: e.message});
		}
	}
}
function* spellcheckQuote(action) {
	try {
		const checkedText = yield call(spellcheck, action.text);
		const { original, suggestion, corrections } = checkedText.data;
		let correct = original === suggestion;
		if (!correct)
			yield put({type: 'NI'});
		// yield put({type: success, quote: quote.data});
	} catch (e) {
		// yield put({type: fail, message: e.message});
	}
}

function* rootSaga() {
	yield takeLatest(request, fetchQuoteWhilSpellchecking);
	// yield takeLatest(textUpdate, spellcheckQuote); //Futura references
}
export default rootSaga;
