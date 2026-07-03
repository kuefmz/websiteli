#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.env.GITHUB_WORKSPACE || process.cwd();
const base = (process.env.SITE_BASE_URL || "https://websiteli.ch").replace(/\/$/, "");
const dry = process.env.SOCIAL_DRY_RUN === "true";

const topics = [
  ["small-business-website", "Why Small Businesses Need More Than a Facebook Page", "A practical guide to owning your online presence, building trust, and turning visitors into enquiries."],
  ["website-cost-switzerland", "What Makes a Website Worth Paying For in Switzerland?", "A clear explanation of scope, ownership, content, SEO, launch support, and maintenance."],
  ["business-website-features", "The Website Features That Turn Visitors Into Enquiries", "The practical sections and conversion paths every service business website should include."],
  ["affordable-website", "How to Start With an Affordable Website Without Looking Cheap", "How to keep the first version focused, professional, and ready to grow."],
  ["ai-website-automation", "How AI Can Help a Small Business Website Work Harder", "Practical AI workflows for leads, content, analytics, and follow-up without hype."],
  ["website-redesign", "Signs Your Business Website Needs a Redesign", "How to identify outdated design, slow pages, unclear offers, weak mobile UX, and missing tracking."],
  ["multilingual-website-switzerland", "When a Swiss Business Should Have a Multilingual Website", "When German, French, Italian, English, Hungarian, Polish, or Spanish content can help growth."]
];

function dateCH() {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zurich", year: "numeric", month: "2-digit", day: "2-digit" })
    .formatToParts(new Date()).reduce((a, x) => (x.type === "literal" ? a : { ...a, [x.type]: x.value }), {});
  return `${p.year}-${p.month}-${p.day}`;
}
function slug(s){return String(s).toLowerCase().replace(/['’]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,70)}
function mkdir(p){mkdirSync(p,{recursive:true})}
function esc(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function hash(s){let h=0; for(const c of s) h=(h*31+c.charCodeAt(0))>>>0; return h}
function wrap(s,n){return (String(s).match(new RegExp(`.{1,${n}}(\\s|$)`,"g"))||[s]).map(x=>x.trim()).filter(Boolean)}

async function ai(date) {
  if (!process.env.OPENAI_API_KEY) return null;
  const t = topics[hash(date)%topics.length];
  const prompt = `Create one original Websiteli marketing bundle for ${date}. Brand: Websiteli, Swiss websites, automation and AI for small businesses. Offer: landing pages from CHF 990, growth setup from CHF 1'990, AI/data upgrade from CHF 3'290. Topic: ${t[1]}. Return strict JSON with title, slug, description, tags array, body markdown 900-1300 words, linkedin, facebook, instagram, pinterestTitle, pinterestDescription, youtubeTitle, youtubeDescription, youtubeScript, carouselSlides array of 6 {headline,body}, imagePosts array of 2 {headline,body}, faqs array of 3 {question,answer}.`;
  const r = await fetch("https://api.openai.com/v1/responses", { method:"POST", headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"}, body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4.1-mini",input:prompt,text:{format:{type:"json_object"}}})});
  if(!r.ok){ console.warn(await r.text()); return null; }
  const d=await r.json(); const txt=d.output_text || d.output?.flatMap(i=>i.content||[]).map(p=>p.text||"").join("") || "";
  try { return JSON.parse(txt); } catch { return null; }
}

function fallback(date){
  const [key,title,description]=topics[hash(date)%topics.length];
  const body=`## The short answer

A business website should make it easy for the right visitor to understand what you offer, trust you, and contact you. ${description}

## Why this matters

Many small businesses rely on social media, referrals, or an old website. Those channels can help, but they often do not give enough control over search visibility, credibility, and conversion.

A strong website gives the business a clear home. It explains services, answers common questions, shows proof, collects enquiries, and supports sales even when the owner is busy.

## What to focus on first

Start with a focused version instead of trying to build everything at once. The first version should include a clear homepage, service explanation, trust signals, contact path, basic SEO, analytics, and a structure that can grow.

The best website is not the one with the most effects. It is the one that makes the next step obvious for the right visitor.

## Practical checklist

- Make the main offer clear above the fold.
- Add one primary call to action.
- Explain who the service is for.
- Include proof, examples, testimonials, or experience.
- Answer the questions buyers ask before contacting you.
- Make contact easy on mobile.
- Add basic SEO titles, descriptions, and internal links.
- Track visits and enquiries.

## How Websiteli helps

Websiteli builds practical websites for small businesses that need clarity, trust, and a better path to enquiries. The goal is not only to publish a nice page, but to create a useful digital foundation that can support marketing, content, analytics, and automation.

## Conclusion

A website should save time, build trust, and help the right people contact you. If your current online presence does not do that yet, improving the website foundation is one of the most practical next step.`;
  return {title,slug:key,description,tags:[key,"business website","Websiteli","lead generation"],body,linkedin:`${title}\n\n${description}`,facebook:`${title}\n\n${description}`,instagram:`${title}\n\n${description}`,pinterestTitle:title,pinterestDescription:description,youtubeTitle:title,youtubeDescription:description,youtubeScript:`${title}. ${description}. A strong website clarifies the offer, builds trust, and makes the next step easy.`,faqs:[{question:"What should a small business website include first?",answer:"A clear offer, service pages, trust signals, contact path, FAQs, basic SEO, and analytics."},{question:"Can I rely only on social media?",answer:"Social media helps visibility, but a website gives more ownership, search visibility, and conversion control."},{question:"How often should I improve the website?",answer:"Review content, links, analytics, and enquiries every month."}],carouselSlides:[{headline:title,body:description},{headline:"Clarity first",body:"Visitors should understand your offer in seconds."},{headline:"Build trust",body:"Add proof, examples, FAQs, and clear ownership."},{headline:"Make contact easy",body:"Use visible calls to action on every important page."},{headline:"Track results",body:"Analytics show what people read and where they leave."},{headline:"Websiteli",body:"A practical website foundation for small businesses."}],imagePosts:[{headline:"Your website should sell trust",body:"Clear offer. Fast path to contact. Strong first impression."},{headline:"Stop losing silent visitors",body:"Answer buyer questions before they message you."}]}
}

function normal(x,date){const f=fallback(date), c={...f,...(x||{})}; c.slug=slug(c.slug||c.title); c.tags=Array.isArray(c.tags)?c.tags:f.tags; c.carouselSlides=Array.isArray(c.carouselSlides)?c.carouselSlides.slice(0,6):f.carouselSlides; c.imagePosts=Array.isArray(c.imagePosts)?c.imagePosts.slice(0,2):f.imagePosts; c.faqs=Array.isArray(c.faqs)?c.faqs:f.faqs; return c}

function svg({headline,body,footer,w=1080,h=1350}){
  const hs=wrap(esc(headline),24).slice(0,4), bs=wrap(esc(body),52).slice(0,6);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect width="100%" height="100%" fill="#fff"/><rect x="56" y="56" width="${w-112}" height="${h-112}" rx="42" fill="#fff" stroke="#111" stroke-width="4"/><rect x="86" y="86" width="180" height="18" rx="9" fill="#e30613"/><text x="86" y="170" font-family="Arial" font-size="38" font-weight="700" fill="#111">WEBSITELI</text>
${hs.map((l,i)=>`<text x="86" y="${330+i*92}" font-family="Arial" font-size="76" font-weight="800" fill="#111">${l}</text>`).join("")}
${bs.map((l,i)=>`<text x="86" y="${750+i*52}" font-family="Arial" font-size="36" fill="#333">${l}</text>`).join("")}
<rect x="86" y="${h-210}" width="390" height="76" rx="38" fill="#111"/><text x="128" y="${h-160}" font-family="Arial" font-size="32" font-weight="700" fill="#fff">${esc(footer)}</text><circle cx="${w-150}" cy="${h-170}" r="54" fill="#e30613"/></svg>`
}

function writeBlog(c,date){
  const src={slug:c.slug,title:c.title,language:"en",description:c.description,tags:c.tags,published:true,status:"published",image:`/assets/blog/${c.slug}.svg`,author:"Websiteli",date,publishDate:date,updated:date,social:{linkedin:c.linkedin,facebook:c.facebook,instagram:c.instagram},related:["/en/services-pricing/","/en/contact/","/en/blog/business-website-features/"],translations:{en:{title:c.title,description:c.description,category:"Website Strategy",tags:c.tags,language:"en",readingTime:"6 min read",audience:"Small business owners",excerpt:c.description,summary:[c.description],keyTakeaways:["Clarity beats decoration.","A focused launch is better than an unfinished complex site.","Every page should help the visitor understand, trust, or contact the business."],chatGptPrompts:["Review my current website and suggest improvements.","Turn this article into a checklist.","Create social captions from this blog post."],faqs:c.faqs,body:c.body}}};
  const dir=join(root,"src/content/blog/posts"); mkdir(dir);
  const p=join(dir,`${c.slug}.ts`);
  if(!existsSync(p)||process.env.OVERWRITE_EXISTING_POST==="true") writeFileSync(p,`import type { BlogPostSource } from "../types";\n\nexport default ${JSON.stringify(src,null,2)} satisfies BlogPostSource;\n`);
  return p;
}
function writeAssets(c,date){
  mkdir(join(root,"public/assets/blog")); mkdir(join(root,"public/assets/marketing",date));
  writeFileSync(join(root,"public/assets/blog",`${c.slug}.svg`),svg({headline:c.title,body:c.description,footer:"Read the guide",w:1600,h:900}));
  const carouselPaths=[], imagePostPaths=[];
  c.carouselSlides.forEach((s,i)=>{const n=`ig-carousel-${String(i+1).padStart(2,"0")}`; writeFileSync(join(root,"public/assets/marketing",date,`${n}.svg`),svg({...s,footer:`Slide ${i+1}/6`})); carouselPaths.push(`/assets/marketing/${date}/${n}.png`)});
  c.imagePosts.forEach((s,i)=>{const n=`ig-post-${String(i+1).padStart(2,"0")}`; writeFileSync(join(root,"public/assets/marketing",date,`${n}.svg`),svg({...s,footer:"websiteli.ch"})); imagePostPaths.push(`/assets/marketing/${date}/${n}.png`)});
  return {carouselPaths,imagePostPaths,blogImage:`/assets/blog/${c.slug}.png`};
}
async function tts(c,date){ if(!process.env.OPENAI_API_KEY) return; const r=await fetch("https://api.openai.com/v1/audio/speech",{method:"POST",headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_TTS_MODEL||"gpt-4o-mini-tts",voice:process.env.OPENAI_TTS_VOICE||"alloy",input:String(c.youtubeScript).slice(0,3800)})}); if(r.ok) writeFileSync(join(root,"public/assets/marketing",date,"voiceover.mp3"),Buffer.from(await r.arrayBuffer()))}

async function postJson(url,body,headers={}){ if(dry) return {dryRun:true}; const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json",...headers},body:JSON.stringify(body)}); const txt=await r.text(); if(!r.ok) throw new Error(`${r.status} ${txt}`); try{return JSON.parse(txt)}catch{return{raw:txt}}}
function url(p){return `${base}${p}`}
async function social(c,a,date){
  const blog=`${base}/en/blog/${c.slug}/?utm_source=social&utm_medium=organic&utm_campaign=daily_marketing_${date}`, out={blog};
  try{out.linkedin=(!process.env.LINKEDIN_ACCESS_TOKEN||!process.env.LINKEDIN_AUTHOR_URN)?{skipped:"missing credentials"}:await postJson("https://api.linkedin.com/rest/posts",{author:process.env.LINKEDIN_AUTHOR_URN,commentary:`${c.linkedin}\n\n${blog}`,visibility:"PUBLIC",distribution:{feedDistribution:"MAIN_FEED",targetEntities:[],thirdPartyDistributionChannels:[]},lifecycleState:"PUBLISHED"},{Authorization:`Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,"LinkedIn-Version":process.env.LINKEDIN_VERSION||"202506","X-Restli-Protocol-Version":"2.0.0"})}catch(e){out.linkedin={error:e.message}}
  try{out.facebook=(!process.env.META_ACCESS_TOKEN||!process.env.FACEBOOK_PAGE_ID)?{skipped:"missing credentials"}:await postJson(`https://graph.facebook.com/v20.0/${process.env.FACEBOOK_PAGE_ID}/feed`,{message:`${c.facebook}\n\n${blog}`,link:blog,access_token:process.env.META_ACCESS_TOKEN})}catch(e){out.facebook={error:e.message}}
  try{out.pinterest=(!process.env.PINTEREST_ACCESS_TOKEN||!process.env.PINTEREST_BOARD_ID)?{skipped:"missing credentials"}:await Promise.all([...a.imagePostPaths,a.carouselPaths.slice(0,1)].map(p=>postJson("https://api.pinterest.com/v5/pins",{board_id:process.env.PINTEREST_BOARD_ID,title:c.pinterestTitle,description:c.pinterestDescription,link:blog,media_source:{source_type:"image_url",url:url(p)}},{Authorization:`Bearer ${process.env.PINTEREST_ACCESS_TOKEN}`})))}catch(e){out.pinterest={error:e.message}}
  writeFileSync(join(root,"public/assets/marketing",date,"social-results.json"),JSON.stringify(out,null,2));
}

async function main(){
  const date=process.env.MARKETING_DATE||dateCH(), c=normal(await ai(date),date), assets=writeAssets(c,date);
  writeBlog(c,date); await tts(c,date);
  const manifest={date,slug:c.slug,title:c.title,blogUrl:`${base}/en/blog/${c.slug}/`,assets,captions:{linkedin:c.linkedin,facebook:c.facebook,instagram:c.instagram,pinterestTitle:c.pinterestTitle,pinterestDescription:c.pinterestDescription,youtubeTitle:c.youtubeTitle,youtubeDescription:c.youtubeDescription,youtubeScript:c.youtubeScript}};
  writeFileSync(join(root,"public/assets/marketing",date,"manifest.json"),JSON.stringify(manifest,null,2));
  if(process.env.POST_SOCIAL_NOW==="true") await social(c,assets,date);
  console.log(JSON.stringify(manifest,null,2));
}
main().catch(e=>{console.error(e); process.exitCode=1});
