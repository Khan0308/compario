import {Sparkles,LayoutTemplate,Server,ShoppingCart,Palette,ListChecks,Mail,Search,Users,Calculator,Cloud,MessageSquare,Video,Share2,Code,Shield,Workflow,Zap} from 'lucide-react';
const COL=['#7C3AED','#3B82F6','#F97316','#06B6D4','#9333EA','#10B981'];
const rows=[
['AI Tools','ai-tools',Sparkles,'Chatbots, writing and research assistants.'],
['Website Builders','website-builders',LayoutTemplate,'Build sites without writing code.'],
['Web Hosting','web-hosting',Server,'Reliable hosting for sites and apps.'],
['E-commerce Platforms','ecommerce-platforms',ShoppingCart,'Launch and run an online store.'],
['Graphic Design Tools','graphic-design-tools',Palette,'Design graphics, UI and presentations.'],
['Project Management','project-management',ListChecks,'Plan tasks and track team progress.'],
['Email Marketing','email-marketing',Mail,'Campaigns, newsletters and audiences.'],
['SEO Tools','seo-tools',Search,'Keyword research and rank tracking.'],
['CRM Software','crm-software',Users,'Manage customers and sales pipelines.'],
['Accounting Software','accounting-software',Calculator,'Invoices, books and tax reports.'],
['Cloud Storage','cloud-storage',Cloud,'Store and share files securely.'],
['Communication Tools','communication-tools',MessageSquare,'Chat, calls and video meetings.'],
['Video Editing Software','video-editing-software',Video,'Edit, color and export video.'],
['Social Media Management','social-media-management',Share2,'Schedule posts and track engagement.'],
['Developer Tools','developer-tools',Code,'Code hosting, editors and APIs.'],
['Security Software','security-software',Shield,'VPNs, antivirus and password managers.'],
['Marketing Automation','marketing-automation',Workflow,'Automate campaigns and workflows.'],
['Productivity Tools','productivity-tools',Zap,'Notes, tasks and scheduling.']];
export const categories=rows.map(([name,slug,Icon,desc],i)=>({name,slug,Icon,desc,color:COL[i%6]}));
export const catBySlug=Object.fromEntries(categories.map(c=>[c.slug,c]));
