const UserData = ({ users }) => {
  if (users.length === 0) return <h2>No data found. Please try with name.</h2>;
  return (
    <>
      <table>
        <thead>
          <th>id</th>
          <th>name</th>
          <th>username</th>
          <th>email</th>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UserData;
