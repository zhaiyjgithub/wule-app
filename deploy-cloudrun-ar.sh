#!/bin/bash

# Configuration
PROJECT_ID="hydrox-ai"
SERVICE_NAME="wule-app-dev"
REGION="asia-east1"  # 或者选择其他适合的区域
ARTIFACT_REGISTRY_REGION="asia-east1"  # Artifact Registry 区域
REPOSITORY_NAME="wule-app-repo"
IMAGE_NAME="$ARTIFACT_REGISTRY_REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY_NAME/$SERVICE_NAME"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting deployment to GCP Cloud Run with Artifact Registry...${NC}"

# Check if required tools are installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI is not installed. Please install Google Cloud SDK first.${NC}"
    exit 1
fi

# Set the project
echo -e "${YELLOW}📋 Setting GCP project to $PROJECT_ID...${NC}"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo -e "${YELLOW}🔧 Enabling required APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# Create Artifact Registry repository if it doesn't exist
echo -e "${YELLOW}📦 Creating Artifact Registry repository if needed...${NC}"
gcloud artifacts repositories describe $REPOSITORY_NAME \
  --location=$ARTIFACT_REGISTRY_REGION \
  --format="value(name)" 2>/dev/null || \
gcloud artifacts repositories create $REPOSITORY_NAME \
  --repository-format=docker \
  --location=$ARTIFACT_REGISTRY_REGION \
  --description="Docker repository for wule-app"

# Configure Docker to use Artifact Registry
echo -e "${YELLOW}🔐 Configuring Docker authentication for Artifact Registry...${NC}"
gcloud auth configure-docker $ARTIFACT_REGISTRY_REGION-docker.pkg.dev

# Build and push the image using Cloud Build
echo -e "${YELLOW}🏗️  Building and pushing Docker image to Artifact Registry...${NC}"
gcloud builds submit --tag $IMAGE_NAME .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to build and push image${NC}"
    exit 1
fi

# Deploy to Cloud Run
echo -e "${YELLOW}🚀 Deploying to Cloud Run...${NC}"
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --memory 1Gi \
  --cpu 1 \
  --max-instances 10 \
  --concurrency 80

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    
    # Get the service URL
    SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format='value(status.url)')
    echo -e "${GREEN}🌐 Your app is now available at: $SERVICE_URL${NC}"
    echo -e "${GREEN}📦 Image location: $IMAGE_NAME${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}" 