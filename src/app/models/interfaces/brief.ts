export enum Engagement {
  BINOMIAL = 'BINOMIAL',
  TRINOMIAL = 'TRINOMIAL',
  INDIVIDUAL = 'INDIVIDUAL'
}

export interface Brief {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  engagement: Engagement;
  launchDate?: string;
}

export interface BriefDTO {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  engagement: Engagement;
}
