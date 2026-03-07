export type TemplateState = {
  price?: string;
  evaluation?: string;
  briefing?: string;
  deposit?: string;
  type?: string;
  field?: string;
  site?: string;

  amountCheck?: {
    base?: boolean;
    aValue?: boolean;
    net?: boolean;
  };
};
