# Khaled Hmani - Professional Resume Website

A fast, accessible, single-page resume website built with vanilla HTML, CSS, and JavaScript. Features dark/light mode, print-friendly styling, and interactive elements.

## 🚀 Quick Start

1. **Clone or download** the files to your local machine
2. **Open** `index.html` in your web browser
3. **That's it!** The site runs entirely in the browser with no build process required

## 📁 File Structure

```
resume-website/
├── index.html          # Main HTML structure
├── styles.css          # All styling and themes
├── script.js           # Interactive functionality
└── README.md           # This file
```

## ✨ Features

- **🎨 Dark/Light Mode**: Toggle with persistence via localStorage
- **📱 Mobile-First**: Responsive design that works on all devices
- **♿ Accessible**: Semantic HTML5, proper focus states, sufficient contrast
- **🖨️ Print-Ready**: Optimized print styles for clean PDF export
- **⚡ Fast**: No external dependencies, optimized performance
- **🎯 Interactive**: Scroll spy navigation, copy-to-clipboard, skill filtering

## 🛠️ Customization

### Updating Content

Edit the profile data directly in `index.html`:

```html
<!-- Update personal information in the hero section -->
<h1 class="hero-name">Your Name</h1>
<p class="hero-headline">Your Professional Headline</p>

<!-- Update contact information -->
<a href="mailto:your.email@example.com">your.email@example.com</a>
<a href="tel:+1234567890">+1234567890</a>
```

### Changing Colors

Modify CSS variables in `styles.css`:

```css
:root {
    --accent: #0F766E;    /* Primary accent color */
    --bg: #ffffff;        /* Background color */
    --text: #1e293b;      /* Text color */
}
```

Popular accent color options:
- Blue: `#2563eb`
- Green: `#059669`
- Purple: `#7c3aed`
- Orange: `#ea580c`

### Adding Sections

1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Update navigation links if needed

### Updating Skills/Technologies

Edit the skills grid in `index.html`:

```html
<div class="skills-grid">
    <span class="skill-tag" data-category="your-category">Your Skill</span>
    <!-- Add more skills here -->
</div>
```

Categories: `project-management`, `automation`, `analytics`

## 📤 Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Upload all files
3. Go to Settings → Pages
4. Select "Deploy from a branch" → `main` → `/` (root)
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop the folder into Netlify's deploy area
3. Site will be live instantly with auto-generated URL
4. Optional: Configure custom domain

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts
4. Site will be deployed with auto-generated URL

### Traditional Web Hosting

Upload all files to your web hosting provider's public folder (usually `public_html` or `www`).

## 🖨️ Generating PDF Resume

### Method 1: Browser Print
1. Click the "Download PDF" button
2. In the print dialog, select "Save as PDF"
3. Adjust margins if needed (recommended: minimum margins)

### Method 2: Direct Browser Print
1. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
2. Select "Save as PDF" as destination
3. Choose "More settings" → Paper size: A4 or Letter

### Print Optimization Tips
- The print styles automatically hide navigation and interactive elements
- Content is reformatted for optimal PDF layout
- Links show full URLs in print version
- Colors are optimized for both color and grayscale printing

## 🔧 Technical Details

### Performance Features
- **Vanilla JavaScript**: No frameworks, minimal overhead
- **CSS Variables**: Efficient theming system
- **Intersection Observer**: Smooth scroll spy functionality
- **localStorage**: Theme preference persistence
- **Semantic HTML**: Better SEO and accessibility

### Browser Support
- **Modern browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Progressive enhancement**: Graceful degradation for older browsers
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 88+

### SEO Features
- **Meta tags**: Title, description, Open Graph, Twitter Cards
- **JSON-LD**: Structured data for search engines
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Fast loading**: Critical CSS inlined, minimal external requests

## 🛡️ Security

- No external tracking by default
- No external dependencies
- HTTPS recommended for production
- Content Security Policy ready

## 📊 Analytics (Optional)

To add Google Analytics 4:

1. Uncomment the analytics section in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

2. Replace `GA_MEASUREMENT_ID` with your actual tracking ID

3. Uncomment the gtag configuration in `script.js`

## 🐛 Troubleshooting

### Theme not switching
- Check browser console for JavaScript errors
- Ensure localStorage is enabled in browser settings

### Print styles not working
- Try different browsers (Chrome usually works best)
- Check print preview before saving as PDF
- Ensure CSS is fully loaded before printing

### Mobile display issues
- Clear browser cache
- Check viewport meta tag is present
- Test in different mobile browsers

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Last Updated**: January 2025

For questions or support, contact: [mrkhaled.hmani@gmail.com](mailto:mrkhaled.hmani@gmail.com)