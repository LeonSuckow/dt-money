import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    for (let index = 0; index < 7; index++) {
      server.create("transaction",
      {
        id: index.toString(),
        title: `Title transaction ${index}`,
        amount: 350,
        type: index > 5 ? 'deposit': 'withdraw',
        category: `Category ${index}`,
      })
    }
   


  },
  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);