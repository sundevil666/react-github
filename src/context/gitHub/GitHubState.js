import React, { useReducer } from 'react';
import axios from 'axios';
import { GitHubContext } from './gitHubContext';
import { gitHubReducer } from './gitHubReducer';
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types';

const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET
const withCreds = url => {
  return `${url}client_id=${clientId}&client_secret=${clientSecret}`
}

export const GitHubState = ({children}) => {
  const initialState = {
    user: {},
    users: [],
    lading: false,
    repos: [],
  }
  const [state, dispatch] = useReducer(gitHubReducer, initialState)

  const search = async value => {
    setLoading()

    const res = await axios.get(
      withCreds(`https://api.github.com/search/users?q=${value}&`)
    )
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  }

  const getUser = async name => {
    setLoading()
    const res = await axios.get(
      withCreds(`https://api.github.com/users/${name}?`)
    )

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }

  const getRepos = async name => {
    setLoading()
    const res = await axios.get(
      withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`)
    )

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  }

  const clearUsers = () => dispatch({type: CLEAR_USERS})
  const setLoading = () => dispatch({type: SET_LOADING})
  const { user, users, repos, loading } = state
  return (
    <GitHubContext.Provider value={{search, setLoading, getUser, getRepos, clearUsers, users, user, repos, loading}}>
      {children}
    </GitHubContext.Provider>
  )
}
