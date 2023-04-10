import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { increment, selectAllUsers } from './usersSlice'

export const UsersList = () => {
  const users = useSelector(selectAllUsers)

  const dispatch = useDispatch()

  const onStarClicked = (id) => {
    dispatch(increment({ id }))
  }

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
      <div>
        {user.star}&nbsp;&nbsp;&nbsp;
        <button
          onClick={() => {
            onStarClicked(user.id)
          }}
        >
          fan
        </button>
      </div>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}
