import { useContext, useState } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { GitHubContext } from '../context/gitHub/gitHubContext';

export const Search = () => {
  const [value, setValue] = useState('')
  const alert = useContext(AlertContext)
  const github = useContext(GitHubContext)

  const onSubmit = (e) => {
    if(e.key !== 'Enter') {
      return
    }
    github.clearUsers()

    if(value.trim()) {
      alert.hide()
      github.search(value.trim())
    } else {
      alert.show('Enter date user')
    }
  }
  return (
    <>
      <div className="form-group mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="Enter user name..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyPress={onSubmit}
        />
      </div>
    </>
  )
}
