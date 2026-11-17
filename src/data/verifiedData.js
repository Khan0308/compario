// ONLY facts that were actually seen in a source. Anything not listed stays unknown.
// tier: 'official' = read on the vendor's own page/docs. 'secondary' = third-party report; needs manual review.
const S=(label,url,kind,tier,accessed,checked)=>({label,url,kind,tier,accessed,checked});
const P=(name,price,priceNum,note,tier)=>({name,price,priceNum,note,tier});
const REVIEWED='2026-11-04';
export const VERIFIED={
chatgpt:{website:'https://chatgpt.com',
 description:'AI assistant from OpenAI with Free, Go, Plus and Pro plans for individuals, plus Business and Enterprise plans.',
 overview:'ChatGPT is OpenAI’s AI assistant. Individual plans are Free, Go, Plus and Pro (three Pro tiers); organizations can choose Business or Enterprise.',
 pricingPlans:[
  P('Free','$0',0,'Unlimited text chats (subject to abuse guardrails); limited uploads, image creation, voice chats and deep research.','official'),
  P('Go','$8/month',8,'More messages, uploads, image creation and longer memory than Free. US price; localized in some markets. Pricing page notes Go may include ads.','official'),
  P('Plus','$20/month',20,'Adds Codex on web/CLI/IDE and expanded access over Go.','official'),
  P('Pro','From $100/month',100,'Pro plans at $100, $200 or $500 per month.','official'),
  P('Business','$20/user/month billed annually ($25 monthly)',20,'Minimum 2 users.','official'),
  P('Enterprise','Custom',null,'Custom pricing reported; confirm with OpenAI.','secondary')],
 features:['File uploads (limited on Free)','Image creation (limited on Free)','Voice chats (limited on Free)','Deep research (limited on Free)','Memory (longer on paid plans)'],
 attrs:{uploads:{state:'yes',note:'Limited on Free; more on Go and above',tier:'official'},imagegen:{state:'yes',note:'Limited on Free; more on Go and above',tier:'official'},
  websearch:{state:'unknown',note:'Not listed in the current pricing-page text reviewed'},context:{state:'unknown',note:'Pages say “limited”/“longer” context but give no token figures'}},
 verification:{status:'verified',lastVerified:REVIEWED,notes:'Pricing read from OpenAI’s pricing page and docs via search extracts (not a full-page capture). US USD prices; tiers change often. Web search, context window and integrations are not verified.',
  sources:[S('chatgpt.com/pricing','https://chatgpt.com/pricing/','pricing','official',true,REVIEWED),S('OpenAI Codex pricing docs (Go, Plus, Pro, Business prices)','https://learn.chatgpt.com/docs/pricing','pricing','official',true,REVIEWED),S('OpenAI: Introducing ChatGPT Go','https://www.openai.com/blog/introducing-chatgpt-go','pricing','official',true,REVIEWED)]}},
claude:{website:'https://claude.com',
 description:'AI assistant from Anthropic with Free, Pro, Max, Team and Enterprise plans.',
 overview:'Claude is Anthropic’s AI assistant. Details below come from third-party reports and still need to be checked against the official pricing page.',
 pricingPlans:[
  P('Free','$0',0,'Sonnet and Haiku models; no Opus. Usage-limited.','secondary'),
  P('Pro','$20/month ($17/month billed annually)',20,'Adds Opus models and Claude Code.','secondary'),
  P('Max','From $100/month',100,'$100 (5x Pro usage) or $200 (20x). One source says the 20x tier was renamed “Ultra” on Oct 30, 2026; others do not.','secondary'),
  P('Team','Standard $25/seat monthly ($20 annual); Premium $125 ($100 annual)',20,'2–150 seats.','secondary'),
  P('Enterprise','From $20/seat/month plus usage',20,'Billed annually; usage at API rates.','secondary')],
 features:['Chat','Web search (Free plan, per secondary source)','File uploads (Free plan, per secondary source)','Memory','Connectors'],
 attrs:{uploads:{state:'yes',note:'Reported on Free plan',tier:'secondary'},websearch:{state:'yes',note:'Reported on Free plan',tier:'secondary'},imagegen:{state:'unknown'},context:{state:'unknown'}},
 verification:{status:'secondary',lastVerified:null,notes:'claude.com/pricing was NOT opened by Compario. Figures agree across several third-party articles read on 2026-11-04, but must be confirmed manually before marking Verified.',
  sources:[S('claude.com/pricing (official – open to verify)','https://claude.com/pricing','pricing','official',false,null),S('Claude pricing 2026 (nocode.mba)','https://www.nocode.mba/articles/claude-pricing-2026','pricing','secondary',true,REVIEWED),S('Claude pricing plans (ai-toolbox.co)','https://www.ai-toolbox.co/claude-models/claude-pricing-plans-2026','pricing','secondary',true,REVIEWED),S('Claude pricing guide (aitomationacademy.com)','https://www.aitomationacademy.com/blog/is-claude-ai-free-pricing-guide','features','secondary',true,REVIEWED)]}},
gemini:{website:'https://gemini.google',
 description:'Google’s AI assistant, offered free and through paid Google AI Plus, Pro and Ultra subscriptions.',
 overview:'Gemini is Google’s AI assistant. Paid access is sold as Google AI subscriptions. Details below come from third-party reports and still need official confirmation.',
 pricingPlans:[
  P('Free','$0',0,'Gemini with a Google Account.','secondary'),
  P('Google AI Plus','$4.99/month',4.99,'Reported 2x Free usage and 400 GB storage.','secondary'),
  P('Google AI Pro','$19.99/month',19.99,'Reported 5 TB storage and 1M-token context.','secondary'),
  P('Google AI Ultra','$99.99 or $199.99/month',99.99,'5x or 20x AI Pro usage. One source mentions a January 2027 price rise (unverified).','secondary')],
 features:['Deep Research (paid tiers)','Image generation (Nano Banana, reported on AI Pro)','Cloud storage bundled with paid plans'],
 attrs:{context:{state:'yes',note:'Reported 1M tokens on AI Pro; 128K on AI Plus',tier:'secondary'},imagegen:{state:'yes',note:'Reported on AI Pro',tier:'secondary'},uploads:{state:'unknown'},websearch:{state:'unknown'}},
 verification:{status:'secondary',lastVerified:null,notes:'Google’s subscriptions page was NOT opened by Compario. US prices agree across several third-party articles read on 2026-11-04; confirm manually.',
  sources:[S('gemini.google/subscriptions (official – open to verify)','https://gemini.google/subscriptions','pricing','official',false,null),S('Gemini pricing (ai-toolbox.co)','https://www.ai-toolbox.co/gemini-models/gemini-pricing-plans-2026','pricing','secondary',true,REVIEWED),S('Gemini pricing (nocode.mba)','https://www.nocode.mba/articles/gemini-pricing','pricing','secondary',true,REVIEWED),S('Gemini pricing (krater.ai)','https://krater.ai/blog/gemini-pricing','features','secondary',true,REVIEWED)]}}
};
