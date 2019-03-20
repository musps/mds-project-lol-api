import axios from 'axios'

export const championGetList = () => {
  const path = '/static_content/json/champion.json'
  return axios(path)
    .then(r => Object.values(r.data.data))
    .then(r => {
      return r.map(c => ({
        key: c.key,
        name: c.name,
        image: c.image
      }))
    })
}
