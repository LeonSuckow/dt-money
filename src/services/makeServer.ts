import { createServer, Model, Server as MirageServer } from 'miragejs';

declare interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  category: string;
}

export default function makeServer(): MirageServer {
  return createServer({
    models: {
      transaction: Model.extend<Partial<Transaction>>({}),
    },

    seeds(server) {
      server.create("transaction",
      {
        "id": "f75e49b9-40de-40a6-82d6-0113e1b5b4c5",
        "title": "Pagamento Freelancer",
        "amount": 138,
        "type": "withdraw",
        "category": "Freelancer"
      })

      server.create("transaction",
      {
        "id": "503fa941-6c56-4ee3-bfb7-595fc1d97412",
        "title": "Consulta Médica",
        "amount": 376,
        "type": "deposit",
        "category": "Saúde"
      })
      server.create("transaction",
      {
        "id": "15b8991f-3e5e-4d61-81f7-5b2c9619ce52",
        "title": "Mensalidade Academia",
        "amount": 236.17654187829794,
        "type": "deposit",
        "category": "Academia"
      })
      server.create("transaction",
      {
        "id": "c2c8bc61-8c28-48b0-9703-bda74b043f85",
        "title": "Honorários Médicos",
        "amount": 235,
        "type": "deposit",
        "category": "Medico"
      })
      server.create("transaction",
      {
        "id": "754c4546-9e64-43a7-8f95-5b28e3841265",
        "title": "Tratamento Dentário",
        "amount": 377,
        "type": "withdraw",
        "category": "Dentista"
      })
    },

    routes() {
      this.namespace = 'api';
      // this.timing = 1000; 

      this.get('/transaction', (schema) => {
        return schema.all('transaction');
      });

      this.post('/transaction', (schema, request) => {
        const attrs = JSON.parse(request.requestBody) as Transaction;
        const transaction = schema.create('transaction', attrs);
        return transaction;
      });

      this.put('/transaction/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody) as Transaction;
        const transactionUpdated = schema.find('transaction', id);
        transactionUpdated?.update(attrs)
        return transactionUpdated;
      });

      this.delete('/transaction/:id', (schema, request) => {
        const id = request.params.id;
        const transactionDelete = schema.find('transaction', id);
        transactionDelete?.destroy();
        return transactionDelete;
      });
    },
  });
}
