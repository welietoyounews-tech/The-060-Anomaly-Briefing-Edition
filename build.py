from pathlib import Path
root = Path(__file__).resolve().parent
html = (root / 'index.html').read_text()
html = html.replace('<link rel="stylesheet" href="style.css">', '<style>' + (root / 'style.css').read_text() + '</style>')
for name in ('models.js', 'app.js'):
    html = html.replace(f'<script src="{name}"></script>', '<script>\n' + (root / name).read_text() + '\n</script>')
(root / 'PLAY.html').write_text(html)
print('Built PLAY.html')
