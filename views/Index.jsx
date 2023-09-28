const React = require("react");
const DefaultLayout = require("./layouts/Default.jsx");

class Index extends React.Component {
  render() {
    const logs = this.props.logs;
    return (
      <DefaultLayout title={"Captain's Logs Index Page"}>
        <nav>
          <a href="/logs/new">Create a New Log</a>
        </nav>
        <ul>
          {this.props.logs.map((log, i) => {
            return (
              <li key={i}>
                <a href={`/logs/${log.id}`}>{log.title} </a>
                {log.shipIsBroken ? (
                  <span> The ship is broken.</span>
                ) : (
                  <span> The ship is not broken. </span>
                )}
                {/* Delete form down below*/}
                <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                  <input type="submit" value="DELETE" />
                </form>
                <a href={`/logs/${log._id}/edit`}>Edit This Log</a>
              </li>
            );
          })}
        </ul>
      </DefaultLayout>
    );
  }
}

module.exports = Index;
