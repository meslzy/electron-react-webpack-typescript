import React from "react";

class App extends React.Component<any, any> {
  state = {};

  render() {
    return (
      <React.Fragment>
        <span>hello, this app in {window.dev ? "development" : "production"} mode</span>
      </React.Fragment>
    );
  }
}

export default App;
