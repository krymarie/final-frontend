import React, { Component } from "react";

import "./SingleClient.css";

class SingleClient extends Component {
  state = {
    newThisWeek: 2,
    newThisMonth: 28,
    newWeekAverage: 4,
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    const graphqlQuery = {
      query: `query FetchSingleClient($postId: ID!) {
          post(id: $postId) {
            title
            content
            phone
            interestLevel
            creator {
              name
            }
            createdAt
          }
        }
      `,
      variables: {
        postId: postId,
      },
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
          throw new Error("Fetching client failed!");
        }
        this.setState({
          title: resData.data.post.title,
          author: resData.data.post.creator.name,
          date: new Date(resData.data.post.createdAt).toLocaleDateString(
            "en-US"
          ),
          content: resData.data.post.content,
          phone: resData.data.post.phone,
          interestLevel: resData.data.post.interestLevel,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-client">
        <h2>Client Pipeline</h2>
        <h3>This Week:</h3>
        <p>New Clients: {this.state.newThisWeek}</p>
        <p>Weekly Average: {this.state.newWeekAverage}</p>
        <br />
        <h3>Last 30 Days:</h3>
        <p>New Clients: {this.state.newThisMonth}</p>
        <p>Average New Clients/week: 237</p>
        <br />git
        <h3>Totals:</h3>
        <p>Active Clients: 973</p>
        <p>Total Client: 4</p>
        <p>Closed Clients: 15</p>
      </section>
    );
  }
}

export default SingleClient;
