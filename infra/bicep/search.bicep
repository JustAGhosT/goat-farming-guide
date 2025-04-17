targetScope = 'resourceGroup'

param location string = resourceGroup().location
param searchServiceName string
param searchServiceSku string = 'Basic'

resource searchService 'Microsoft.Search/searchServices@2020-08-01' = {
  name: searchServiceName
  location: location
  sku: {
    name: searchServiceSku
  }
  properties: {
    replicaCount: 1
    partitionCount: 1
  }
}
