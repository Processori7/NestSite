// Определение ролей и разрешений
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

// Типы пользователей
export interface UserWithRole {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

// Определение доступных ролей
export const roles: Role[] = [
  {
    id: 'admin',
    name: 'Администратор',
    description: 'Полный доступ ко всем функциям системы',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles', 'manage_scenarios', 'manage_zones', 'manage_lighting']
  },
  {
    id: 'operator',
    name: 'Оператор',
    description: 'Доступ к управлению освещением и сценариями',
    permissions: ['read', 'write', 'manage_scenarios', 'manage_zones', 'manage_lighting']
  },
  {
    id: 'agronom',
    name: 'Агроном',
    description: 'Доступ к просмотру данных и управлению сценариями',
    permissions: ['read', 'manage_scenarios']
  },
  {
    id: 'viewer',
    name: 'Наблюдатель',
    description: 'Доступ только к просмотру данных',
    permissions: ['read']
  }
];

// Функция для получения роли по ID
export const getRoleById = (roleId: string): Role | undefined => {
  return roles.find(role => role.id === roleId);
};

// Функция для проверки разрешения у пользователя
export const hasPermission = (user: UserWithRole, permission: string): boolean => {
  return user.permissions.includes(permission);
};

// Функция для проверки, есть ли у пользователя определенная роль
export const hasRole = (user: UserWithRole, roleId: string): boolean => {
  return user.role === roleId;
};

// Функция для добавления разрешения к роли
export const addPermissionToRole = (roleId: string, permission: string): void => {
  const role = getRoleById(roleId);
  if (role && !role.permissions.includes(permission)) {
    role.permissions.push(permission);
  }
};

// Функция для удаления разрешения из роли
export const removePermissionFromRole = (roleId: string, permission: string): void => {
  const role = getRoleById(roleId);
  if (role) {
    role.permissions = role.permissions.filter(p => p !== permission);
  }
};