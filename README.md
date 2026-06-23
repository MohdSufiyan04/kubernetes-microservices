# ☸️ Kubernetes Microservices on AWS EKS

A production-style microservices platform deployed on AWS EKS — with full GitOps, monitoring, and an automated CI/CD pipeline. Every code change automatically builds, pushes, and deploys to a real Kubernetes cluster on AWS.

---

## 🏗️ Architecture Overview

```
Code Push to GitHub
        ↓
GitHub Actions CI Pipeline
        ↓
Docker Images → Docker Hub
        ↓
Helm values.yaml updated (new image tag)
        ↓
Argo CD detects change → Auto syncs to EKS
        ↓
┌─────────────────────────────────────────────┐
│              AWS EKS Cluster                 │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │         default namespace           │   │
│  │                                     │   │
│  │  gateway-service (LoadBalancer)     │   │
│  │    ↓              ↓                 │   │
│  │  user-service   product-service     │   │
│  │  (ClusterIP)    (ClusterIP)         │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌──────────────┐  ┌────────────────────┐  │
│  │ argocd ns    │  │ monitoring ns      │  │
│  │ Argo CD      │  │ Prometheus+Grafana │  │
│  └──────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────┘
        ↓
Prometheus scrapes metrics
        ↓
Grafana dashboards visualize cluster health
```

---

## 🔹 Features

- **3 Microservices** — user-service, product-service, gateway-service
- **API Gateway Pattern** — single public entry point routing to internal services
- **AWS EKS** — real managed Kubernetes, not local Minikube
- **Helm Charts** — production-style packaging for all 3 services
- **GitOps with Argo CD** — auto syncs cluster on every Git change
- **Full Observability** — Prometheus metrics + Grafana dashboards
- **CI Pipeline** — GitHub Actions builds and pushes Docker images automatically
- **High Availability** — 2 replicas per service, multi-node cluster

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js + Express | Microservices |
| Docker | Containerization |
| Docker Hub | Container Registry |
| AWS EKS | Managed Kubernetes |
| eksctl | EKS cluster provisioning |
| Helm | Kubernetes package manager |
| Argo CD | GitOps continuous delivery |
| Prometheus | Metrics collection |
| Grafana | Metrics visualization |
| GitHub Actions | CI pipeline |

---

## 📁 Repository Structure

```
kubernetes-microservices/
├── services/
│   ├── user-service/           # Returns user data on /users
│   │   ├── index.js
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── product-service/        # Returns product data on /products
│   │   ├── index.js
│   │   ├── Dockerfile
│   │   └── package.json
│   └── gateway-service/        # Routes /api/users and /api/products
│       ├── index.js
│       ├── Dockerfile
│       └── package.json
├── helm/
│   ├── user-service/           # Helm chart for user-service
│   ├── product-service/        # Helm chart for product-service
│   └── gateway-service/        # Helm chart for gateway-service
└── .github/
    └── workflows/
        └── ci.yml              # GitHub Actions CI pipeline
```

---

## 🌐 Microservices Design

```
Internet
    ↓
gateway-service (LoadBalancer — public)
    ↓              ↓
user-service    product-service
(ClusterIP)     (ClusterIP)
internal only   internal only
```

Only the gateway is publicly accessible. User and product services are internal — reachable only inside the cluster via Kubernetes DNS:

```
http://user-service:3001
http://product-service:3002
```

---

## 🔄 CI/CD Flow

```
1. Developer pushes code to main
2. GitHub Actions triggers
3. Builds Docker images for all 3 services
4. Pushes to Docker Hub with new tag (build number)
5. Updates image tags in helm/*/values.yaml
6. Commits updated values back to GitHub
7. Argo CD detects values.yaml changed
8. Argo CD syncs new image to EKS automatically
9. Rolling update — zero downtime deployment
```

---

## 🚀 How to Deploy

### Prerequisites
- AWS Account
- eksctl, kubectl, helm installed
- Docker Hub account

### Step 1 — Create EKS Cluster
```bash
eksctl create cluster \
  --name microservices-cluster \
  --region us-east-1 \
  --node-type t3.small \
  --nodes 2 \
  --managed
```

### Step 2 — Deploy Microservices
```bash
helm install user-service helm/user-service
helm install product-service helm/product-service
helm install gateway-service helm/gateway-service
```

### Step 3 — Install Argo CD
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### Step 4 — Install Monitoring
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace
```

### Step 5 — Access Services
```bash
# Get gateway public URL
kubectl get svc gateway-service

# Access Argo CD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Access Grafana
kubectl port-forward svc/monitoring-grafana -n monitoring 4000:80
```

### Step 6 — Destroy (to avoid AWS charges)
```bash
eksctl delete cluster --name microservices-cluster --region us-east-1
```

---

## 📸 Screenshots

### Argo CD — All 3 Services Healthy & Synced
*(Add screenshot here)*

### Grafana — Kubernetes Cluster Dashboard
*(Add screenshot here)*

### GitHub Actions — Green Pipeline
*(Add screenshot here)*

### App Running via LoadBalancer
*(Add screenshot here)*

---

## 👤 Author

**Mohd Sufiyan**
- GitHub: [@MohdSufiyan04](https://github.com/MohdSufiyan04)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
