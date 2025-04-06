USE Serviralia;

-- ------------------------------------- ADD A BRAND NEW USER ------------------------------------------
# Transaction that registers a brand new user into the Users table.
# The input parameters request the user's account information.
# The procedure uses the now() function to register the date of creation.

DROP PROCEDURE IF EXISTS AddNewUser;

DELIMITER $$

CREATE PROCEDURE AddNewUser(
    IN user_first_name VARCHAR(100), 
    IN user_last_name VARCHAR(100), 
    IN user_email VARCHAR(254), 
    IN user_password VARCHAR(72), 
    IN user_pfp_file_name VARCHAR(100),
    IN user_phone BIGINT,
    IN user_date_of_birth DATE
)
BEGIN
    START TRANSACTION;
    
    -- Inserts new user's information into the Users table

    INSERT INTO Users (
        email,
        phone,
        password_hash,
        first_name,
        last_name,
        pfp_file_name,
        date_created,
        date_of_birth
    )
    VALUES (
        user_email,
        user_phone,
        user_password,
        user_first_name,
        user_last_name,
        user_pfp_file_name,
        now(),
        user_date_of_birth
    );
    
    COMMIT;
END $$

-- Example
CALL AddNewUser(
	'nuevo',
    'usuario',
    'nuevo@mial.com',
    'password',
    'icon.jpg',
    '12345678',
    '2000-10-10')

-- ------------------------------------- ADD A NEW WORKER FROM EXISTING USER ------------------------------------------
# Transaction that adds a new worker to the Workers table using an existing user's ID.
# The input parameters request the worker's account information, including the ID of an existing skill.
# All existing IDs in input parameters are verified, the transaction rolls back if if the parameter is not valid.

DROP PROCEDURE IF EXISTS AddNewWorker;

DELIMITER $$

CREATE PROCEDURE AddNewWorker(
    IN existing_user_id BIGINT, 
    IN worker_bio TEXT,
    IN skill_id INT,
    IN worker_images JSON
)
BEGIN
    DECLARE new_worker_id BIGINT;
    START TRANSACTION;
    
    -- Rollback if the user ID does not exist
    
    IF NOT EXISTS (
        SELECT
            1
        FROM
            Users
        WHERE
            id_user = existing_user_id)
        THEN
        ROLLBACK;
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'User ID does not exist';
    END IF;
    
    INSERT INTO Workers (
        id_user,
        bio
    )
    VALUES (
        existing_user_id, 
        worker_bio
    );
    
    SET new_worker_id = LAST_INSERT_ID();
    
    -- Rollback if the skill ID does not exist
    
    IF NOT EXISTS (
        SELECT
            1
        FROM
            Skills
        WHERE
            id_skill = skill_id)
        THEN
        ROLLBACK;
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Skill ID does not exist';
    END IF;
    
    -- Inserts worker's skill into the WorkerSkills table

    INSERT INTO WorkerSkills (
        id_worker,
        id_skill
    )
    VALUES (
        new_worker_id,
        skill_id
    );
    
    -- Inserts images in input parameters to the ReviewGallery table

    INSERT INTO WorkerGallery (
        id_worker,
        file_name)

    SELECT
        new_worker_id,
        JSON_UNQUOTE(
            JSON_EXTRACT(
                worker_images,
                CONCAT(
                    '$[', numbers.n, ']'
                )
            )
        )

    -- Index subquery to extract the right amount of elements in the JSON array (max. 5 images)

    FROM
    (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) numbers
    
    -- Filters out invalid elements in the JSON array

    WHERE
        JSON_LENGTH(worker_images) > numbers.n;

    COMMIT;
END $$

-- Example
CALL AddNewWorker(
	21,
    'new bio',
    6,
    '["fototrabajador21.jpg"]');

-- ------------------------------------- ADD A NEW SKILL TO EXISTING WORKER ------------------------------------------
# Transaction that adds a new worker's skill to the WorkerSkills table using an existing worker's and skill's ID.
# The input parameters request the worker's ID and the ID of an existing skill.
# All existing IDs in input parameters are verified, the transaction rolls back if if the parameter is not valid.

DROP PROCEDURE IF EXISTS AddNewWorkerSkill;

DELIMITER $$

CREATE PROCEDURE AddNewWorkerSkill(
    IN existing_worker_id BIGINT, 
    IN skill_id INT
)
BEGIN
    START TRANSACTION;
    
    -- Rollback if the worker ID does not exist
    
    IF NOT EXISTS (
        SELECT
            1
        FROM
            Workers
        WHERE
            id_worker = existing_worker_id)
        THEN
        ROLLBACK;
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Worker ID does not exist';
    END IF;
    
    -- Rollback if the skill ID does not exist
    
    IF NOT EXISTS (
        SELECT
            1
        FROM
            Skills
        WHERE
            id_skill = skill_id)
        THEN
        ROLLBACK;
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Skill ID does not exist';
    END IF;
    
    -- Inserts worker's new skill into the WorkerSkills table

    INSERT INTO WorkerSkills (
        id_worker,
        id_skill
    )
    VALUES (
        existing_worker_id,
        skill_id
    );
    
    COMMIT;
END $$

-- Example
CALL AddNewWorkerSkill(19, 5);

-- ------------------------------------- MAKE A REVIEW ------------------------------------------
# Transaction that adds a new review to the Reviews table using an existing worker's and user's ID.
# The input parameters request the review's information, including the ID of the worker being reviewed, the ID of the skill done,
# the ID of the user writing the review, the rating and text of the review and the pictures attached.
# All existing IDs in input parameters are verified, the transaction rolls back if if the parameter is not valid.

DROP PROCEDURE IF EXISTS AddReview;

DELIMITER $$

CREATE PROCEDURE AddReview(
    IN review_worker_id BIGINT, 
    IN review_user_id BIGINT, 
    IN review_rating TINYINT, 
    IN review_text TEXT, 
    IN review_skill_id INT,
    IN review_images JSON
)
BEGIN
    DECLARE new_review_id BIGINT;
    START TRANSACTION;
    
    -- Rollback if the worker ID does not exist

    IF NOT EXISTS (
        SELECT
            1
        FROM
            Workers
        WHERE
            id_worker = review_worker_id)
        THEN
        ROLLBACK;
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Worker ID does not exist';
    END IF;
    
    -- Rollback if the user ID does not exist

    IF NOT EXISTS (
        SELECT
            1
        FROM
            Users
        WHERE
            id_user = review_user_id)
        THEN
        ROLLBACK;
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'User ID does not exist';
    END IF;
    
    -- Rollback if the skill ID does not exist

    IF NOT EXISTS (
        SELECT
            1
        FROM
            Skills
        WHERE
            id_skill = review_skill_id)
        THEN
        ROLLBACK;
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Skill ID does not exist';
    END IF;
    
    INSERT INTO Reviews (
        id_worker,
        id_user,
        rating,
        review_txt,
        id_skill,
        date_created
    )
    VALUES (
        review_worker_id,
        review_user_id,
        review_rating,
        review_text,
        review_skill_id,
        NOW()
    );
    
    SET new_review_id = LAST_INSERT_ID();
    
    -- Inserts images in input parameters to the ReviewGallery table

    INSERT INTO ReviewGallery (
        id_review,
        file_name
    )
    SELECT
        new_review_id,
        JSON_UNQUOTE(
            JSON_EXTRACT(
                review_images,
                CONCAT(
                    '$[', numbers.n, ']'
                )
            )
        )

    -- Index subquery to extract the right amount of elements in the JSON array (max. 5 images)

    FROM
        (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) AS numbers
    
    -- Filters out invalid elements in the JSON array

    WHERE
        JSON_LENGTH(review_images) > numbers.n;
    
    COMMIT;
END $$

-- Example
CALL AddReview(
    1, 
    20, 
    3, 
    'servicio medio', 
    1,
    '[]'
)

-- ------------------------------------- MAKE A LEAD ------------------------------------------
# Transaction that adds a new lead to the Leads table using an existing worker's and user's ID.
# The input parameters request the lead's information, including the ID of the worker being reviewed,
# the ID of the user writing the lead, the title and text of the lead.
# All existing IDs in input parameters are verified, the transaction rolls back if if the parameter is not valid.

DROP PROCEDURE IF EXISTS AddLead;

DELIMITER $$

CREATE PROCEDURE AddLead(
    IN lead_worker_id BIGINT, 
    IN lead_user_id BIGINT, 
    IN lead_title VARCHAR(100), 
    IN lead_details TEXT
)
BEGIN
    START TRANSACTION;
    
    -- Rollback if the worker ID does not exist

    IF NOT EXISTS (
        SELECT
            1
        FROM
            Workers
        WHERE
            id_worker = lead_worker_id)
        THEN
        ROLLBACK;
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Worker ID does not exist';
    END IF;
    
    -- Rollback if the user ID does not exist

    IF NOT EXISTS (
        SELECT
            1
        FROM
            Users
        WHERE
            id_user = lead_user_id)
        THEN
        ROLLBACK;
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'User ID does not exist';
    END IF;
    
    INSERT INTO Leads (
        id_worker,
        id_user,
        title,
        details,
        date_created
    )
    VALUES (
        lead_worker_id,
        lead_user_id,
        lead_title,
        lead_details,
        NOW()
    );
    
    COMMIT;
END $$

CALL AddLead(
    IN lead_worker_id BIGINT, 
    IN lead_user_id BIGINT, 
    IN lead_title VARCHAR(100), 
    IN lead_details TEXT
)