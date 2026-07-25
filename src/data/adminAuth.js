const ADMINS_KEY = 'selfiepetti_admins';
const SESSION_KEY = 'selfiepetti_admin_session';

const OWNER_EMAIL = 'karthikeshmanikandan001@gmail.com';
const OWNER_PASSWORD = 'pass1234';

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

function seedOwnerIfNeeded() {
  const admins = read(ADMINS_KEY, []);
  const ownerExists = admins.some((a) => a.email.toLowerCase() === OWNER_EMAIL.toLowerCase());
  if (!ownerExists) {
    admins.push({
      id: 'owner-1',
      name: 'Owner',
      email: OWNER_EMAIL,
      password: OWNER_PASSWORD,
      isOwner: true,
      createdAt: new Date().toISOString(),
      lastLogin: null
    });
    write(ADMINS_KEY, admins);
  }
  return admins;
}

export function getAllAdmins() {
  seedOwnerIfNeeded();
  return read(ADMINS_KEY, []);
}

export function login(email, password) {
  const admins = getAllAdmins();
  const match = admins.find(
    (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
  );
  if (!match) return { success: false, error: 'Invalid email or password.' };

  const updated = admins.map((a) =>
    a.id === match.id ? { ...a, lastLogin: new Date().toISOString() } : a
  );
  write(ADMINS_KEY, updated);

  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: match.id, email: match.email }));
  return { success: true, admin: match };
}

export function logout() {
  window.sessionStorage.removeItem(SESSION_KEY);
}

export function getCurrentAdmin() {
  try {
    const session = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) || 'null');
    if (!session) return null;
    const admins = getAllAdmins();
    return admins.find((a) => a.id === session.id) || null;
  } catch {
    return null;
  }
}

export function addAdmin({ name, email, password }) {
  const admins = getAllAdmins();
  const exists = admins.some((a) => a.email.toLowerCase() === email.trim().toLowerCase());
  if (exists) return { success: false, error: 'An admin with this email already exists.' };

  const newAdmin = {
    id: `admin-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    password,
    isOwner: false,
    createdAt: new Date().toISOString(),
    lastLogin: null
  };
  write(ADMINS_KEY, [...admins, newAdmin]);
  return { success: true, admin: newAdmin };
}

export function updateAdmin(id, changes, actingAdmin) {
  const admins = getAllAdmins();
  const target = admins.find((a) => a.id === id);
  if (!target) return { success: false, error: 'Admin not found.' };

  const isSelf = actingAdmin.id === id;
  const isOwnerActing = actingAdmin.isOwner;

  // Only the owner can edit other admins. Non-owners may only edit themselves,
  // and cannot grant themselves owner status.
  if (!isSelf && !isOwnerActing) {
    return { success: false, error: 'Only the owner can edit other admin accounts.' };
  }
  if (isSelf && !isOwnerActing && 'isOwner' in changes) {
    delete changes.isOwner;
  }

  const updated = admins.map((a) => (a.id === id ? { ...a, ...changes } : a));
  write(ADMINS_KEY, updated);
  return { success: true };
}

export function deleteAdmin(id, actingAdmin) {
  const admins = getAllAdmins();
  const target = admins.find((a) => a.id === id);
  if (!target) return { success: false, error: 'Admin not found.' };

  if (target.isOwner) {
    return { success: false, error: 'The owner account cannot be deleted.' };
  }
  if (!actingAdmin.isOwner) {
    return { success: false, error: 'Only the owner can delete admin accounts.' };
  }

  write(ADMINS_KEY, admins.filter((a) => a.id !== id));

  if (getCurrentAdmin()?.id === id) logout();
  return { success: true };
}