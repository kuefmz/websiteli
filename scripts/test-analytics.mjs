import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync('public/analytics-runtime.js','utf8');
function setup(consent) {
 const data = new Map(consent ? [['websiteli_analytics_consent_v1', consent]] : []);
 const storage = {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 const scripts=[];
 const document={cookie:'',documentElement:{lang:'de'},createElement:()=>({}),head:{appendChild:s=>scripts.push(s)},querySelector:()=>null,addEventListener:()=>{}};
 const window={location:{pathname:'/de/contact/',origin:'https://websiteli.ch',search:'?email=private@example.com&debug_mode=true',reload:()=>{}},dataLayer:[]};
 const context={window,document,localStorage:storage,sessionStorage:storage,URLSearchParams,Set,Date};
 vm.runInNewContext(source,context);
 return {window,scripts};
}
const denied=setup();
assert.equal(denied.scripts.length,0);
denied.window.websiteliTrackConfirmedLead('generate_lead',{form_type:'website_quote'},'1');
assert.equal(denied.window.dataLayer.filter(a=>a[0]==='event').length,0);
const enabled=setup('granted');
assert.equal(enabled.scripts.length,1);
const config=enabled.window.dataLayer.find(a=>a[0]==='config')[2];
assert.equal(config.page_location,'https://websiteli.ch/de/contact/');
assert.equal(config.page_referrer,'');
enabled.window.trackWebsiteliEvent('generate_lead');
assert.equal(enabled.window.dataLayer.filter(a=>a[0]==='event').length,0);
const response=(type,ok,result)=>({type,ok,clone:()=>({json:async()=>result})});
assert.equal(await enabled.window.websiteliConfirmEnquiry(response('opaque',true,{success:true}),{formType:'website_quote',submissionKey:'opaque'}),false);
assert.equal(await enabled.window.websiteliConfirmEnquiry(response('cors',false,{success:true}),{formType:'website_quote',submissionKey:'fail'}),false);
assert.equal(await enabled.window.websiteliConfirmEnquiry(response('cors',true,{success:false}),{formType:'website_quote',submissionKey:'false'}),false);
for (const [type,name] of [['website_quote','generate_lead'],['website_review','website_review_request'],['general_contact','contact_form_submit']]) {
 assert.equal(await enabled.window.websiteliConfirmEnquiry(response('cors',true,{success:true}),{formType:type,submissionKey:type}),true);
 assert.equal(await enabled.window.websiteliConfirmEnquiry(response('cors',true,{success:true}),{formType:type,submissionKey:type}),true);
 assert.equal(enabled.window.dataLayer.filter(a=>a[0]==='event'&&a[1]===name).length,1);
}
enabled.window.websiteliTrackConfirmedLead('website_review_request',{form_type:'market_scan_report',email:'private@example.com',name:'Private Name',source_page:'/?email=private@example.com'},'report');
assert.ok(!JSON.stringify(enabled.window.dataLayer).includes('private@example.com'));
enabled.window.websiteliSetAnalyticsConsent(false);
enabled.window.trackWebsiteliEvent('test');
assert.equal(enabled.window.dataLayer.filter(a=>a[0]==='event'&&a[1]==='test').length,0);
console.log('PASS: consent gating, sanitized URLs, blocked click leads, opaque/error rejection, successful event classification, deduplication, PII exclusion and withdrawal');
