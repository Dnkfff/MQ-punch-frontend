export interface IUserProfile {
  me: {
    user: {
      id: string;
      username: string;
      role: string;
      ethAccountId: string;
      email: string | null;
      discord: string | null;
      avatar: null;
      ethBalance: number;
      usdBalance: string;
    };
    winrate: {
      numberOfWins: number;
      numberOfFights: number;
    };
    earnings: number;
    avgRating: number;
  };
}
