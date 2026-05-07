## Build image and push to Azure Container Registry
$ACR_NAME = "sep4web"
$ACR_LOGIN = az acr show -n $ACR_NAME --query loginServer -o tsv
$IMAGE_NAME = "web"
$TAG = "latest"

docker build --platform linux/amd64 --provenance=false -t "$ACR_LOGIN/${IMAGE_NAME}:$TAG" .
az acr login -n $ACR_NAME
docker push "$ACR_LOGIN/${IMAGE_NAME}:$TAG"


## Update containerapp on Azure
az containerapp update `
  --name "sep4web" `
  --resource-group "sep4webapp" `
  --image "$ACR_LOGIN/${IMAGE_NAME}:$TAG"