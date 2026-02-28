export function Chatroom() {
  return (
    <>
      <main className="chatroom-wrapper">
        <aside className="sidebar">
          <ul className="user-list">
            <li>Bill</li>
            <li>Mary</li>
            <li>James</li>
            <li>Sue</li>
            <li>Larry</li>
            <li>Sarah</li>
            <li>Tom</li>
            <li>Jessica</li>
            <li>Peter</li>
            <li>Amy</li>
            <li>Derek</li>
            <li>Emily</li>
          </ul>
        </aside>
        <section className="chat-panel">
          <div className="chat-content">
            <ul className="message-list">
              <li className="message">
                <span className="username">Billionare</span>
                <span className="content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsum, quibusdam!
                </span>
              </li>
            </ul>
          </div>
          <footer className="chat-footer"></footer>
        </section>
      </main>
    </>
  );
}
