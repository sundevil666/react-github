import { Link, useParams } from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {GitHubContext} from '../context/gitHub/gitHubContext';
import { Repos } from '../Components/Repos';

export const Profile = () => {
  const { name } = useParams();
  const { getUser, getRepos, loading, user, repos } = useContext(GitHubContext)

  useEffect(() => {
    getUser(name)
    getRepos(name)
  }, [])

  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Link to='/' className="btn btn-link">Go back</Link>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-3">
              <img src={user.avatar_url} alt={user.name}/>
              <h1>{user.name}</h1>
              {user.location && <p>Location {user.location}</p>}
            </div>
            <div className="col">
              {
                user.bio && <><h3>BIO</h3><p>{user.bio}</p></>
              }
              <a href={user.html_url} className="btn btn-dark">Open profile</a>
              <ul>
                {user.login && <li><strong>Login</strong>{user.login}</li>}
                {user.companny && <li><strong>Companny</strong>{user.companny}</li>}
                {user.blog && <li><strong>Website</strong>{user.blog}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Repos repos={repos} />
    </>
  )
}
