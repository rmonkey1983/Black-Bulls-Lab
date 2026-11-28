async (page) => {
 const routes=['/','/calendario','/case-study','/contatti','/gallery','/profile','/talents','/blog','/chi-siamo','/cookie-policy','/eventi-aziendali','/eventi-privati','/format','/format/a-cena-con-il-bugiardo','/format/cena-con-delitto','/format/il-palqo','/format/the-golden-voice','/locali-partner','/privacy-policy','/blog/benvenuti-nel-lab','/blog/cena-aziendale-originale-torino','/blog/cosa-fare-torino-sabato-sera','/blog/dietro-le-quinte-cena-con-delitto','/team/julian','/team/manuel','/team/maurizio'];
 const errors=[]; const findings=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>r.request().method()==='POST'?r.abort('blockedbyclient'):r.continue());
 for(const path of routes){
  const response=await page.goto('http://localhost:3000'+path,{waitUntil:'domcontentloaded'});
  await page.locator('h1').first().waitFor();
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(2200);
  for(const width of [375,768,1440]){
   await page.setViewportSize({width,height:900});
   const state=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,invalidJson:[...document.querySelectorAll('script[type="application/ld+json"]')].some(e=>{try{JSON.parse(e.textContent);return false}catch{return true}})}));
   if(state.scroll>width||state.invalidJson)findings.push({path,...state});
   if(path==='/eventi-privati'&&width===375)await page.screenshot({path:'output/playwright/private-375.png'});
   if(path==='/locali-partner'&&width===768)await page.screenshot({path:'output/playwright/partner-768.png'});
   if(path==='/eventi-aziendali'&&width===1440)await page.screenshot({path:'output/playwright/corporate-1440.png'});
  }
  if(response.status()!==200)findings.push({path,status:response.status()});
 }
 return {pages:routes.length,viewports:routes.length*3,findings,errors};
}
