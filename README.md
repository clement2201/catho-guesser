# CAD Viewer for Google Drive

View, measure, and collaborate on DWG & DXF files directly in Google Drive — no AutoCAD needed.

[![Google Workspace Marketplace](https://img.shields.io/badge/Google%20Workspace-Marketplace-4285F4?logo=google&logoColor=white)](https://workspace.google.com/marketplace/app/cad_viewer_for_drive/23367937560)
[![Users](https://img.shields.io/badge/users-400%2B-green)](https://workspace.google.com/marketplace/app/cad_viewer/YOUR_APP_ID)
[![Rating](https://img.shields.io/badge/rating-4.9%20⭐-yellow)](https://workspace.google.com/marketplace/app/cad_viewer/YOUR_APP_ID)

## The Problem

Sharing CAD files shouldn't require a $2,000 AutoCAD license.

Your clients, contractors, and collaborators need to view your drawings. But instead of just opening the file, they ask you to "export it as PDF" or worse — they can't open it at all.

## The Solution

CAD Viewer brings the Google Docs experience to DWG files:

- **Click to view** — Preview DWG/DXF files directly in Google Drive and Gmail
- **Measure** — Take dimensions right in the browser
- **Comment** — Add annotations like you would in Google Docs
- **Share** — Send a link, they open it, done

No downloads. No software installs. No CAD expertise required.

## Features

| Feature | Description |
|---------|-------------|
| 📐 **Instant Preview** | View DWG & DXF files without leaving Google Drive |
| 📏 **Measuring Tools** | Take distances and dimensions directly in the browser |
| 💬 **Comments** | Google Docs-style annotations for team collaboration |
| 🔗 **Easy Sharing** | Share via link — recipients don't need CAD software |
| 🎨 **AI Rendering** | Generate photorealistic renders from your drawings |
| 📧 **Gmail Integration** | Preview CAD attachments without downloading |
| 🌙 **Dark/Light Mode** | Comfortable viewing in any environment |
| 📱 **Any Device** | Works on desktop, tablet, and mobile |

## How It Works

### Technical Details

DWG is a proprietary format owned by Autodesk, which makes building a viewer... challenging.

Here's how CAD Viewer handles it:

1. **DWG → DXF conversion** using [LibreDWG](https://www.gnu.org/software/libredwg/)
2. **Custom DXF parser** built from scratch to handle hundreds of entity types
3. **Browser-based renderer** for fast, interactive viewing

Building the DXF parser was a nightmare (in a fun way). Edge cases everywhere, fonts that haven't existed since the 90s, and entity types that seem to exist just to break things.

The renderings aren't perfect yet — some complex drawings still have quirks — but I'm improving it every week.

## Installation

1. Go to the [Google Workspace Marketplace](https://workspace.google.com/marketplace/app/cad_viewer_for_drive/23367937560?flow_type=2)
2. Click **Install**
3. Grant permissions
4. Open any DWG or DXF file in Google Drive

## Who Uses CAD Viewer

- **Engineers** sharing drawings with clients
- **Architects** collaborating with contractors
- **Dentists** reviewing CAD files from dental labs
- **Anyone** who receives DWG files but doesn't have AutoCAD

## Built With

- [LibreDWG](https://www.gnu.org/software/libredwg/) — DWG to DXF conversion
- Google Workspace Add-ons SDK
- React + Vite
- Google Cloud Functions

## Acknowledgments

Special thanks to the [LibreDWG](https://www.gnu.org/software/libredwg/) team for making DWG conversion possible without reverse-engineering a proprietary format.

## Feedback & Support

Found a rendering issue? Have a feature request?

- 📧 Email: contact@rhovium.com
- 🐛 [Report an issue](https://github.com/yourusername/cad-viewer/issues)
- ⭐ [Leave a review](https://workspace.google.com/marketplace/app/cad_viewer_for_drive/23367937560)

## Also Check Out

**[3D Viewer for Google Drive](https://3DViewer.co)** — View STL, OBJ, GLB and other 3D files directly in Google Drive.

---

Made with ☕ in Portugal by a solo dev who got tired of exporting PDFs.
