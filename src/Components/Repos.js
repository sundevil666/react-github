export const Repos = ({repos}) => (
  <>
    {repos.map(repo => (
      <div className="card mb-3" key={repo.id}>{repo.name}</div>
    ))}
  </>
)
