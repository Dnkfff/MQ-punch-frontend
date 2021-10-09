import { getUUID } from "../get-uuid/get-uuid";

// in miliseconds ( one hour )
export const refreshTokenCoolDown = 60 * 60 * 1000;

export const bigHeaderMenuLinks = [
  { label: "Market", id: getUUID(), pathname: "/market" },
  {
    label: "Tournaments",
    id: getUUID(),
    pathname: "/tournaments",
  },
  { label: "Gym", id: getUUID(), pathname: "/gym" },
  {
    label: "Leaderboard",
    id: getUUID(),
    pathname: "/leaderboard",
  },
  { label: "Learn", id: getUUID(), pathname: "/learn" },
];
