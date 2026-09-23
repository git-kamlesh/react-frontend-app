# React Enterprise Portal

A production-grade enterprise React Single Page Application (SPA) scaffolded with **Vite**, **Tailwind CSS**, **Redux Toolkit**, and designed for **OpenShift** containerised deployment via a multi-stage **Nginx** Docker image.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| State Management | Redux Toolkit + React-Redux |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Container | Docker multi-stage (Node 20 → Nginx) |
| Runtime Server | Nginx (OpenShift non-root compliant) |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://127.0.0.1:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Docker Build & Run

```bash
# Build the container image
docker build -t react-frontend-app:latest .

# Run locally on port 8080
docker run -p 8080:8080 react-frontend-app:latest
```

---

## OpenShift Deployment

### Prerequisites
- OpenShift CLI (`oc`) logged in to your cluster
- A project/namespace created: `oc new-project react-portal`

### Steps

```bash
# 1. Build and push to your internal registry
oc new-build --name=react-frontend-app --binary --strategy=docker -n react-portal
oc start-build react-frontend-app --from-dir=. --follow -n react-portal

# 2. Deploy the application
oc new-app react-frontend-app -n react-portal

# 3. Expose via an OpenShift Route (TLS edge termination)
oc create route edge react-portal \
  --service=react-frontend-app \
  --port=8080 \
  -n react-portal

# 4. Check rollout status
oc rollout status deployment/react-frontend-app -n react-portal

# 5. Get the public URL
oc get route react-portal -n react-portal -o jsonpath='{.spec.host}'
```

### Security Notes
- The Nginx container runs as UID **1001** (non-root) for OpenShift compatibility.
- `nginx.conf` binds to port **8080** (unprivileged) as required by OpenShift's security context constraints (SCC).
- All writable runtime directories (`/var/cache/nginx`, `/var/log/nginx`, `/var/run`) are chowned to the app user during build.

---

## Project Structure

```
react-frontend-app/
├── public/
├── src/
│   ├── store/
│   │   ├── store.js          # Redux configureStore
│   │   └── counterSlice.js   # Example Redux slice
│   ├── App.jsx               # Root component with layout + routes
│   ├── main.jsx              # Entry point (Provider, BrowserRouter)
│   └── index.css             # Tailwind directives
├── Dockerfile                # Multi-stage build
├── nginx.conf                # OpenShift-compatible Nginx config
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── package.json
```

---

## Related Jira Issue
**KAN-8** — Develop ReactJS Frontend Portal
