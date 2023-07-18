import { useEffect, useRef } from "react";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";
import { useCountUp } from 'react-countup';
import CountUpNumber from "../CountUpNumber";


export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }
    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  })


  let defaultValuesCountUp = {
    start: 0,
    duration: 1,
    end: 0,
    prefix: 'R$',
    decimals: 2,
    decimal: ',',
  }

  const { update: updateCountUpDeposits } = useCountUp({
    ...defaultValuesCountUp,
    ref: 'countUpDepositsRef',
  })

  const { update: updateCountUpWithdraw } = useCountUp({
    ...defaultValuesCountUp,
    ref: 'countUpWithdrawsRef',
    prefix: 'R$ -',
  })

  const { update: updateCountUpTotal } = useCountUp({
    ...defaultValuesCountUp,
    ref: 'countUpTotalRef',
  })

  useEffect(() => {
    updateCountUpDeposits(summary.deposits)
    updateCountUpWithdraw(summary.withdraws)
    updateCountUpTotal(summary.total)
  }, [summary])

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        {/* <CountUpNumber ref='countUpDepositsRef' end={summary.deposits}/> */}
        <strong id="countUpDepositsRef"></strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong id="countUpWithdrawsRef"></strong>
      </div>
      <div className={`${summary.total >= 0 ? `highlight-background-green` : `highlight-background-red`}`}>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong id="countUpTotalRef"></strong>
      </div>
    </Container >
  );
}