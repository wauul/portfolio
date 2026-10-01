import { signatureCurves } from '../lib/hero-world.mjs';
export default function SignatureLogo({className='signature-logo'}) {
  return <svg className={className} viewBox="-3.7 -2.5 7.4 5" fill="none" aria-hidden="true"><g transform="scale(1 -1)" stroke="currentColor" strokeWidth=".105" strokeLinecap="round" strokeLinejoin="round">{signatureCurves.map(([a,b,c,d],i)=><path key={i} d={`M${a} C${b} ${c} ${d}`}/>)}</g></svg>;
}
