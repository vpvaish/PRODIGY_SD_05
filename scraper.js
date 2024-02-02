const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.bigcommerce.com/articles/ecommerce/best-ecommerce-website-design/'; // Replace with the actual URL of the e-commerce website

async function scrape() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const products = [];

    // Replace these selectors with the actual HTML structure of the e-commerce website
    $('div.product').each((index, element) => {
      const name = $(element).find('h2.product-name').text().trim();
      const price = $(element).find('span.product-price').text().trim();
      const rating = $(element).find('span.product-rating').text().trim();

      products.push({
        name,
        price,
        rating,
      });
    });

    // Write the data to a CSV file
    const csvData = products.map(product => `${product.name},${product.price},${product.rating}`).join('\n');
    fs.writeFileSync('products.csv', 'Name,Price,Rating\n' + csvData, 'utf-8');

    console.log('Scraping completed. Data saved to products.csv');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

scrape();
