interface NEP9 {
  address: string;
  assetId?: string;
  amount?: number;
  transactionAttributes?: TransactionAttributes;
}

enum NEP9Key {
  assetId = 'assetId',
  amount = 'amount',
  transactionAttributes = 'transactionAttributes',
}

export enum Asset {
  NEO = 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
  GAS = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7',
}

interface TransactionAttributes {
  ecdh02?: string;
  ecdh03?: string;
  contractHash?: string;
  script?: string;
  vote?: string;
  certUrl?: string;
  descriptionUrl?: string;
  description?: string;
  hash1?: string;
  hash2?: string;
  hash3?: string;
  hash4?: string;
  hash5?: string;
  hash6?: string;
  hash7?: string;
  hash8?: string;
  hash9?: string;
  hash10?: string;
  hash11?: string;
  hash12?: string;
  hash13?: string;
  hash14?: string;
  hash15?: string;
  remark1?: string;
  remark2?: string;
  remark3?: string;
  remark4?: string;
  remark5?: string;
  remark6?: string;
  remark7?: string;
  remark8?: string;
  remark9?: string;
  remark10?: string;
  remark11?: string;
  remark12?: string;
  remark13?: string;
  remark14?: string;
  remark15?: string;
}

enum TransactionAttributeKey {
  ecdh02 = 'ecdh02',
  ecdh03 = 'ecdh03',
  contractHash = 'contractHash',
  script = 'script',
  vote = 'vote',
  certUrl = 'certUrl',
  descriptionUrl = 'descriptionUrl',
  description = 'description',
  hash1 = 'hash1',
  hash2 = 'hash2',
  hash3 = 'hash3',
  hash4 = 'hash4',
  hash5 = 'hash5',
  hash6 = 'hash6',
  hash7 = 'hash7',
  hash8 = 'hash8',
  hash9 = 'hash9',
  hash10 = 'hash10',
  hash11 = 'hash11',
  hash12 = 'hash12',
  hash13 = 'hash13',
  hash14 = 'hash14',
  hash15 = 'hash15',
  remark1 = 'remark1',
  remark2 = 'remark2',
  remark3 = 'remark3',
  remark4 = 'remark4',
  remark5 = 'remark5',
  remark6 = 'remark6',
  remark7 = 'remark7',
  remark8 = 'remark8',
  remark9 = 'remark9',
  remark10 = 'remark10',
  remark11 = 'remark11',
  remark12 = 'remark12',
  remark13 = 'remark13',
  remark14 = 'remark14',
  remark15 = 'remark15',
}

export {
  NEP9,
  NEP9Key,
  TransactionAttributes,
  TransactionAttributeKey,
};
