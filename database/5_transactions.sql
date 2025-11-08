USE Serviralia;

-- ------------------------------------- SEARCH FOR WORKERS WITH A SPECIFIC SKILL ------------------------------------------
# This procedure searches for all workers who have a specific skill
# Orders the results by relevance, considering their average rating and number of reviews.

DROP PROCEDURE IF EXISTS SearchSkill;

DELIMITER $$

CREATE PROCEDURE SearchSkill(
    IN in_skill_id INT
)
BEGIN

	SELECT 
		*, 
        -- Relevance calculation
        AVG(totalReviews) * AVG(rating) + (totalReviews * rating) / AVG(totalReviews) + totalReviews AS score 
	FROM (SELECT -- Sub-querry to find the workers with the given skill
        id_worker,
		CONCAT(Users.first_name, ' ', Users.last_name) AS fullName, 
		Users.pfp_file_name AS pfpFileName, 
		get2WorkerImages(id_worker) AS gallery, -- Just shows two images
		RatingAverage(id_worker, id_skill) AS rating, 
		CountWorkerReviewsBySkill(id_worker, id_skill) AS totalReviews,
		wokerSkillsJson(id_worker) AS skills
		FROM
			WorkerSkills
		JOIN
			Workers USING(id_worker)
		JOIN
			Users USING(id_user) 
            WHERE 
		id_skill = in_skill_id) as workerList
    GROUP BY 
		id_worker , fullName, pfpFileName, gallery, rating, totalReviews , skills
    ORDER BY 
		score DESC; -- To see highest rated first

END $$
DELIMITER ;

-- CALL SearchSkill(6);


-- ----------------------------------- ADD A BRAND NEW USER ------------------------------------------
# Transaction that registers a brand new user into the Users table.
# The input parameters request the user's account information.

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
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;
    START TRANSACTION;
    
    -- Inserts new user's information into the Users table
    INSERT INTO Users (
        email,
        phone,
        password_hash,
        first_name,
        last_name,
        pfp_file_name,
        date_of_birth
    )
    VALUES (
        user_email,
        user_phone,
        user_password,
        user_first_name,
        user_last_name,
        user_pfp_file_name,
        user_date_of_birth
    );
    
    COMMIT;
END $$
DELIMITER ;


-- Example
-- CALL AddNewUser(
-- 	'nuevo',
--     'usuario',
--     'nuevo@mial.com',
--     'password',
--     'icon.jpg',
--     '12345678',
--     '2000-10-10');

-- ------------------------------------- ADD A NEW WORKER ------------------------------------------
# Transaction that adds a new worker to the Workers table and a brand new user into the Users table.
# The input parameters request the user's account information and the worker's account information.
# All input parameters are verified, the transaction rolls back if the parameter is not valid.

DROP PROCEDURE IF EXISTS AddNewWorker;

DELIMITER $$

CREATE PROCEDURE AddNewWorker(
    IN user_first_name VARCHAR(100), 
    IN user_last_name VARCHAR(100), 
    IN user_email VARCHAR(254), 
    IN user_password VARCHAR(72), 
    IN user_pfp_file_name VARCHAR(100),
    IN user_phone BIGINT,
    IN user_date_of_birth DATE,

    IN worker_bio TEXT,
    IN skill_ids JSON,
    IN worker_images JSON
)
BEGIN
    DECLARE new_worker_id BIGINT;
    DECLARE new_user_id BIGINT;
    
    DECLARE length INT;
    DECLARE i INT;
    DECLARE error_msg VARCHAR(255);
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;
    START TRANSACTION;
    
	-- Inserts new user's information into the Users table
    INSERT INTO Users (
        email,
        phone,
        password_hash,
        first_name,
        last_name,
        pfp_file_name,
        date_of_birth
    )
    VALUES (
        user_email,
        user_phone,
        user_password,
        user_first_name,
        user_last_name,
        user_pfp_file_name,
        user_date_of_birth
    );

	-- Gets the new user ID
    SET new_user_id = LAST_INSERT_ID();    

    -- Inserts new worker's information into the Workers table
    INSERT INTO Workers (
        id_user,
        bio
    )
    VALUES (
        new_user_id, 
        worker_bio
    );
    
	######## SKILL INSERT ########

	-- Gets the new worker ID
    SET new_worker_id = LAST_INSERT_ID();

	SET length = JSON_LENGTH(skill_ids);
    SET i = 0;
        
    add_skills: LOOP    
		-- Rollback if the skill ID does not exist
		IF NOT EXISTS (
			SELECT
				1
			FROM
				Skills
			WHERE
				id_skill = JSON_EXTRACT(skill_ids, CONCAT('$[', i, ']')))
		THEN
			SET error_msg = CONCAT('Skill ID ''', JSON_EXTRACT(skill_ids, CONCAT('$[', i, ']')), ''' does not exist');

-- Signal the error with the prepared message
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = error_msg;
		END IF;
        
        -- Insert ID number `i` into WorkerSkills table
		INSERT INTO WorkerSkills (
			id_worker,
			id_skill)
		VALUES (
			new_worker_id,
			JSON_EXTRACT(skill_ids, CONCAT('$[', i, ']'))
		);
		
		-- terminate the loop
        SET i = i+1;
		IF i = length THEN
			LEAVE add_skills;
		END IF;
	END LOOP;
	
    
    ######## IMAGES INSERT ########
    
	IF (worker_images IS NOT NULL) THEN -- Checks if there are any images to be added		    
		SET length = JSON_LENGTH(worker_images);
		SET i = 0;
			
		add_images: LOOP
			INSERT INTO WorkerGallery (
				id_worker,
				file_name)
			VALUES (
				new_worker_id,
				TRIM('"' FROM 
				JSON_EXTRACT(worker_images, CONCAT('$[', i, ']')))
			);
			
			-- terminate the loop
			SET i = i+1;
			IF i = length THEN
				LEAVE add_images;
			END IF;
		END LOOP;
	END IF;

    COMMIT;
END $$
DELIMITER ;


-- Example
-- CALL AddNewWorker(
-- 	   'nameTest',
--     'lastnameTest',
--     'new1@mail.com',
--     'password',
--     null,
--     '100001',
--     '2000-10-10',
--     
--     'new bio',
--     "[1,2,3,4,5,6]",
-- 		'["1testPhoto1.jpg", "2testPhoto1.jpg", "3testPhoto1.jpg"]');

-- ------------------------------------- EDIT EXISTING USER ------------------------------------------
# Transaction that updates all the columns in the User table, except the id_user column
# The transaction rolls back if the parameter is not valid.

DROP PROCEDURE IF EXISTS EditUser;

DELIMITER $$

CREATE PROCEDURE EditUser(
    IN in_user_id VARCHAR(100),
    IN user_first_name VARCHAR(100), 
    IN user_last_name VARCHAR(100), 
    IN user_email VARCHAR(254), 
    IN user_pfp_file_name VARCHAR(100),
    IN user_phone BIGINT,
    IN user_date_of_birth DATE
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;
    START TRANSACTION;
    
    -- Inserts the new user information
	UPDATE Users 
	SET 
        first_name = user_first_name,
        last_name = user_last_name,
        email = user_email,
        pfp_file_name = user_pfp_file_name,
        phone = user_phone,
        date_of_birth = user_date_of_birth
	WHERE
		id_user = in_user_id;
    
    COMMIT;
END $$
DELIMITER ;

-- Example
-- CALL EditUser(
-- 	21,
-- 	'nameTest',
--     'lastnameTest',
--     'new9@mail.com',
--     null,
--     '100009',
--     '2000-10-10');


-- ------------------------------------- EDIT EXISTING WORKER ------------------------------------------
# Transaction that updates all the columns in the Worker and User tables, 
# Except the id_woker and id_user columns
# Deletes all the records from the tables WorkerSkills and WorkerGallery
# The transaction rolls back if the parameter is not valid.

DROP PROCEDURE IF EXISTS EditWorker;

DELIMITER $$

CREATE PROCEDURE EditWorker(
    IN in_user_id VARCHAR(100),
    IN user_first_name VARCHAR(100), 
    IN user_last_name VARCHAR(100), 
    IN user_email VARCHAR(254), 
    IN user_pfp_file_name VARCHAR(100),
    IN user_phone BIGINT,
    IN user_date_of_birth DATE,
    
	IN worker_bio TEXT,
    IN skill_ids JSON,
    IN worker_images JSON
)
BEGIN
    DECLARE in_worker_id BIGINT;
	DECLARE length INT;
    DECLARE i INT;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;
    START TRANSACTION;
    
	-- Inserts the new user information
	UPDATE Users 
	SET 
        first_name = user_first_name,
        last_name = user_last_name,
        email = user_email,
        pfp_file_name = user_pfp_file_name,
        phone = user_phone,
        date_of_birth = user_date_of_birth
	WHERE
		id_user = in_user_id;
    
	-- Inserts the new worker information
    UPDATE Workers
    SET
		bio = worker_bio
	WHERE
		id_user = in_user_id;
        
	-- Gets the corresponding worker_id
	SELECT 
		id_worker INTO in_worker_id
    FROM 
		Workers
	WHERE
		id_user = in_user_id;
    
    -- Deletes old data from the tables workerSkills and workerGallery
    DELETE FROM workerSkills
	WHERE id_worker = in_worker_id;
    
	DELETE FROM workerGallery
	WHERE id_worker = in_worker_id;    
	
    ######## NEW SKILL INSERT ########

	SET length = JSON_LENGTH(skill_ids);
    SET i = 0;
        
    add_skills: LOOP    
		-- Rollback if the skill ID does not exist
		IF NOT EXISTS (
			SELECT
				1
			FROM
				Skills
			WHERE
				id_skill = JSON_EXTRACT(skill_ids, CONCAT('$[', i, ']')))
		THEN
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Skill ID does not exist';
		END IF;
        
        -- Insert ID number `i` into WorkerSkills table
		INSERT INTO WorkerSkills (
			id_worker,
			id_skill)
		VALUES (
			in_worker_id,
			JSON_EXTRACT(skill_ids, CONCAT('$[', i, ']'))
		);
		
		-- terminate the loop
        SET i = i+1;
		IF i = length THEN
			LEAVE add_skills;
		END IF;
	END LOOP;
	
    ######## NEW IMAGES INSERT ########
    
	SET length = JSON_LENGTH(worker_images);
    SET i = 0;
        
    add_images: LOOP
		INSERT INTO WorkerGallery (
			id_worker,
			file_name)
		VALUES (
			in_worker_id,
            TRIM('"' FROM 
			JSON_EXTRACT(worker_images, CONCAT('$[', i, ']')))
		);
		
		-- terminate the loop
		SET i = i+1;
		IF i = length THEN
			LEAVE add_images;
		END IF;
	END LOOP;
    
    COMMIT;
END $$
DELIMITER ;

-- Example
-- CALL EditWorker(
-- 	21,
-- 	'nombreEDIT2',
--     'lastname EDIT2',
--     'new1@EDIT2.com',
--     'passwordEDIT2',
--     null,
--     '100001',
--     '2000-10-10',
--     
--     'new bio EDIT2 EDIT2',
--     "[4,5,6,7]",
--     '["1testPhoto3.jpg", "2testPhoto2.jpg", "3testPhoto2.jpg"]');

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
	DECLARE length INT;
    DECLARE i INT;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;
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
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Skill ID does not exist';
    END IF;
    
    
    INSERT INTO Reviews (
        id_worker,
        id_user,
        rating,
        review_txt,
        id_skill
    )
    VALUES (
        review_worker_id,
        review_user_id,
        review_rating,
        review_text,
        review_skill_id
    );
    
    SET new_review_id = LAST_INSERT_ID();
    
    -- Inserts images into the ReviewGallery table
	
    select CONCAT("Recieved gallery: ", review_images);
    IF (review_images IS NOT NULL) THEN -- Checks if there are any images to be added		
		SET length = JSON_LENGTH(review_images);
        
		SET i = 0;
			
		add_images: LOOP
			INSERT INTO ReviewGallery (
				id_review,
				file_name)
			VALUES (
				new_review_id,
				TRIM('"' FROM 
				JSON_EXTRACT(review_images, CONCAT('$[', i, ']')))
			);
			
			-- terminate the loop
			SET i = i+1;
			IF i = length THEN
				LEAVE add_images;
			END IF;
		END LOOP;
    END IF;
    
    COMMIT;
END $$
DELIMITER ;

-- Example
-- CALL AddReview(
--     1,  -- worker
--     20,  -- user
--     3,  -- rating
--     'Review Test',  -- text
--     1, -- skill
--     '["img1.png", "img2.png"]' -- images
-- );

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
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;
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
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'User ID does not exist';
    END IF;
    
    INSERT INTO Leads (
        id_worker,
        id_user,
        title,
        details
    )
    VALUES (
        lead_worker_id,
        lead_user_id,
        lead_title,
        lead_details
    );
    
    COMMIT;
END $$
DELIMITER ;

-- Example
-- CALL AddLead(
--     1, -- worker_id
--     20, -- user_id
--     "title TEST",-- title
--     "message TEST"-- details
-- );

-- ------------------------------------- UPDATE ARCHIVE LEAD ------------------------------------------
# This transaction updates the is_archived status of a lead based on the provided input.
# The existing lead ID in the input parameters is verified; the transaction rolls back if it is not valid.

DROP PROCEDURE IF EXISTS updateArchivedLead;

DELIMITER $$

CREATE PROCEDURE updateArchivedLead(
    IN lead_id BIGINT, 
    IN archive_flag BOOLEAN
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;
    START TRANSACTION;
    
    -- Rollback if the lead ID does not exist
    IF NOT EXISTS (
        SELECT
            1
        FROM
            Leads
        WHERE
            id_lead = lead_id)
        THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Lead ID does not exist';
    END IF;
    
    -- Updates the state of the lead
	UPDATE Leads
	SET is_archived = archive_flag
	WHERE id_lead = lead_id;
    
    -- Returns all the leads from the corresponding worker
    SELECT * FROM AllLeads WHERE id = (
		SELECT id_worker FROM Leads WHERE id_lead = lead_id);
    
    COMMIT;
END $$
DELIMITER ;

-- Example
-- CALL updateArchivedLead(
--     1, -- lead_id
--     0 -- archive_flag
-- );