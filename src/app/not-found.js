import Link from "next/link";

export default function NotFound() {
  return <main className="section-wrap route-message"><span>404 / WF</span><h1>{"Cette page n’existe pas"}<br />Page not found</h1><p>{"Le lien a peut-être changé. Retrouvez les projets et les coordonnées sur le portfolio."}<br />Head back to the portfolio to explore the work or get in touch.</p><Link className="button button-primary" href="/">Retour au portfolio / Back to portfolio</Link></main>;
}
