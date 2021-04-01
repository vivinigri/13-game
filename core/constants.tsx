import React from 'react';
import {
  PersonalIcon,
  RestaurantIcon,
  SubscriptionsIcon,
  CreditCardIcon,
  AutomotiveIcon,
  HealthcareIcon,
  HomeImprovementIcon,
  GroceriesIcon,
  RecreationIcon,
  CharityIcon,
  GeneralMerchandiseIcon,
  ServicesIcon,
  CableIcon,
  ShippingIcon,
  InsuranceIcon,
  TravelIcon,
  OtherIncomeIcon,
  OfficeExpensesIcon,
  RetirementContributionsIcon,
  InvestmentIcon,
  OtherExpensesIcon,
  GiftsIcon,
  TransfersIcon,
  InterestIncomeIcon,
  DepositsIcon,
  RegularIncomeIcon,
  CheckPaymentIcon,
  UtilitiesIcon,
  SecurityTradesIcon,
  ATMIcon,
  MortgageIcon,
  EducationIcon,
  RefundsIcon,
  LoansIcon,
  PetCareIcon,
  RentIcon,
  ServiceChargesIcon,
  ServicesIncomeIcon,
  DefaultIcon,
  SavingsIcon,
  TaxesIcon,
  ReimbursementIcon,
  RewardsIcon,
} from '../assets/icons/categories';
import BankIcon from '../assets/icons/bank_icon';
import Savings from '../assets/icons/savings_icon';
import Investment from '../assets/icons/investment_icon';
import CardIcon from '../assets/icons/card_icon';
import PropertyIcon from '../assets/icons/property_icon';
import HeartIcon from '../assets/icons/heart_icon';
import ShieldIcon from '../assets/icons/shield_icon';
import { theme } from './theme';
import { SelectItem } from '../types';

export const MAX_VIEW_WIDTH = 500;

export const PIE_CHART_COLORS = [
  '#29A2FF',
  '#2E6B96',
  '#749DBB',
  '#A2C1D6',
  '#C9DDEC',
];

export const CASHFLOW_TYPES: SelectItem[] = [
  {
    id: 'flexible_spending',
    name: 'Flexible Spending',
    description: 'Flexible day-to-day',
  },
  {
    id: 'committed_expense',
    name: 'Committed Expenses',
    description: 'Recurring or essential',
  },
  {
    id: 'contribution',
    name: 'Savings Contribution',
    description: 'Set aside for future goals',
  },
  {
    id: 'goal_spending',
    name: 'Goal Spending',
    description: 'Something you’ve already planned/saved for',
  },
  // {
  //   id: 'reimbursable',
  //   name: 'Reimbursable',
  // },
  {
    id: 'transfer',
    name: 'Transfer/Distribution',
  },
  {
    id: 'reimbursement',
    name: 'Reimbursed',
  },
  {
    id: 'ignored',
    name: 'Ignored',
  },
];

export const ACCOUNTS_CATEGORIES: {
  [key: string]: {
    name: string;
    icon: React.ReactNode;
  };
} = {
  checking: { name: 'Checking', icon: <BankIcon /> },
  savings: { name: 'Savings', icon: <Savings /> },
  investment: { name: 'Investments', icon: <Investment /> },
  loan: { name: 'Loans', icon: <SavingsIcon /> },
  creditcard: { name: 'Credit Cards', icon: <CardIcon /> },
  property: { name: 'Real Estate', icon: <PropertyIcon /> },
  hsa: { name: 'Health Accounts', icon: <HeartIcon /> },
  insurance: { name: 'Insurance', icon: <ShieldIcon /> },
};

export const CATEGORY_ICON: { [key: string]: React.ReactNode } = {
  kV90tvjcihEp: <PersonalIcon />,
  kNat98wsGxXs: <RestaurantIcon />,
  kEWGtvJCr4sF: <SubscriptionsIcon />,
  kvCtnwkhVabz: <CreditCardIcon />,
  kriKL7RP0k7M: <AutomotiveIcon />,
  kLiHVcrEHiyM: <HealthcareIcon />,
  kbxqt8rn81D0: <HomeImprovementIcon />,
  knUMLJkpHU9t: <GroceriesIcon />,
  k7uDpBWDXn8z: <OtherExpensesIcon />,
  kx8PLrsHV0KY: <RecreationIcon />,
  kk2LY043tTma: <CharityIcon />,
  k2PniFiTj6qw: <GeneralMerchandiseIcon />,
  k6YrAHqJvetG: <ServicesIcon />,
  k8tJ1CzkCaNv: <CableIcon />,
  kbvscHwepEWL: <ShippingIcon />,
  ks3rnQFVgR0a: <InsuranceIcon />,
  kKxjkN970A0d: <TravelIcon />,
  ksFAnissMdEq: <OtherIncomeIcon />,
  kU2aCbdhHsMJ: <OfficeExpensesIcon />,
  kYvhzEQryisv: <GiftsIcon />,
  kktLHczQsKN2: <RetirementContributionsIcon />,
  ksPtp17tD47g: <InvestmentIcon />,
  km21nqL7qmkz: <TransfersIcon />,
  kWW4uWXUm57v: <InterestIncomeIcon />,
  kgpKeYGjmPB6: <DepositsIcon />,
  kVCWuELq45KK: <RegularIncomeIcon />,
  kN300xTXRj0L: <CheckPaymentIcon />,
  kLN07uexcA1a: <UtilitiesIcon />,
  kFfsBARHK3k6: <SecurityTradesIcon />,
  kev1XG2B7RKF: <ATMIcon />,
  kmydec3w0xky: <MortgageIcon />,
  kFHacKVRKJ3b: <EducationIcon />,
  kdkgFqmRWgqp: <RefundsIcon />,
  k2fGBxR3Gb7Q: <LoansIcon />,
  kpaa5vRL4sVR: <PetCareIcon />,
  kNDd5dUgnda2: <RentIcon />,
  kBKmxcsn2YaR: <ServiceChargesIcon />,
  kecsW7LiQinx: <ServicesIncomeIcon />,
  kEU8rtUMqjm0: <DefaultIcon />,
  kuJGkrMntT3s: <SavingsIcon />,
  k5e9VjdsWcvb: <TaxesIcon />,
  kJfXWXAp7UhX: <ReimbursementIcon />,
  kK6qQQXrtw4x: <RewardsIcon />,
  committed_expense: <MortgageIcon />,
  flexible_spending: <GroceriesIcon />,
  special_spending: <GeneralMerchandiseIcon />,
  contribution: <TaxesIcon />,
};

export const APP_ROUTE = [
  { key: 'home', title: 'Home', color: theme.colors.surface },
  { key: 'accounts', title: 'Accounts', color: theme.colors.surface },
  { key: 'cashflow', title: 'Cashflow', color: theme.colors.surface },
  { key: 'transactions', title: 'Transactions', color: theme.colors.surface },
];

export const EDIT_ACCOUNTS_TYPES = [
  {
    id: 'checking',
    name: 'Checking',
  },
  {
    id: 'savings',
    name: 'Savings',
  },
  {
    id: 'creditcard',
    name: 'Credit Card',
  },
  {
    id: 'frm',
    name: 'Mortgage',
  },
  {
    id: 'autoloan',
    name: 'Auto Loan',
  },
  {
    id: 'privatestudentloan',
    name: 'Private Student Loan',
  },
  {
    id: 'studentloan',
    name: 'Federal Student Loan',
  },
  {
    id: '401k',
    name: '401(k)',
  },
  {
    id: 'roth401k',
    name: 'Roth 401(k)',
  },
  {
    id: '403b',
    name: '403(b)',
  },
  {
    id: 'roth403b',
    name: 'Roth 403(b)',
  },
  {
    id: '457b',
    name: '457(b)',
  },
  {
    id: 'roth457b',
    name: 'Roth 457(b)',
  },
  {
    id: '529',
    name: '529 Plan',
  },
  {
    id: 'ira',
    name: 'IRA',
  },
  {
    id: 'rothira',
    name: 'Roth IRA',
  },
  {
    id: 'hsa',
    name: 'HSA',
  },
  {
    id: 'brokerage',
    name: 'Brokerage',
  },
  {
    id: '457f',
    name: '457(f)',
  },
  {
    id: '401a',
    name: '401(a)',
  },
  {
    id: 'simpleira',
    name: 'SIMPLE IRA',
  },
  {
    id: 'sepira',
    name: 'SEP IRA',
  },
  {
    id: 'sarsepira',
    name: 'SARSEP IRA',
  },
  {
    id: 'coverdell',
    name: 'Coverdell',
  },
  {
    id: 'otherqualified',
    name: 'Other Qualified',
  },
  {
    id: 'profitsharing',
    name: 'profit Sharing',
  },
  {
    id: 'moneypurchase',
    name: 'Money Purchase',
  },
  {
    id: 'homeequityloan',
    name: 'Home Equity Loan',
  },
  {
    id: 'termloan',
    name: 'Term Loan',
  },
  {
    id: 'termlife',
    name: 'Term Life Insurance',
  },
  {
    id: 'other',
    name: 'Other',
  },
];

export const EDIT_PROPERTY_TYPE = [
  {
    id: 'realestate',
    name: 'Real Estate',
  },
  {
    id: 'car',
    name: 'Car',
  },
];

export const AMERICAN_STATES = [
  {
    name: 'Alabama',
    id: 'AL',
  },
  {
    name: 'Alaska',
    id: 'AK',
  },
  {
    name: 'American Samoa',
    id: 'AS',
  },
  {
    name: 'Arizona',
    id: 'AZ',
  },
  {
    name: 'Arkansas',
    id: 'AR',
  },
  {
    name: 'California',
    id: 'CA',
  },
  {
    name: 'Colorado',
    id: 'CO',
  },
  {
    name: 'Connecticut',
    id: 'CT',
  },
  {
    name: 'Delaware',
    id: 'DE',
  },
  {
    name: 'District Of Columbia',
    id: 'DC',
  },
  {
    name: 'Federated States Of Micronesia',
    id: 'FM',
  },
  {
    name: 'Florida',
    id: 'FL',
  },
  {
    name: 'Georgia',
    id: 'GA',
  },
  {
    name: 'Guam',
    id: 'GU',
  },
  {
    name: 'Hawaii',
    id: 'HI',
  },
  {
    name: 'Idaho',
    id: 'ID',
  },
  {
    name: 'Illinois',
    id: 'IL',
  },
  {
    name: 'Indiana',
    id: 'IN',
  },
  {
    name: 'Iowa',
    id: 'IA',
  },
  {
    name: 'Kansas',
    id: 'KS',
  },
  {
    name: 'Kentucky',
    id: 'KY',
  },
  {
    name: 'Louisiana',
    id: 'LA',
  },
  {
    name: 'Maine',
    id: 'ME',
  },
  {
    name: 'Marshall Islands',
    id: 'MH',
  },
  {
    name: 'Maryland',
    id: 'MD',
  },
  {
    name: 'Massachusetts',
    id: 'MA',
  },
  {
    name: 'Michigan',
    id: 'MI',
  },
  {
    name: 'Minnesota',
    id: 'MN',
  },
  {
    name: 'Mississippi',
    id: 'MS',
  },
  {
    name: 'Missouri',
    id: 'MO',
  },
  {
    name: 'Montana',
    id: 'MT',
  },
  {
    name: 'Nebraska',
    id: 'NE',
  },
  {
    name: 'Nevada',
    id: 'NV',
  },
  {
    name: 'New Hampshire',
    id: 'NH',
  },
  {
    name: 'New Jersey',
    id: 'NJ',
  },
  {
    name: 'New Mexico',
    id: 'NM',
  },
  {
    name: 'New York',
    id: 'NY',
  },
  {
    name: 'North Carolina',
    id: 'NC',
  },
  {
    name: 'North Dakota',
    id: 'ND',
  },
  {
    name: 'Northern Mariana Islands',
    id: 'MP',
  },
  {
    name: 'Ohio',
    id: 'OH',
  },
  {
    name: 'Oklahoma',
    id: 'OK',
  },
  {
    name: 'Oregon',
    id: 'OR',
  },
  {
    name: 'Palau',
    id: 'PW',
  },
  {
    name: 'Pennsylvania',
    id: 'PA',
  },
  {
    name: 'Puerto Rico',
    id: 'PR',
  },
  {
    name: 'Rhode Island',
    id: 'RI',
  },
  {
    name: 'South Carolina',
    id: 'SC',
  },
  {
    name: 'South Dakota',
    id: 'SD',
  },
  {
    name: 'Tennessee',
    id: 'TN',
  },
  {
    name: 'Texas',
    id: 'TX',
  },
  {
    name: 'Utah',
    id: 'UT',
  },
  {
    name: 'Vermont',
    id: 'VT',
  },
  {
    name: 'Virgin Islands',
    id: 'VI',
  },
  {
    name: 'Virginia',
    id: 'VA',
  },
  {
    name: 'Washington',
    id: 'WA',
  },
  {
    name: 'West Virginia',
    id: 'WV',
  },
  {
    name: 'Wisconsin',
    id: 'WI',
  },
  {
    name: 'Wyoming',
    id: 'WY',
  },
];
