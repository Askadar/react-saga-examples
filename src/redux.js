const initialState = {
    quote: '',
    appState: 'init',
    reqText: '',
    typing: false
}

export const types = {
    'textUpdate': 'RequestTextUpdated@Front',
    'request': 'QuoteFetchRequest@Front',
    // 'typingStarted': 'TypingStarted@Front',
    'typingStopped': 'TypingStopped@Front',
    'success': 'QuoteFetchSucceeded@Saga',
    'fail': 'QuoteFetchFailed@Saga',
    'typingStart': 'TypingStart@Saga',
    'typingEnd': 'TypingStop@Saga',
    'spellchecked': 'QuoteSpellcheckSucceeded@Saga',
    'statusChange': 'AppLoadingStatusChanged@Saga',
}
const { textUpdate, success, fail, spellchecked, statusChange, typingStart, typingEnd } = types;

export default (state = initialState, action) => {
    switch (action.type) {
        case typingStart:
        return {...state, typing: true};
        case typingEnd:
        return {...state, typing: false};
        case statusChange:
        return { ...state, appState: action.newState };
        case textUpdate:
        return { ...state, reqText: action.text };
        case success:
        return {...state, quote: Math.random() > 0.5 ? action.quote : action.spellcheckData.suggestion}
        case spellchecked:
            let results = action.results
        return {...state, quote: results.suggestion}
        case fail:
        return state
        default:
        return state
    }
}
