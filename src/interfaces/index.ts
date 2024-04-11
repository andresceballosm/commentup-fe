export type UserPayloadObject = {
  name: string;
  email: string;
  avatar: string;
};

export type MenuAsideItem = {
  label: string;
  icon?: string;
  href?: string;
  target?: string;
  color?: ColorButtonKey;
  isLogout?: boolean;
  menu?: MenuAsideItem[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: () => void;
};

export type MenuNavBarItem = {
  label?: string;
  icon?: string;
  href?: string;
  target?: string;
  isDivider?: boolean;
  isLogout?: boolean;
  isDesktopNoLabel?: boolean;
  isToggleLightDark?: boolean;
  isCurrentUser?: boolean;
  menu?: MenuNavBarItem[];
};

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info';

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'blue'
  | 'void';

export type BgKey = 'purplePink' | 'pinkRed' | 'white';

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info';

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment';

export type Transaction = {
  id: number;
  amount: number;
  account: string;
  name: string;
  date: string;
  type: TransactionType;
  business: string;
};

export type Client = {
  id: number;
  avatar: string;
  login: string;
  name: string;
  company: string;
  city: string;
  progress: number;
  created: string;
  created_mm_dd_yyyy: string;
};

export type StyleKey = 'white' | 'basic';

export type UserForm = {
  name: string;
  email: string;
};

export type ITestQuestion = {
  question: string;
  answer: string;
  options: string[];
};

export type IQuestions = {
  questions: string[];
  questionsTest: ITestQuestion[];
};

export type IPostulation = {
  _id: string;
  positionID: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  ganeralAnswer: string[];
  technicalAnswer: string[];
  scoreAverage?: number;
  scoreGeneral: number;
  scoreTechnical: number;
  scoreCV: number;
  cvUrl: string;
  cv?: string;
  status: string;
  createdAt: string;
  resultGeneral: string;
  resume: string;
};

export type IEmailsTemplate = {
  step: string;
  html: string;
  subjet: string;
  slate: any[];
};
