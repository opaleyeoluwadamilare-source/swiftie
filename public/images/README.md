# Images Directory

## Required Images

### Taylor Swift Image
Place a Taylor Swift image in this directory. The component will automatically detect and use the best available format in this priority order:

1. **`taylor-swift.webp`** (preferred - best compression)
2. `taylor-swift.jpg` (fallback)
3. `taylor-swift.png` (fallback)

If no image is found, a sparkle emoji (✨) will be displayed as a fallback.

### Image Requirements:
- **Formats Supported**: WebP (preferred), JPG, or PNG
- **Size**: At least 200x200px (square recommended)
- **Aspect Ratio**: 1:1 (square) works best for circular display
- **File Size**: Keep under 500KB for optimal performance

### WebP Format Benefits:
- **Smaller file size**: Typically 25-35% smaller than JPG/PNG
- **Better quality**: Superior compression algorithm
- **Faster loading**: Improved page performance
- **Wide browser support**: Supported in all modern browsers

### Converting to WebP:
You can convert existing images to WebP using:
- Online tools: [Squoosh](https://squoosh.app/), [CloudConvert](https://cloudconvert.com/)
- Command line: `cwebp input.jpg -o output.webp`
- Image editors: Photoshop, GIMP, etc.

### Where to get the image:
You can use any publicly available image of Taylor Swift. Make sure you have the rights to use it.

### Example sources:
- Official press photos
- Public domain images
- Images you have licensed

The image will be displayed in a circular frame with a purple border and glow effect. The component automatically detects which format is available and uses the best one.

## Troubleshooting

If images aren't loading:
1. Check that the file exists in `/public/images/`
2. Verify the filename matches exactly (case-sensitive)
3. Check browser console for any error messages
4. Ensure the image file isn't corrupted
5. Try a different format (WebP, JPG, or PNG)
