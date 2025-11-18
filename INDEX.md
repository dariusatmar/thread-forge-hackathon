# 📚 Hackathon Project Index

## Welcome! 🎉

You have **two complete versions** of the Outage Dashboard application.

---

## 🗂️ Project Versions

### 1. Flask Version (Original - Python)
**Location**: `outage_dashboard/`
**Quick Start**: [GET_STARTED.md](GET_STARTED.md)

### 2. Next.js Version (NEW - TypeScript/React) ⭐
**Location**: `outage-dashboard-nextjs/`
**Quick Start**: [GET_STARTED_NEXTJS.md](GET_STARTED_NEXTJS.md)

---

## 📖 Documentation Navigation

### Getting Started Guides

| Document | Purpose | Version | Time |
|----------|---------|---------|------|
| [GET_STARTED.md](GET_STARTED.md) | Flask setup & usage | Flask | 5 min |
| [GET_STARTED_NEXTJS.md](GET_STARTED_NEXTJS.md) | Next.js setup & usage | Next.js | 5 min |

### Next.js Documentation

Located in `outage-dashboard-nextjs/`:

| Document | Purpose | Length | Audience |
|----------|---------|--------|----------|
| [README.md](outage-dashboard-nextjs/README.md) | Complete reference | 500+ lines | Everyone |
| [QUICKSTART.md](outage-dashboard-nextjs/QUICKSTART.md) | Fast setup | 100+ lines | Developers |
| [MIGRATION.md](outage-dashboard-nextjs/MIGRATION.md) | Flask→Next.js guide | 300+ lines | Migration team |
| [FEATURES.md](outage-dashboard-nextjs/FEATURES.md) | Feature details | 400+ lines | Product/Dev |
| [PROJECT_SUMMARY.md](outage-dashboard-nextjs/PROJECT_SUMMARY.md) | Executive summary | 400+ lines | Management |

### Flask Documentation

Located in `outage_dashboard/`:

| Document | Purpose |
|----------|---------|
| INDEX.md | Navigation guide |
| README.md | Complete documentation |
| QUICKSTART.md | 5-minute setup |
| FEATURES.md | Feature list |
| ARCHITECTURE.md | Technical details |

---

## 🚀 Quick Start Paths

### Path 1: I Want Flask (Python)
```cmd
cd outage_dashboard
run.bat
# Open http://localhost:5000
```
📖 Guide: [GET_STARTED.md](GET_STARTED.md)

### Path 2: I Want Next.js (Modern)
```cmd
cd outage-dashboard-nextjs
setup.bat
npm run dev
# Open http://localhost:3000
```
📖 Guide: [GET_STARTED_NEXTJS.md](GET_STARTED_NEXTJS.md)

### Path 3: I Want Both (Side-by-side)
```cmd
# Terminal 1: Flask
cd outage_dashboard
run.bat

# Terminal 2: Next.js
cd outage-dashboard-nextjs
npm run dev

# Flask: http://localhost:5000
# Next.js: http://localhost:3000
```

---

## 🔍 What's in This Repository?

### Applications

```
hackathon/
├── 🐍 outage_dashboard/           # Flask Python application
│   ├── app.py                     # Main Flask app
│   ├── templates/index.html       # Frontend
│   ├── run.bat                    # Windows launcher
│   └── [docs]                     # Documentation
│
├── ⚛️ outage-dashboard-nextjs/    # Next.js TypeScript application
│   ├── app/                       # Next.js App Router
│   │   ├── api/                   # API routes
│   │   ├── components/            # React components
│   │   └── page.tsx               # Main dashboard
│   ├── lib/                       # Utilities
│   ├── prisma/                    # Database schema
│   ├── setup.bat                  # Setup script
│   └── [docs]                     # Documentation
│
├── 📊 data/                       # Data files
│   ├── customers.csv
│   ├── call_data.csv
│   └── merged_call_data.csv
│
├── 🏭 transcript_factory/         # Data generation scripts
│   └── generate_transcripts.py   # Claude API scripts
│
├── 📋 schemas/                    # Database schemas
│   ├── call_data.json
│   ├── transcript_data.json
│   └── customers.json
│
└── 📚 Documentation/
    ├── INDEX.md                   # This file
    ├── GET_STARTED.md            # Flask guide
    ├── GET_STARTED_NEXTJS.md     # Next.js guide
    └── [other docs]
```

---

## 🆚 Version Comparison

### When to Use Flask

✅ **Use Flask if you:**
- Prefer Python over JavaScript/TypeScript
- Want simpler deployment (no build step)
- Need minimal dependencies
- Are comfortable with Python
- Want traditional server-side rendering
- Prefer vanilla JavaScript

### When to Use Next.js

✅ **Use Next.js if you:**
- Want modern React architecture
- Need TypeScript type safety
- Want 3D visualizations (Three.js)
- Prefer component-based UI
- Need faster performance
- Want better developer experience
- Plan to scale the application
- Want smooth animations
- Prefer modern tooling

### Feature Comparison

| Feature | Flask | Next.js |
|---------|-------|---------|
| **Language** | Python | TypeScript |
| **Framework** | Flask | Next.js 14 |
| **Frontend** | Vanilla JS | React 18 |
| **Styling** | Custom CSS | Tailwind CSS |
| **2D Maps** | ✅ Leaflet | ✅ React Leaflet |
| **3D Views** | ❌ No | ✅ Three.js |
| **Charts** | ✅ Chart.js | ✅ react-chartjs-2 |
| **Animations** | CSS | Framer Motion |
| **API** | Flask routes | Next.js API Routes |
| **Database** | psycopg2 | Prisma ORM |
| **Type Safety** | No | Full TypeScript |
| **Build Step** | None | Next.js build |
| **Hot Reload** | Basic | Instant HMR |
| **Port** | 5000 | 3000 |
| **Setup Time** | 3 min | 5 min |
| **Performance** | Good | Excellent |

---

## 🎯 Use Cases

### Flask Version - Best For:
- Quick prototypes
- Python teams
- Simple deployments
- Internal tools
- Learning Flask
- Traditional web apps

### Next.js Version - Best For:
- Production applications
- Modern web apps
- TypeScript projects
- Large teams
- Scalable architecture
- Complex UIs
- Performance-critical apps
- Public-facing sites

---

## 📊 Technical Stack Overview

### Flask Stack
```
Frontend:
├── HTML5
├── CSS3
├── Vanilla JavaScript
├── Leaflet.js (maps)
└── Chart.js (charts)

Backend:
├── Flask 3.0.0
├── PostgreSQL
├── psycopg2 (database)
└── pandas (data)
```

### Next.js Stack
```
Frontend:
├── Next.js 14
├── React 18
├── TypeScript 5.6
├── Tailwind CSS
├── React Leaflet (2D maps)
├── Three.js + React Three Fiber (3D)
├── Chart.js + react-chartjs-2
├── Framer Motion (animations)
└── Lucide React (icons)

Backend:
├── Next.js API Routes
├── PostgreSQL
├── Prisma ORM
└── TanStack Query (data fetching)
```

---

## 🛠️ Prerequisites

### Flask Version
- ✅ Python 3.8+
- ✅ PostgreSQL
- ✅ pip (Python package manager)

### Next.js Version
- ✅ Node.js 18+
- ✅ npm/yarn/pnpm
- ✅ PostgreSQL

### Both Versions
- ✅ PostgreSQL database with data
- ✅ Database credentials
- ✅ Modern web browser

---

## 🚀 Deployment Options

### Flask
- Traditional Python hosting
- Gunicorn + Nginx
- Docker container
- Heroku
- PythonAnywhere
- Azure App Service

### Next.js
- **Vercel** (recommended - easiest)
- Docker container
- Traditional Node.js hosting
- AWS Amplify
- Azure Static Web Apps
- Netlify
- Self-hosted with PM2

---

## 📈 Migration Path

If you want to migrate from Flask to Next.js:

1. **Read Migration Guide**: [MIGRATION.md](outage-dashboard-nextjs/MIGRATION.md)
2. **Run Both Versions** side-by-side for testing
3. **Compare Results** to verify data accuracy
4. **Train Team** on Next.js/React/TypeScript
5. **Gradual Cutover** when ready

**Timeline**: 1-2 weeks for full migration

---

## 🎓 Learning Resources

### Flask Version
- Flask: https://flask.palletsprojects.com/
- Leaflet.js: https://leafletjs.com/
- Chart.js: https://www.chartjs.org/

### Next.js Version
- Next.js: https://nextjs.org/learn
- React: https://react.dev/learn
- TypeScript: https://www.typescriptlang.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs
- Prisma: https://www.prisma.io/docs
- Three.js: https://threejs.org/docs/
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber

---

## 🐛 Troubleshooting

### Flask Issues
See: [GET_STARTED.md](GET_STARTED.md) → Troubleshooting

### Next.js Issues
See: [GET_STARTED_NEXTJS.md](GET_STARTED_NEXTJS.md) → Troubleshooting

### Database Issues
Both versions use the same PostgreSQL database:

```bash
# Test connection
psql -h localhost -U postgres -d postgres

# Check tables
\dt team_thread_forge.*
\dt public.customers

# Verify data
SELECT COUNT(*) FROM team_thread_forge.call_data;
SELECT COUNT(*) FROM team_thread_forge.transcript_data;
SELECT COUNT(*) FROM public.customers;
```

---

## 📞 Support

### Documentation
- Flask: See `outage_dashboard/` docs
- Next.js: See `outage-dashboard-nextjs/` docs
- This file: Navigation guide

### Quick Help
1. Check appropriate GET_STARTED guide
2. Review README in project folder
3. Check browser console (F12)
4. Verify database connection
5. Check application logs

---

## 🎯 Recommended Path

### For New Users
1. Start with Flask version (simpler)
2. Get familiar with features
3. Try Next.js version
4. Compare both
5. Choose based on your needs

### For Production
1. Review both versions
2. Consider team skills
3. Evaluate requirements
4. Test performance
5. Choose Next.js for scalability
6. Choose Flask for simplicity

---

## ✅ Success Checklist

### Flask Version
- [ ] Python 3.8+ installed
- [ ] PostgreSQL running
- [ ] `.env` configured
- [ ] `run.bat` executed
- [ ] Dashboard at http://localhost:5000
- [ ] Data displays correctly

### Next.js Version
- [ ] Node.js 18+ installed
- [ ] PostgreSQL running
- [ ] `.env` configured
- [ ] Dependencies installed
- [ ] Prisma client generated
- [ ] Dashboard at http://localhost:3000
- [ ] Data displays correctly
- [ ] 3D view works

---

## 🎉 Summary

You now have:

✅ **Two complete applications**
- Flask (Python) - Traditional & simple
- Next.js (TypeScript) - Modern & scalable

✅ **Comprehensive documentation**
- Setup guides for both
- Migration guide
- Feature documentation
- Technical details

✅ **Ready for production**
- Both versions tested
- Database compatible
- Deployment ready
- Well documented

**Choose the version that best fits your needs and team! 🚀**

---

## 🗺️ Navigation

### I want to...

- **Start with Flask**: → [GET_STARTED.md](GET_STARTED.md)
- **Start with Next.js**: → [GET_STARTED_NEXTJS.md](GET_STARTED_NEXTJS.md)
- **Compare versions**: → Read "Version Comparison" section above
- **Migrate Flask→Next.js**: → [MIGRATION.md](outage-dashboard-nextjs/MIGRATION.md)
- **Learn about features**: → [FEATURES.md](outage-dashboard-nextjs/FEATURES.md)
- **Understand architecture**: → [PROJECT_SUMMARY.md](outage-dashboard-nextjs/PROJECT_SUMMARY.md)
- **Deploy to production**: → [README.md](outage-dashboard-nextjs/README.md) → Deployment
- **Troubleshoot issues**: → GET_STARTED guides → Troubleshooting

---

**Last Updated**: 2025-11-18
**Status**: ✅ Both Versions Production Ready
**Total Documentation**: 3000+ lines
**Total Code**: 3000+ lines

**Happy coding! 🎊**
