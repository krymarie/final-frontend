import React, { Component } from "react";

import "./PhoneBook.css";

class PhoneBook extends Component {
  state = {
    name: "Mary Jane",
    phone: "801-555-5555",
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
        <h2>Phone Book</h2>
        <h3>Name/Phone:</h3>
        {/* TODO: add logic here to look thru all clients and populate */}
        <p>Name: {this.state.name}</p>
        <p>Phone: {this.state.phone}</p>
        <br />
        <p>Name: {this.state.name}</p>
        <p>Phone: {this.state.phone}</p>
        <br />
        <p>Name: {this.state.name}</p>
        <p>Phone: {this.state.phone}</p>
        <br />
        <p>Name: {this.state.name}</p>
        <p>Phone: {this.state.phone}</p>
        <br />
        <p>Name: {this.state.name}</p>
        <p>Phone: {this.state.phone}</p>
        <br />
        <p>Name: {this.state.name}</p>
        <p>Phone: {this.state.phone}</p>
        <br />
        <p>Name: {this.state.name}</p>
        <p>Phone: {this.state.phone}</p>
      </section>
    );
  }
}

export default PhoneBook;
