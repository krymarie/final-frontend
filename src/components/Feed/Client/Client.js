import React from 'react';

import Button from '../../Button/Button';
import './Client.css';

const client = props => (
  <article className="client">
    <header className="client__header">
      <h3 className="client__meta">
        Client added by {props.author} on {props.date}
      </h3>
      <h1 className="client__title">{props.title}</h1>
    </header>
    {/* <div className="client__image">
      <Image imageUrl={props.image} contain />
    </div>
    <div className="client__content">{props.content}</div> */}
    <div className="client_actions">
      <Button mode="flat" link={props.id}>
        View
      </Button>
      <Button mode="flat" onClick={props.onStartEdit}>
        Edit
      </Button>
      <Button mode="flat" design="danger" onClick={props.onDelete}>
        Delete
      </Button>
    </div>
  </article>
);

export default client;