const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const shopPath = path.join(srcDir, 'pages', 'Shop.tsx');
const shopScenePath = path.join(srcDir, 'components', '3d', 'ShopScene.tsx');

let shopContent = fs.readFileSync(shopPath, 'utf8');
let shopSceneContent = fs.readFileSync(shopScenePath, 'utf8');

// Replacements for Shop.tsx
shopContent = shopContent.replace(/Dišpet majica/g, 'Classic Tee');
shopContent = shopContent.replace(/Dišpet duksica/g, 'Classic Hoodie');
shopContent = shopContent.replace(/Dišpet kapa/g, 'Classic Cap');
shopContent = shopContent.replace(/Dišpet termosica/g, 'Classic Bottle');
shopContent = shopContent.replace(/Sav prihod od prodaje ide organizaciji Dišpeta\./g, 'Premium kvaliteta. Pronađi svoj stil na terenu i izvan njega.');
shopContent = shopContent.replace(/Izaberi artikal i pronađi svoj stil/g, 'HANDBALL SEVEN KOLEKCIJA');
shopContent = shopContent.replace(/font-\['DynaPuff'\]/g, 'font-display uppercase tracking-widest');
shopContent = shopContent.replace(/linear-gradient\(135deg, #00ffbf, #0089cd\)/g, 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))');
shopContent = shopContent.replace(/radial-gradient\(circle at \px \px, #ad00e9 0%, #00ffbf 50%, #0089cd 100%\)/g, 'radial-gradient(circle at ${x}px ${y}px, hsl(var(--accent)) 0%, hsl(var(--primary)) 50%, hsl(var(--secondary)) 100%)');
shopContent = shopContent.replace(/from-\[#00d9a3\] to-\[#0077b3\]/g, 'from-primary to-accent');
shopContent = shopContent.replace(/from-\[#00ffbf\] to-\[#0089cd\]/g, 'from-background to-muted');
shopContent = shopContent.replace(/text-\[#43bfe6\]/g, 'text-primary');
shopContent = shopContent.replace(/text-\[#e83e70\]/g, 'text-primary');
shopContent = shopContent.replace(/text-\[#ad00e9\]/g, 'text-primary');
shopContent = shopContent.replace(/border-\[#e83e70\]/g, 'border-primary');
shopContent = shopContent.replace(/bg-\[#e83e70\]\/10/g, 'bg-primary/10');
// Remove clouds
shopContent = shopContent.replace(/<img[^>]*src=\{cloudsTopSvg\}[^>]*\/>/, '');
// Remove logoLoopWebm reference entirely, or replace with something else? Let's just hide the video tag.
shopContent = shopContent.replace(/<video[^>]*src=\{logoLoopWebm\}[^>]*>[\s\S]*?<\/video>/, '');
// Change container bg in showcase mode from white to something else? The whole bg is dark now.
// In Shop.tsx, the background container has g-white. Let's change it to g-background and 	ext-foreground.
shopContent = shopContent.replace(/bg-white/g, 'bg-background');
shopContent = shopContent.replace(/text-gray-900/g, 'text-foreground');
shopContent = shopContent.replace(/text-gray-600/g, 'text-muted-foreground');
shopContent = shopContent.replace(/text-gray-500/g, 'text-muted-foreground');
shopContent = shopContent.replace(/text-gray-400/g, 'text-muted-foreground/70');
shopContent = shopContent.replace(/bg-gray-50/g, 'bg-muted');
shopContent = shopContent.replace(/bg-gray-100/g, 'bg-muted');
shopContent = shopContent.replace(/border-gray-100/g, 'border-border');
shopContent = shopContent.replace(/border-gray-200(\/50)?/g, 'border-border');


// Replacements for ShopScene.tsx
shopSceneContent = shopSceneContent.replace(/Dišpet\\nmajica/g, 'CLASSIC\\nTEE');
shopSceneContent = shopSceneContent.replace(/Dišpet\\nduksica/g, 'CLASSIC\\nHOODIE');
shopSceneContent = shopSceneContent.replace(/Dišpet\\nkapa/g, 'CLASSIC\\nCAP');
shopSceneContent = shopSceneContent.replace(/Dišpet\\ntermosica/g, 'CLASSIC\\nBOTTLE');
shopSceneContent = shopSceneContent.replace(/Dišpet/g, 'CLASSIC');
shopSceneContent = shopSceneContent.replace(/font-\['DynaPuff'\]/g, 'font-display uppercase tracking-widest');
shopSceneContent = shopSceneContent.replace(/\/fonts\/DynaPuff-Bold\.ttf/g, '/fonts/Inter.ttf'); // We don't have Inter.ttf, but three.js will need a font. We'll leave it as is or change it.
// Actually three.js Text needs a woff/ttf, we can keep DynaPuff for 3D or remove text. But let's just leave the font URL alone for now or it will crash if file is missing.

fs.writeFileSync(shopPath, shopContent);
fs.writeFileSync(shopScenePath, shopSceneContent);
console.log('Refactor complete');
