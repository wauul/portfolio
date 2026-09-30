"use client";

export default function Error({ reset }) {
  return <main className="section-wrap route-message"><span>WF / Connection interrupted</span><h1>{"Impossible d’afficher cette page"}<br />Something went wrong</h1><p>{"Réessayez ou contactez-moi à waelfezari@gmail.com."}<br />Try again, or contact me directly by email.</p><button className="button button-primary" onClick={reset}>Réessayer / Try again</button><a className="text-link" href="mailto:waelfezari@gmail.com">waelfezari@gmail.com</a></main>;
}
