import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {parse} from 'parse5';
const html=await readFile('dist/en/contact/index.html','utf8');
const scripts=[];function visit(node){if(node.tagName==='script')scripts.push(node.childNodes.map(c=>c.value||'').join(''));for(const child of node.childNodes||[])visit(child)}visit(parse(html));
const code=scripts.find(s=>s.includes('const form = document.querySelector("[data-lead-form]")'));
assert.ok(code,'Built contact submission handler is present');
function fixture(overrides={},networkError=false){
 const data={name:'Review Test',email:'review@example.com',company:'Review Company',project:'dataAnalytics',message:'Connect our reporting systems.',businessWebsite:'https://example.com',preferredTimeline:'Flexible',privacyPolicyAccepted:'yes',privacyPolicyVersion:'review',locale:'en',...overrides};
 const callbacks={},requests=[],status={textContent:''},button={setAttribute(){},removeAttribute(){}};
 const form={addEventListener(event,callback){callbacks[event]=callback},querySelector(){return button},checkValidity(){return !!(data.name&&data.email&&data.company&&data.project&&data.message&&data.privacyPolicyAccepted)},reportValidity(){},reset(){}};
 const location=new URL('https://websiteli.ch/en/contact/?intent=consultation');
 const window={location,websiteliGetAttribution:()=>({utm_source:'review',utm_campaign:'premium'}),websiteliUpdateInquiryFields(){}};
 const context={window,navigator:{userAgent:'Automated contract test'},document:{querySelector:s=>s==='[data-lead-form]'?form:status,documentElement:{lang:'en'},referrer:'https://example.com/'},FormData:class{get(key){return data[key]||''}},fetch:async(url,options)=>{requests.push({url,options});if(networkError)throw new Error('simulated network failure');return {type:'opaque'}},console:{error(){}},Date};
 vm.runInNewContext(code,context);
 return {data,requests,status,submit:()=>callbacks.submit({preventDefault(){}})};
}
const valid=fixture();await valid.submit();assert.equal(valid.requests.length,1);const request=valid.requests[0];assert.ok(request.url.startsWith('https://script.google.com/macros/s/'));assert.equal(request.options.mode,'no-cors');assert.equal(request.options.headers['Content-Type'],'text/plain;charset=utf-8');const payload=JSON.parse(request.options.body);assert.equal(payload.need,'dataAnalytics');assert.equal(payload.company,'Review Company');assert.ok(payload.message.includes('Website: https://example.com'));assert.ok(payload.message.includes('Preferred timeline: Flexible'));assert.equal(payload.metadata.privacyPolicyAccepted,true);assert.equal(payload.metadata.utm_source,'review');assert.equal(payload.metadata.priceShown,'');
const noConsent=fixture({privacyPolicyAccepted:''});await noConsent.submit();assert.equal(noConsent.requests.length,0);assert.match(noConsent.status.textContent,/privacy/i);
const honeypot=fixture({website:'https://spam.example'});await honeypot.submit();assert.equal(honeypot.requests.length,0);
const missingCompany=fixture({company:''});await missingCompany.submit();assert.equal(missingCompany.requests.length,0);
const failing=fixture({},true);await failing.submit();assert.equal(failing.requests.length,1);assert.match(failing.status.textContent,/email|send|wrong/i);
console.log('Contact contract checks passed: payload, optional fields, attribution, consent, honeypot, required company and network error. No live messages sent.');
