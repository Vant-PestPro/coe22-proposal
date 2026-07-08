const puppeteer = require('/opt/homebrew/lib/node_modules/puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: path.resolve(__dirname, 'ChurchOfEleven22-PestPro-Proposal.pdf'),
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.55in', bottom: '0.65in', left: '0.6in', right: '0.6in' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;font-family:Arial,sans-serif;font-size:8px;color:#999;padding:0 48px;display:flex;justify-content:space-between;box-sizing:border-box;"><span>Pest Pro, LLC — Commercial Pest Management Proposal</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>'
  });

  await browser.close();
  console.log('PDF generated: ChurchOfEleven22-PestPro-Proposal.pdf');
})();
