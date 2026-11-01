# Maintaining the public CV

`data/career.json` supplies the career timeline, HTML CV, and downloadable PDF. `data/resume.json` supplies the CV summary, education, languages, and linked work. The public CV is a concise overview; the case studies provide more context.

## Update

1. Edit the shared JSON records. Preserve verified dates and titles. Scope historical team outcomes carefully; do not present a speech-recognition workload as a count of Contact Center AI users.
2. Update the display date in `data/resume.json` when changing CV content.
3. Install Python dependencies with `python3 -m pip install -r scripts/requirements-resume.txt`. Install the DejaVu Sans fonts, or set `RESUME_FONT_DIR` to their directory.
4. Run `python3 scripts/build-resume.py`. It creates the two-page PDF and its source manifest.
5. Render the PDF with `pdftoppm -png public/assets/Matt-Ghoreishi-CV.pdf /tmp/matt-cv` and inspect both pages for clipping, spacing, and link text. The HTML CV remains the semantic, accessible reading option; the PDF is not a tagged PDF/UA document.
6. Run `node scripts/check-resume.cjs`, plus the normal site checks. Commit the JSON, generator changes, PDF, and manifest together.

The consistency check detects changes to either shared content file, the generator, or the downloadable PDF without a matching regeneration. It does not replace factual review or visual inspection. The PDF has clickable contact, case-study, writing, and tool links. Keep its content limited to professional experience and intended contact links.
