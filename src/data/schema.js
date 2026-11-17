// Verification model + category-specific comparison attributes.
export const STATUS={verified:{label:'Verified',cls:'ok'},secondary:{label:'',cls:'warn'},unverified:{label:'Not verified',cls:'muted'}};
export const OUTDATED_DAYS=90;
export const isOutdated=p=>{const d=p.verification.lastVerified;return !d||(Date.now()-new Date(d).getTime())/864e5>OUTDATED_DAYS};
const A=(key,label,type='state')=>({key,label,type});
const SITE=[A('hosting','Hosting included'),A('domains','Custom domains'),A('templates','Templates'),A('ecommerce','E-commerce'),A('seo','SEO tools'),A('payments','Payment integrations')];
export const COMPARE_ATTRS={
 'ai-tools':[A('context','Context window','text'),A('uploads','File uploads'),A('imagegen','Image generation'),A('websearch','Web search')],
 'website-builders':SITE,'ecommerce-platforms':SITE,
 'web-hosting':[A('introPrice','Introductory price','text'),A('renewPrice','Renewal price','text'),A('storage','Storage','text'),A('bandwidth','Bandwidth','text'),A('ssl','SSL'),A('backups','Backups'),A('support','Support','text')],
 'graphic-design-tools':[A('templates','Templates'),A('collab','Real-time collaboration'),A('brandkit','Brand kit'),A('ai','AI features'),A('desktop','Desktop app')],
 'project-management':[A('kanban','Kanban boards'),A('gantt','Gantt / timeline'),A('time','Time tracking'),A('automation','Automation'),A('guests','Guest access')]};
export const attrsFor=c=>COMPARE_ATTRS[c]||[];
// Derives pricing summary ONLY from recorded plans. Unknown stays null.
export function derivePricing(plans=[]){
 if(!plans.length)return{pricingModel:null,startingPrice:null,hasFreePlan:null};
 const free=plans.some(x=>x.priceNum===0),paid=plans.filter(x=>x.priceNum>0).map(x=>x.priceNum);
 return{hasFreePlan:free,pricingModel:free&&paid.length?'Freemium':free?'Free':paid.length?'Paid':null,startingPrice:paid.length?Math.min(...paid):free?0:null};
}
