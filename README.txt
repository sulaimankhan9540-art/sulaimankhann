MECHANICAL ENGINEERING PORTFOLIO — PROJECT FOLDER
==================================================

HOW TO EDIT & RUN
-----------------
1. Open this folder in any code editor (VS Code recommended).
2. Edit the files below, then open index.html in your browser.
   (Tip: use the VS Code "Live Server" extension for auto-reload.)

FILE STRUCTURE
--------------
index.html      -> All page content & text. Search for "[" to find every
                   placeholder, e.g. [YOUR FULL NAME], [ADD EMAIL].
css/style.css   -> All colors, layout & styling.
                   Change the accent color in :root -> --accent
js/main.js      -> Menu, animations, gallery filters, case-study popups,
                   contact form behavior.
images/         -> Put your photos/renders here, then reference them like:
                   <img src="images/my-render.png" alt="...">
cv/             -> Put your PDF resume here, then link the Download CV
                   buttons to it:  <a href="cv/MyCV.pdf" download>

QUICK EDIT GUIDE
----------------
* Replace names/links   -> search "[YOUR" and "[ADD" in index.html
* Swap an image box     -> replace the <div class="ph">...</div> box with
                           an <img> tag pointing to your file in images/
* Change colors         -> css/style.css, :root variables at the top
* Update projects       -> each project card & case study is a clearly
                           labeled block in index.html / js/main.js

RULE: only publish information that is real — replace every placeholder.
