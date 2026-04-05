export const ACCESS_TOKEN_EXPIRY = '15m';
export const REFRESH_TOKEN_EXPIRY = '30d';
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_SECONDS = 300;
export const CURRENCY = 'ZAR';

export const FEE_RATES = {
  TIP: 0.015,
  SERVICE_PAYMENT: 0.025,
  TRANSFER: 0.015,
  ESCROW: 0.025,
  RECURRING: 0.02,
  COMMUNITY_FUND: 0.015,
} as const;

export const SERVICE_CATEGORIES: Record<string, string[]> = {
  'Home & Property': [
    'Painting',
    'Plumbing',
    'Electrical',
    'Handyman',
    'Tiling',
    'Roofing',
    'Fencing',
  ],
  Domestic: [
    'Cleaning',
    'Nanny/Childcare',
    'Cooking',
    'Laundry/Ironing',
    'Elder Care',
  ],
  'Garden & Outdoor': [
    'Gardening',
    'Landscaping',
    'Pool Maintenance',
    'Tree Felling',
  ],
  Vehicle: [
    'Car Guarding',
    'Car Wash',
    'Minor Repairs',
    'Panel Beating',
  ],
  Community: [
    'Street Cleaning',
    'Recycling',
    'Security',
    'Neighbourhood Watch',
  ],
  Personal: [
    'Hairdressing',
    'Tailoring',
    'Tutoring',
    'Pet Care',
    'Errands',
  ],
  'Skilled Trades': [
    'Welding',
    'Carpentry',
    'Bricklaying',
    'Plastering',
  ],
  Hospitality: [
    'Petrol Attendant',
    'Waiter',
    'Barista',
    'Event Staff',
  ],
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zu', name: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'st', name: 'Sesotho' },
  { code: 'tn', name: 'Setswana' },
  { code: 'ts', name: 'Xitsonga' },
  { code: 've', name: 'Tshivenda' },
  { code: 'ss', name: 'siSwati' },
  { code: 'nr', name: 'isiNdebele' },
  { code: 'nso', name: 'Sepedi' },
] as const;
