const initialState = {
    appliedJobCount: [],
    fetchGmailError: null
};

function gmail(state = initialState, action) {
  switch(action.type) {


    // ------------ FETCH ------------
    case 'FETCHING_Gmail':
      return {
        appliedJobCount: true
      }
    case 'Gmail_FETCHED':
      return {
        appliedJobCount: action.gmail
      }
    case 'FETCH_Gmail_ERROR':
      return {
        fetchGmailError: action.fetchError
      }
    default:
      return state;
  }
};

export default gmail;
