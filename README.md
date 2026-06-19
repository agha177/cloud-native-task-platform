📌 Cloud-Native Task Management Platform

A production-style Kubernetes-based microservices application demonstrating real-world cloud-native architecture patterns.

🏗️ Architecture
Internet
   ↓
Ingress Controller (nginx)
   ↓
──────────────────────────────
│            │               │
Frontend   API Service   MongoDB
(Nginx)    (Flask)       (StatefulSet + PVC)
   │            │
   └───────┬────┘
           ↓
        MongoDB
⚙️ Tech Stack
Kubernetes (Minikube)
Docker
Flask (Backend API)
Nginx (Frontend)
MongoDB (StatefulSet)
Ingress Controller (NGINX)
HPA (Autoscaling)
Persistent Volumes (Storage)
🚀 Features
Microservices architecture
Kubernetes Deployments & Services
Ingress routing (/ → frontend, /api → backend)
MongoDB StatefulSet with persistent storage
Horizontal Pod Autoscaling (CPU-based)
Resource requests & limits
Internal DNS-based service discovery
📂 Project Structure
k8s-task-platform/
├── frontend/
├── api-service/
├── k8s-manifests/
│   ├── deployments
│   ├── services
│   ├── ingress
│   ├── statefulset
│   ├── hpa
│   └── config
🔧 How to Run
kubectl apply -f k8s-manifests/

Then access:

http://nginx.local

(Ensure /etc/hosts or Minikube IP mapping is set)

📈 HPA Demo
kubectl get hpa -n task-platform
kubectl get pods -n task-platform -w
🎯 What this project demonstrates
Kubernetes production patterns
Service discovery
Scaling strategies
Persistent storage
Microservice networking
👨‍💻 Author

Abdelrahman Agha
