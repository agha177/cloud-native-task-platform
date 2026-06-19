# 📌 Cloud-Native Task Management Platform

A production-style Kubernetes microservices application built from scratch on a self-managed Ubuntu VM — demonstrating real-world cloud-native architecture, container orchestration, and DevOps practices.

![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

---

## 🏗️ Architecture

```
                              Internet
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │   Ingress Controller    │
                    │        (nginx)          │
                    └────────────────────────┘
                                 │
              ┌──────────────────┴──────────────────┐
              │  /  → frontend     /api → backend    │
              ▼                                      ▼
     ┌──────────────────┐                  ┌──────────────────┐
     │     Frontend      │                  │    API Service    │
     │  (Nginx, static)  │                  │   (Flask, REST)    │
     │   Deployment       │                  │   Deployment +     │
     │   ClusterIP        │                  │   HPA (2–10 pods)  │
     └──────────────────┘                  └──────────────────┘
                                                       │
                                                       ▼
                                          ┌──────────────────────┐
                                          │       MongoDB          │
                                          │   StatefulSet + PVC     │
                                          │   (persistent storage)  │
                                          └──────────────────────┘
```

All internal communication uses Kubernetes' built-in DNS-based service discovery — no hardcoded IPs anywhere in the stack.

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Orchestration | Kubernetes (Minikube, multi-node) |
| Containerization | Docker |
| Backend API | Python / Flask |
| Frontend | Nginx (static HTML/CSS/JS) |
| Database | MongoDB (StatefulSet) |
| Ingress | NGINX Ingress Controller |
| Scaling | Horizontal Pod Autoscaler (CPU-based) |
| Storage | PersistentVolume / PersistentVolumeClaim |
| Config & Secrets | ConfigMaps & Secrets |

---

## 🚀 Features

- **Microservices architecture** — frontend and API decoupled, independently deployable and scalable
- **Ingress routing** — single entry point routes `/` to the frontend and `/api` to the backend
- **Stateful database** — MongoDB deployed as a StatefulSet with a PersistentVolumeClaim, so data survives pod restarts and rescheduling
- **Horizontal Pod Autoscaling** — the API service scales automatically between 2 and 10 replicas based on CPU usage
- **Resource governance** — every container defines CPU/memory `requests` and `limits`; the namespace enforces a `ResourceQuota`
- **Externalized configuration** — environment-specific values live in ConfigMaps; sensitive values (DB credentials) live in Secrets, never hardcoded
- **Service discovery** — services communicate via Kubernetes DNS (e.g. `mongodb-service.task-platform.svc.cluster.local`), not static IPs
- **Update strategies** — rolling updates for the frontend/API, demonstrating zero-downtime deployments

---

## 📂 Project Structure

```
cloud-native-task-platform/
├── frontend/                  # Static frontend (HTML/CSS/JS) + Dockerfile
├── api-service/               # Flask REST API + Dockerfile
├── k8s-manifests/
│   ├── namespace.yml
│   ├── resource-quota.yml
│   ├── configmap.yml
│   ├── secrets.yml
│   ├── mongodb-pv.yml
│   ├── mongodb-pvc.yml
│   ├── mongodb-statefulset.yml
│   ├── mongodb-service.yml
│   ├── api-deployment.yml
│   ├── api-service.yml
│   ├── api-hpa.yml
│   ├── frontend-deployment.yml
│   ├── frontend-service.yml
│   └── ingress.yml
└── screenshots/                # Demo screenshots
```

---

## 🔧 How to Run Locally

**Prerequisites:** Minikube, kubectl, Docker

```bash
# 1. Start Minikube with an Ingress-ready driver
minikube start --driver=docker

# 2. Enable the Ingress addon
minikube addons enable ingress

# 3. Build the service images inside Minikube's Docker env
eval $(minikube docker-env)
docker build -t api-service:1.0 ./api-service
docker build -t frontend:1.0 ./frontend

# 4. Deploy everything
kubectl apply -f k8s-manifests/

# 5. Map the Ingress host to Minikube's IP
echo "$(minikube ip) nginx.local" | sudo tee -a /etc/hosts
```

Then visit:

```
http://nginx.local
```

---

## 📈 Watching the Autoscaler in Action

```bash
# Watch HPA metrics live
kubectl get hpa -n task-platform -w

# Watch pods scale up/down in real time
kubectl get pods -n task-platform -w

# Generate load to trigger scaling
kubectl run load-generator --image=busybox --restart=Never -- \
  /bin/sh -c "while true; do wget -q -O- http://api-service.task-platform.svc.cluster.local; done"
```

---

## 🎯 What This Project Demonstrates

- Designing and deploying a multi-service application on Kubernetes
- Configuring Ingress-based routing for multiple backends
- Managing stateful workloads with persistent storage
- Implementing autoscaling driven by real resource metrics
- Separating configuration/secrets from application code
- Applying resource governance at the namespace level

---

## 👨‍💻 Author

**Abdelrahman Agha**
[GitHub](https://github.com/agha177)
