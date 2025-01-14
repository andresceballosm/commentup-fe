import { mdiCashMinus, mdiCashPlus, mdiCreditCard, mdiReceipt } from '@mdi/js';
import React from 'react';
import { Transaction } from '../../interfaces';
import CardBox from './CardBox';
import IconRounded from './IconRounded';
import PillTag from './PillTag';

type Props = {
  transaction: Transaction;
};

const CardBoxTransaction = ({ transaction }: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const icon = {
    withdraw: mdiCashMinus,
    deposit: mdiCashPlus,
    invoice: mdiReceipt,
    payment: mdiCreditCard,
  }[transaction.type];

  // eslint-disable-next-line consistent-return
  const typeColor = () => {
    // eslint-disable-next-line default-case
    switch (transaction.type) {
      case 'withdraw':
        return 'danger';
      case 'deposit':
        return 'success';
      case 'invoice':
        return 'warning';
      case 'payment':
        return 'info';
    }
  };

  return (
    <CardBox className="mb-6 last:mb-0">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
          <IconRounded icon={icon} color={typeColor()} className="md:mr-6 mb-6 md:mb-0" />
          <div className="text-center space-y-1 md:text-left md:mr-6">
            <h4 className="text-xl">${transaction.amount}</h4>
            <p className="text-gray-500 dark:text-slate-400">
              <b>{transaction.date}</b> via {transaction.business}
            </p>
          </div>
        </div>
        <div className="text-center md:text-right space-y-2">
          <p className="text-sm text-gray-500">{transaction.name}</p>
          <div>
            <PillTag color={typeColor()} label={transaction.type} small />
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default CardBoxTransaction;
