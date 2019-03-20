import axios from 'axios'

const endpoint = 'http://127.0.0.1:8080'

export const summonerGetData = (summonerName) => {
  return axios.get(endpoint + '/summoner/' + summonerName)
}

export const summonerGetLastMatch = (summonerName) => {
  return axios
    .get(endpoint + '/match/lastMatchBySummonerName/' + summonerName)
    .then(r => r.data.data)
}

export const summonerUpdateLastMatch = (summonerName) => {
  return axios
    .get(endpoint + '/match/lastMatchBySummonerNameLoadMore/' + summonerName)
    .then(r => r.data.data)
}
