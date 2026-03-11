const { Jimp } = require('jimp');

async function processIcon() {
    const image = await Jimp.read('public/logo-source.png');

    // We want to isolate the brain/halo. It is prominently cyan/blue, so it has high G and B values.
    // The background grid is dark grey. The text "M N E M I X" is also cyan but it is at the bottom.
    // Let's find the bounding box of the brain by finding "bright cyan" pixels in the top 80% of the image.

    let minX = image.bitmap.width, minY = image.bitmap.height, maxX = 0, maxY = 0;

    // Scan for bright pixels to find the brain.
    // We scan up to 520 pixels to capture the full brain but still avoid the MNEMIX text (starts at ~538).
    image.scan(0, 0, image.bitmap.width, 520, function (x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];

        // Characteristic of cyan/bright: High G and B, or just generally bright enough to not be background grid
        if (Math.max(r, g, b) > 80) {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }
    });

    // Add a small amount of padding to ensure the soft glow isn't clipped
    const padding = 10;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(image.bitmap.width - 1, maxX + padding);
    maxY = Math.min(image.bitmap.height - 1, maxY + padding);

    console.log("Brain bounds with padding:", minX, minY, maxX, maxY);

    if (maxX >= minX && maxY >= minY) {
        // We know the brain is roughly circular/hexagonal. Let's enforce a perfectly square bounding box tightly around it.
        const width = maxX - minX + 1;
        const height = maxY - minY + 1;
        const size = Math.max(width, height);

        const centerX = minX + Math.floor(width / 2);
        const centerY = minY + Math.floor(height / 2);

        let cropX = centerX - Math.floor(size / 2);
        let cropY = centerY - Math.floor(size / 2);

        if (cropX < 0) cropX = 0;
        if (cropY < 0) cropY = 0;

        let finalSize = size;
        if (cropX + finalSize > image.bitmap.width) finalSize = image.bitmap.width - cropX;
        if (cropY + finalSize > image.bitmap.height) finalSize = Math.min(finalSize, image.bitmap.height - cropY);

        console.log("Square crop box:", cropX, cropY, finalSize, finalSize);

        // Now we wipe EVERYTHING outside this box, AND we apply aggressive alpha transparency to the INSIDE of the box.
        // We want to remove the faint dark grid. The grid has rgb values around 15-30.
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            if (x < cropX || x >= cropX + finalSize || y < cropY || y >= cropY + finalSize) {
                // Completely erase outside the box (kills the text and outer grid)
                this.bitmap.data[idx + 0] = 0;
                this.bitmap.data[idx + 1] = 0;
                this.bitmap.data[idx + 2] = 0;
                this.bitmap.data[idx + 3] = 0;
            } else {
                // Inside the box, make the dark background grid transparent.
                const r = this.bitmap.data[idx + 0];
                const g = this.bitmap.data[idx + 1];
                const b = this.bitmap.data[idx + 2];
                let a = Math.max(r, g, b);

                // If the pixel is dark enough (i.e. background grid), make it 100% transparent.
                // The grid seems to max out around 30-40. Let's use 50 to be incredibly safe.
                if (a < 50) {
                    this.bitmap.data[idx + 3] = 0;
                } else {
                    // For the glowing brain lines, we leave them fully opaque, but we could also scale their alpha
                    // to give soft anti-aliased edges.
                    // Scale alpha up so the bright parts stay completely opaque.
                    let newA = Math.min(255, (a - 50) * 2);
                    this.bitmap.data[idx + 3] = newA;

                    // Un-premultiply RGB if we are applying partial transparency
                    if (newA > 0 && newA < 255) {
                        this.bitmap.data[idx + 0] = Math.min(255, (r * 255) / newA);
                        this.bitmap.data[idx + 1] = Math.min(255, (g * 255) / newA);
                        this.bitmap.data[idx + 2] = Math.min(255, (b * 255) / newA);
                    }
                }
            }
        });

        // Finally, crop exactly to the square
        image.crop({ x: cropX, y: cropY, w: finalSize, h: finalSize });

        await image.write('public/logo.png');
        console.log("Saved public/logo.png");

        image.resize({ w: 512, h: 512 });
        await image.write('public/icon.png');
        console.log("Saved public/icon.png");
    } else {
        console.log("Failed to find brain.");
    }
}

processIcon().catch(console.error);
