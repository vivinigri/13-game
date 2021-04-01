export const injectStylesIntoHTML = (html: string) => {
  return (
    html +
    `<script> (function loadStyles() { var style = document.createElement("style"); style.innerHTML = "html {display: flex; justify-content: center; } body { max-width: 780px; } h1 { -webkit-font-smoothing: antialiased; font: 400 16px/1.5 'IBM Plex Sans',sans-serif; box-sizing: border-box; margin: 0 0 0.875rem; font-family: 'IBM Plex Serif'; line-height: 1.125; padding-top: 3em; margin-top: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; } p { -webkit-font-smoothing: antialiased; font: 400 16px/1.5 'IBM Plex Sans',sans-serif; box-sizing: border-box; margin: 0 0 0.75rem; font-size: 12px; text-align: justify; } ul { -webkit-font-smoothing: antialiased; font: 400 16px/1.5 'IBM Plex Sans',sans-serif; box-sizing: border-box; padding: 0; margin: 0; margin-left: 1.5em; margin-bottom: 0.75em; list-style-type: disc; } li { -webkit-font-smoothing: antialiased; font: 400 16px/1.5 'IBM Plex Sans',sans-serif; list-style-type: disc; box-sizing: border-box; margin: 0; font-size: 12px; } "; document.head.appendChild(style); })(); </script>`
  );
};
