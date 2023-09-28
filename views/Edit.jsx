const React = require("react");

const DefaultLayout = require("./layouts/Default.jsx");

class Edit extends React.Component {
  render() {
    return (
      <DefaultLayout title="Edit Page">
        <nav>
          <h1>
            <a href="/logs/">Logs Homepage</a>
          </h1>
        </nav>
        {/* DefaultLayout takes in a prop called title. Up above, "Edit Page" is passed to the title prop.*/}
        {/* down below is the form*/}
        <form action={`/logs/${this.props.log._id}?_method=PUT`} method="POST">
          Title:{" "}
          <input type="text" name="title" defaultValue={this.props.log.title} />
          <br />
          Entry:{" "}
          <input type="text" name="entry" defaultValue={this.props.log.entry} />
          <br />
          Ship is Broken:
          {this.props.log.shipIsBroken ? (
            <input type="checkbox" name="shipIsBroken" defaultChecked />
          ) : (
            <input type="checkbox" name="shipIsBroken" />
          )}
          <br />
          <input type="submit" value="Submit Changes" />
        </form>
      </DefaultLayout>
    );
  }
}
module.exports = Edit;
