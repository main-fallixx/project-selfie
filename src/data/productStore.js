import { products as staticProducts } from './siteData';

const CUSTOM_KEY = 'selfiepetti_custom_products';
const EDITED_KEY = 'selfiepetti_edited_products';
const DELETED_KEY = 'selfiepetti_deleted_product_ids';

function read(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getAllProducts() {
  const custom = read(CUSTOM_KEY, []);
  const edited = read(EDITED_KEY, {});
  const deletedIds = read(DELETED_KEY, []);

  const mergedStatic = staticProducts
    .filter((p) => !deletedIds.includes(p.id))
    .map((p) => (edited[p.id] ? { ...p, ...edited[p.id] } : p));

  return [...mergedStatic, ...custom];
}

export function addProduct(product) {
  const custom = read(CUSTOM_KEY, []);
  const id = product.id || `custom-${Date.now()}`;
  const newProduct = { ...product, id, badge: product.badge || 'New' };
  write(CUSTOM_KEY, [...custom, newProduct]);
  return newProduct;
}

export function updateProduct(id, changes) {
  const isStatic = staticProducts.some((p) => p.id === id);

  if (isStatic) {
    const edited = read(EDITED_KEY, {});
    edited[id] = { ...(edited[id] || {}), ...changes };
    write(EDITED_KEY, edited);
  } else {
    const custom = read(CUSTOM_KEY, []);
    const updated = custom.map((p) => (p.id === id ? { ...p, ...changes } : p));
    write(CUSTOM_KEY, updated);
  }
}

export function deleteProduct(id) {
  const isStatic = staticProducts.some((p) => p.id === id);

  if (isStatic) {
    const deletedIds = read(DELETED_KEY, []);
    if (!deletedIds.includes(id)) write(DELETED_KEY, [...deletedIds, id]);
  } else {
    const custom = read(CUSTOM_KEY, []);
    write(CUSTOM_KEY, custom.filter((p) => p.id !== id));
  }
}

export function resetAllOverrides() {
  window.localStorage.removeItem(CUSTOM_KEY);
  window.localStorage.removeItem(EDITED_KEY);
  window.localStorage.removeItem(DELETED_KEY);
}