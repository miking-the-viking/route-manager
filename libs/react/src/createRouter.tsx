import React from "react";
import { Link } from "react-router-dom";
import { Route } from ".";

type CreateRouter = <N extends string, P extends string, CN extends string, CP extends string>(routes: Route<N, P, CN, CP>[]) => {
  Link: React.FC<React.ComponentProps<typeof Link> & { to: N }>
  Provider: React.FC
}

export const createRouter = (() => { /** */ }) as unknown as CreateRouter