import { useContext } from 'react';
import { Search } from '../Components/Search';
import { Card } from '../Components/Card';
import { GitHubContext } from '../context/gitHub/gitHubContext';

export const Home = () => {
  const {loading, users} = useContext(GitHubContext)
  return (
    <>
      <h1>Home page</h1>
      <Search />
      <div className="row">
        {
          loading
          ? <div>Loading ...</div>
          : users.map((user, i) => {
            return (
              <div className="col-4 mb-4" key={user.id}>
                <Card user={user} />
              </div>
            )
          })
        }
      </div>
    </>
  )
}
