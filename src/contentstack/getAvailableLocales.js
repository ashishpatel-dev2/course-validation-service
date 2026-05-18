import { getContentStackManagementClient } from './client.js';

export const getAvailableLocales = async () => {
  const stack = getContentStackManagementClient();

  const response = await stack.locale().query().find();

  if (response.items) {
    return response.items.map((item) => {
      return { code: item.code, name: item.name };
    });
  }

  return [];
};
