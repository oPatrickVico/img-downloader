import * as fs from 'fs';
import * as path from 'path';

async function downloadImage(url: string, extension: string, id: string) {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    const imageName = `image_${id}${extension}`;
    const imagePath = path.join(process.cwd(), imageName);

    fs.writeFileSync(imagePath, buffer);
    console.log(`Downloaded: ${url} -> ${imageName}`);
  } catch (error) {
    console.error(`Error downloading ${url}: ${error}`);
  }
}

async function downloadImages(urls: string[], extension: string) {
  for (let i = 0; i < urls.length; i++) {
    await downloadImage(urls[i], extension, '' + i);
  }
}

// Replace these sample URLs with the URLs you want to download
const imageUrls = [];

// Replace 'jpg' with the desired extension (e.g., 'png', 'jpeg', etc.)
const fileExtension = '.jpg';

while (true) {
  let entry = prompt('url>');
  if (!entry) {
    break;
  } else {
    imageUrls.push(entry);
    entry = '';
  }
}

if (!imageUrls[0].length) {
  console.log('No images found');
} else {
  // Start downloading images
  console.log('Downloading images...');
  downloadImages(imageUrls, fileExtension);
}
