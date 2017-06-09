import axios from 'axios';

// ------------ FETCH GMAIL ------------
function fetchingGmail() {
  return {
    type: 'FETCHING_Gmail'
  }
}

function GmailFetched(results) {
  return {
    type: 'Gmail_FETCHED',
    artists: results
  }
}

function fetchGmailError(fetchError) {
  return {
    type: 'FETCH_Gmail_ERROR',
    fetchFavoritesError: fetchError
  }
}

export function fetchGmail() {
  return (dispatch) => {
    dispatch(fetchingGmail());

    axios.get('/gmail')
    .then(results => {
      dispatch(GmailFetched(results.data));
      window.location = '/#/gmail';
    })
    .catch(error => {
      dispatch(fetchGmailError(error));
    });
  }
}
