import ContentStack from '@contentstack/delivery-sdk';
import ContentStackManagement from '@contentstack/management';

/**
 * ContentStack SDK Client
 */

export const getContentStackSDKClient = () => {
  return ContentStack.stack({
    apiKey: process.env.CONTENTSTACK_API_KEY,
    deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    branch: process.env.CONTENTSTACK_PREVIEW_BRANCH || 'main',
    live_preview: {
      enable: true,
      preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN,
      host: 'rest-preview.contentstack.com'
    }
  });
};

/**
 * ContentStack Management Client
 */

export const getContentStackManagementClient = () => {
  return ContentStackManagement.client({
    headers: {
      branch: process.env.CONTENTSTACK_PREVIEW_BRANCH || 'main'
    }
  }).stack({
    api_key: process.env.CONTENTSTACK_API_KEY,
    management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN
  });
};
