export interface Users {
  name: string;
  expenses: Expense[];
}
export interface Expense {
  expense: {
    currencies: Currencies;
    description: string;
    method: 'CREDIT CARD' | 'CASH' | 'DEBIT CARD';
    id: 1,
    currency: keyof Currencies ;
    type: 'FOOD' | 'HEALTH' | 'LEISURE';
    value: 12
  }
}
interface Currencies {
  [key: string]: {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
  },
}
export interface Filter {
  filter?: string;
  limit?:number;
}
