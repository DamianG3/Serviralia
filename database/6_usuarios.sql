DROP USER IF EXISTS serviralia_api;
DROP USER IF EXISTS moderador;
DROP USER IF EXISTS admin_owner;

-- Create users with passwords
CREATE USER 'serviralia_api'@'%' IDENTIFIED BY 's#u&q$4g$b9%Yx9G8V4y@';
CREATE USER 'moderador'@'%' IDENTIFIED BY 'M8Kd^b2Ptkc!76$x6#s#$';
CREATE USER 'admin_owner'@'%' IDENTIFIED BY 'C$bi8^G&34JXn93&VnJpQ';

-- --------------------------- USER: SERVIRALIA API ---------------------------

-- Give access to read all the Tables and Views, and execute Procedures and Funtions
GRANT 
	SELECT, SHOW VIEW, EXECUTE
ON 
	serviralia.* 
TO 
	'serviralia_api'@'%';

-- --------------------------- USER: MODERATIOR ---------------------------

-- Assign permits to the moderator (without modifying the structure)
GRANT 
	SELECT, SHOW VIEW, EXECUTE, INSERT, UPDATE, DELETE
ON 
	serviralia.* 
TO 
	'moderador'@'%';

-- --------------------------- USER: OWNER ---------------------------

-- Assign permits to the administrator with full control
GRANT 
	ALL PRIVILEGES 
ON 
    serviralia.* 
TO 
    'admin_owner'@'%';

-- Permits to execute Procedures and Routines from de sidebar
GRANT SELECT ON `performance_schema`.* TO 'admin_owner'@'%';
GRANT SHOW_ROUTINE  ON *.* TO 'admin_owner'@'%';


-- --------------------------- FINALLY ---------------------------

-- Apply changes
FLUSH PRIVILEGES;


