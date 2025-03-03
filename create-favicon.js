const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Using absolute paths to avoid confusion
const inputPath = path.join(__dirname, 'public', 'esp.jpg');
const outputPath = path.join(__dirname, 'public', 'favicon.ico');

// Function to convert JPG to ICO
async function convertToIco() {
  try {
    console.log('Input path:', inputPath);
    console.log('Output path:', outputPath);
    
    // Resize to 32x32 (standard favicon size)
    const imageBuffer = await sharp(inputPath)
      .resize({
        width: 32,
        height: 32,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFormat('png')
      .toBuffer();

    // Write to file
    fs.writeFileSync(outputPath, imageBuffer);
    
    console.log('Favicon created successfully!');
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

convertToIco(); 