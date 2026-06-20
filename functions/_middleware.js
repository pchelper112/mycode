export async function onRequest(context) {
  const request = context.request;
  const userAgent = request.headers.get("user-agent") || "";
  
  // سیستەمی فلتەرکردنی بۆت و ترافیکی ساختە
  const badBots = ["python", "curl", "wget", "go-http", "headless", "selenium", "puppeteer", "bot", "crawl", "spider"];
  
  if (badBots.some(bot => userAgent.toLowerCase().includes(bot))) {
    return new Response("Access Denied: Automated tools are not allowed.", { 
      status: 403,
      headers: { "content-type": "text/plain; charset=UTF-8" }
    });
  }

  // ئەگەر بۆت نەبوو، ڕێگا دەدات پڕۆژەکە ئاسایی کار بکات (ئەم دێڕە چاککراوە)
  return context.next();
}