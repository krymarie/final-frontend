import React, { Component } from "react";

import "./Pipeline.css";

class Pipeline extends Component {
  state = {
    newThisWeek: 2,
    newThisMonth: 28,
    newWeekAverage: 4,
    newMonthAverage: 4,
    totalClients: 43,
  };

  componentDidMount() {
    const graphqlQuery = {
      query: `query FetchingAllClients() {}`,
    };
    // fetch("http://localhost:5000/graphql", {
    fetch("http://localhost:4000/graphql'", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.errors) {
          throw new Error("Fetching clients failed!");
        }
        // TODO: clean up logic to
        // SELECT * FROM 'clients'
        // WHERE (date_field BETWEEN '{now}' AND '{now-30days}')
        this.setState({
          newThisWeek: new Date(
            resData.data.client.createdAt
          ).toLocaleDateString("en-US"),
          newWeekAverage: this.store.newThisMonth / 4,
          newMonthAverage:
            this.store.newLastThreeMonths / 3 ||
            "Not enough data to calculate yet, give it three months",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-client">
        <h2>Pipeline</h2>
        <h3>This Week:</h3>
        <p>New Clients: {this.state.newThisWeek}</p>
        <p>Weekly Average: {this.state.newWeekAverage}</p>
        <br />
        <h3>Last 30 Days:</h3>
        <p>New Clients: {this.state.newThisMonth}</p>
        <p>Monthly Average: {this.state.newMonthAverage}</p>
        <br />
        <h3>Totals:</h3>
        <p>Total Clients: {this.state.totalClients}</p>
        <p>Active Clients: Comming Soon</p>
        <p>Closed Clients: Comming Soon</p>
      </section>
    );
  }
}

export default Pipeline;
