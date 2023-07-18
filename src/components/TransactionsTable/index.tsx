import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";
import { Trash2 } from 'react-feather'

export function TransactionsTable() {
  const { transactions, deleteTransaction } = useTransactions();
  const handleDeleteTransaction = (transactionId: number) => {
    deleteTransaction(transactionId)
  }
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.map((transaction) =>
          (<tr key={transaction.id}>
            <td>{transaction.title}</td>
            <td className={transaction.type}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(transaction.amount)}
            </td>
            <td>{transaction.category}</td>
            <td>
              {new Intl.DateTimeFormat('pt-BR').format(transaction.createdAt)}
            </td>
            <td width={85}>
              <button type="button" onClick={() => handleDeleteTransaction(transaction.id)}>
                <Trash2 size={20} className="delete-icon" />
              </button>
            </td>
          </tr>)
          )}

        </tbody>
      </table>
    </Container>
  );
}