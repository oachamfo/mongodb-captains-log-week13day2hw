const React = require("react");

class Show extends React.Component {
  createdOn() {
    //stringify MongoDb time stamp object and return human readable date
    const createdAtMonth = JSON.stringify(
      this.props.log.createdAt.getMonth() + 1
    );
    const createdAtDay = JSON.stringify(this.props.log.createdAt.getDate());
    const createdAtYear = JSON.stringify(
      this.props.log.createdAt.getFullYear()
    );
    const createdAt = createdAtMonth + "/" + createdAtDay + "/" + createdAtYear;
    return createdAt;
  }

  updatedOn() {
    //stringify MongoDb time stamp object and return human readable date
    const updatedAtMonth = JSON.stringify(
      this.props.log.updatedAt.getMonth() + 1
    );
    const updatedAtDay = JSON.stringify(this.props.log.updatedAt.getDate());
    const updatedAtYear = JSON.stringify(
      this.props.log.updatedAt.getFullYear()
    );
    const updatedAt = updatedAtMonth + "/" + updatedAtDay + "/" + updatedAtYear;
    return updatedAt;
  }

  render() {
    return (
      <div>
        <nav>
          <h1>
            <a href="/logs/">Logs Homepage</a>
          </h1>
        </nav>
        <h2>Log show page</h2>
        <h1>{this.props.log.title}</h1>
        <h2>
          {this.props.log.shipIsBroken
            ? `The ship is broken.`
            : `The ship is not broken.`}
        </h2>
        <br></br>
        <p>{this.props.log.entry}</p>
        <br></br>
        <p>created on: {this.createdOn()}</p>
        <p>updated on: {this.updatedOn()}</p>
      </div>
    );
  }
}
module.exports = Show;
