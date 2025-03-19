export interface PlaidContextType {
  data: Balance[] | null;
  linkToken: string | null;
  getBalance: () => void;
  createLinkToken: () => void;
  handleSuccess: (success) => void;
}

export interface LinkCreateResponseType {
  expiration: string;
  link_token: string;
  request_id: string;
}

export interface AccessTokenCreateResponseType {
  access_token: string;
  item_id: string;
  request_id: string;
}

interface Balance {
  available: number;
  current: number;
  iso_currency_code: string;
  unofficial_currency_code: string | null;
}

interface Account {
  account_id: string;
  balances: Balance[];
  mask: string;
  name: string;
  official_name: string;
  persistent_account_id: string;
  subtype: string;
  type: string;
}

interface Item {
  available_products: string[];
  billed_products: string[];
  consent_expiration_time: null | string;
  error: null | string;
  institution_id: string;
  item_id: string;
  products: string[];
  update_type: string;
  webhook: string;
}

interface GetBalanceResponseType {
  accounts: Account[];
  item: Item;
  request_id: string;
}

export interface PlaidProviderProps {
  children: React.ReactNode;
}
