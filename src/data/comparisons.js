import {bySlug} from './products';
const PAIRS=[['shopify','woocommerce'],['chatgpt','claude'],['chatgpt','gemini'],['wix','squarespace'],['canva','figma'],['trello','asana'],['mailchimp','brevo'],['ahrefs','semrush'],['hubspot','salesforce'],['hostinger','bluehost']];
// Only pairs where both products currently exist are listed (a removed product drops its pairs).
export const comparisons=[];
export function refreshComparisons(){comparisons.length=0;PAIRS.forEach(([a,b])=>{if(bySlug[a]&&bySlug[b])comparisons.push({a:bySlug[a],b:bySlug[b]})})}
refreshComparisons();
