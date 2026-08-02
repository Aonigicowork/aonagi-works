const puppeteer = require('puppeteer');
const fs = require('fs');
const http = require('http');
const path = require('path');

// Simple static server
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    if (!fs.existsSync(filePath)) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200);
    res.end(fs.readFileSync(filePath));
});

server.listen(3000, async () => {
    console.log("Server started on 3000");
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Start tracing
    await page.tracing.start({ path: 'trace.json', screenshots: false });
    
    await page.goto('http://localhost:3000');
    
    // Scroll a bit
    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(r => setTimeout(r, 500));
    
    // Drag window
    const winTitle = await page.$('.win-title');
    if (winTitle) {
        const box = await winTitle.boundingBox();
        await page.mouse.move(box.x + 10, box.y + 10);
        await page.mouse.down();
        for(let i = 0; i < 20; i++) {
            await page.mouse.move(box.x + 10 + i * 5, box.y + 10 + i * 5);
            await new Promise(r => setTimeout(r, 16));
        }
        await page.mouse.up();
    }
    
    await page.tracing.stop();
    await browser.close();
    server.close();
    
    console.log("Trace saved to trace.json");
    
    // Parse trace to find forced layouts
    const trace = JSON.parse(fs.readFileSync('trace.json'));
    const layoutEvents = trace.traceEvents.filter(e => e.name === 'UpdateLayoutTree' || e.name === 'Layout');
    console.log(`Found ${layoutEvents.length} layout events during tracing.`);
    
    let longTasks = trace.traceEvents.filter(e => e.name === 'RunTask' && e.dur > 50000);
    console.log(`Found ${longTasks.length} long tasks.`);
});
