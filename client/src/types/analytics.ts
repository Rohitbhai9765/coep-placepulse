export interface PlacementTrend {

  month: string;

  placed: number;

}

export interface PlacementPulse {

  activeCompanies: number;

  interviewsToday: number;

  offersReleased: number;

  pendingResults: number;

}

export interface Analytics {

  _id?: string;

  placementTrend: PlacementTrend[];

  placementPulse: PlacementPulse;

}