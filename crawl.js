const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Function to fetch and extract title if response is 200
async function fetchTitle(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const title = $('title').text().trim();
      console.log(`Title fetched: url ${url} - ${title}`);
      fs.appendFileSync('titles.txt', `${url} ${title}\n`, 'utf-8');
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
  }
}

// Function to fetch and extract title if response is 200
async function fetchEvent(id) {
  try {
    const response = await axios.get("https://api-v2.ticketbox.vn/gin/api/v1/events/"+id);
    if (response.status === 200) {
      const data = response.data;
      if (data?.status) {
        const title = `events id ${id} ${data?.data?.result?.title}`;
        fs.appendFileSync('events.txt', `${title}\n`, 'utf-8');
      }
    }
  } catch (error) {
    console.error(`Error fetching ${id}:`, error.message);
  }
}


// Crawl each URL and fetch the title
(async () => {
  //89253
  //23603 https://ticketbox.vn/chan-troi-ruc-ro-2023-86261 https://ticketbox.vn/storii-concert-02-nguoi-giu-mua-xuan-89253
  // for (i = 23603; i <= 30703; i++) {
  // for (i = 23503; i <= 23703; i++) {
  for (i = 23503; i <= 99999; i++) {
  // for (i = 23603; i >= 21603; i--) {
    // await fetchTitle("https://ticketbox.vn/chan-troi-ruc-ro-2023-"+i);
    await fetchEvent(i);
  }
  console.log('Crawling completed. Titles written to titles.txt');
})();
