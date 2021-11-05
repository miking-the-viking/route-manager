import React from "react";
import { Link } from "react-router-dom";
import { Route } from ".";

export const createRouter = <N extends string, P extends string>(routes: Route<N, P>[]) => ({
  Link: (props: React.ComponentProps<typeof Link> & { to: N }) => <Link {...props} />
})