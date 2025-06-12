"use client";
// ^ this file needs the "use client" pragma
import React from "react";
import { ApolloLink, HttpLink, from, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";

// have a function to create a client for you
function makeClient() {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: `${process.env.API_URL}`,
    credentials: "include",
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (message === "Unauthenticated" && typeof window !== "undefined") {
          localStorage.clear();
          window.location.href = "/login";
        }
        return message;
      });
    if (networkError) {
    }
  });
  const splitLink =
    typeof window === "undefined"
      ? ApolloLink.from([
          // in a SSR environment, if you use multipart features like
          // @defer, you need to decide how to handle these.
          // This strips all interfaces with a `@defer` directive from your queries.
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
      : httpLink;
  const authLink = setContext((_, { headers }) => {
    // const token = cookies().get("refreshToken")?.value;
    const token =
      typeof window === "undefined" ? "" : localStorage.getItem("token");

    // get the authentication token from local storage if it exists

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  // return new NextSSRApolloClient({
  //   // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
  //   cache: new NextSSRInMemoryCache(),
  //   // link: authLink.concat(from([errorLink, splitLink])),
  //   link: from([errorLink, authLink.concat(splitLink)]),
  //   credentials: "include",
  // });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink.concat(httpLink)]),
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
