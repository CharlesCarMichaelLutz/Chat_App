import rabbitImage from "../images/rabbitchat.jpg";

const isSignUp = true;

export function Login() {
  return (
    <>
      <main className="login-container">
        <img src={rabbitImage} alt="Rabbit Chat Logo" />
        <section className="form-container">
          <form>
            <h3>Visit as guest</h3>
            <button type="submit">Enter</button>
          </form>
          {isSignUp ? (
            <form>
              <h3>Create Account</h3>
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="...enter username" required />
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="...enter password" required />
              <button type="submit">Sign Up</button>
            </form>
          ) : (
            <form>
              <h3>Login</h3>
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="Username" required />
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          )}
        </section>
      </main>
    </>
  );
}
