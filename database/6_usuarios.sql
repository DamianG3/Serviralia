Drop User serviralia_api;
drop user moderador;
Drop User admin_owner;

-- Create users with their repsective passwords

CREATE USER 'serviralia_api'@'%' IDENTIFIED BY 'password_serviralia';
CREATE USER 'moderador'@'%' IDENTIFIED BY 'password_moderador';
CREATE USER 'admin_owner'@'%' IDENTIFIED BY 'password_admin';

-- Give writing permits (SELECT) for all tables including skills

GRANT SELECT ON Serviralia.* TO 'serviralia_api'@'%';
GRANT INSERT, UPDATE ON Serviralia.* TO 'serviralia_api'@'%';

GRANT SELECT ON Serviralia.skills TO 'serviralia_api'@'%';
REVOKE INSERT, UPDATE ON Serviralia.skills FROM 'serviralia_api'@'%';

-- Assign permits to the moderator (without modifying the structure)

GRANT SELECT, INSERT, UPDATE, DELETE ON Serviralia.* TO 'moderador'@'%';

-- Assign permits to the administrator with full control
GRANT ALL PRIVILEGES ON Serviralia.* TO 'admin_owner'@'%';

-- Apply changes
FLUSH PRIVILEGES;