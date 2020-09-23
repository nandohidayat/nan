import { v4 } from 'uuid'

export const state = () => ({
  cache: [],
  assets: [],
})

export const mutations = {
  SET_INITIAL(state) {
    if (localStorage.mobilelegends !== 'undefined') {
      const data = JSON.parse(localStorage.mobilelegends)
      state.assets = data
      state.cacheAssets = data.map((a) => ({ ...a }))
    }
  },
  SET_ASSETS(state, data) {
    state.assets = data
    localStorage.mobilelegends = JSON.stringify(state.assets)
  },
  SET_CACHE(state, data) {
    state.cache = data.map((a) => ({ ...a }))
  },
  ADD_ASSET(state, asset) {
    asset.id = v4()
    state.assets.push(asset)
    localStorage.mobilelegends = JSON.stringify(state.assets)
  },
  DEL_ASSET(state, id) {
    state.assets = state.assets.filter((a) => a.id !== id)
    localStorage.mobilelegends = JSON.stringify(state.assets)
  },
}

export const getters = {
  getAvg: (state) => {
    let sum = 0
    for (const a of state.assets) {
      sum += parseFloat(a.price) / parseFloat(a.diamond)
    }
    return sum
  },
}
