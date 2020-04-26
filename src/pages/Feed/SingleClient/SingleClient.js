import React, { Component } from "react";

import "./SingleClient.css";

class SingleClient extends Component {
  state = {
    name: "Mary Jane",
    content: "Buyer seems very interested but need space to decide.",
    phone: "801-555-5555",
    interestLevel: "3",
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
    fetch("http://localhost:8080/graphql", {
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
        <h2>Client Profile</h2>
        <h3>{this.state.name}</h3>
        <p>Details: {this.state.content}</p>
        <p>Phone: {this.state.phone}</p>
        <p>Interest Level: {this.state.interestLevel}</p>
      </section>
    );
  }
}

export default SingleClient;
