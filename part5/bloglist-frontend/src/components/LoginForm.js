import AddedBlog from "./AddedBlog";


const LoginForm = ({handleLogin, username, handleUsernameChange, password, handlePassChange, message, styleMsg, cancel}) => {

  return (
    <>
      <h1>Log-In </h1>
      <AddedBlog message={message} style={styleMsg} />
      <form onSubmit={handleLogin}>
        username:
        <input
        id="username"
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        password :
        <input
                id="password"

          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handlePassChange}
        />
        <br />
        <button id="log-in-button" type="submit">logIn</button>
      </form>
      <button type="submit" onClick={cancel}>cancel</button>

    </>
  );
}

export default LoginForm