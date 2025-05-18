USE Serviralia;

-- ------------------------------------- RATING AVERAGE OF WORKER'S SKILL ------------------------------------------

DROP FUNCTION IF EXISTS RatingAverage;

DELIMITER $$

CREATE FUNCTION RatingAverage(
	worker_in BIGINT,
    skill_in INT
	)
    
RETURNS DECIMAL(2, 1) -- Format example: 4.95
DETERMINISTIC

BEGIN
	DECLARE ratingAVG DECIMAL(2, 1);

	SELECT
        AVG(rating) INTO ratingAVG
    FROM
		Reviews
    WHERE
		id_worker = worker_in
        AND id_skill = skill_in;
        
	-- If the return value is null, the function will return 0 as the global average rating 
	RETURN IFNULL(ratingAVG, 0);
END $$
DELIMITER ;

-- ------------------------------------- GLOBAL RATING AVERAGE ------------------------------------------

DROP FUNCTION IF EXISTS GlobalRatingAverage;

DELIMITER $$

CREATE FUNCTION GlobalRatingAverage(
	worker_in BIGINT
	)
    
RETURNS DECIMAL(2, 1) -- Format example: 4.95
DETERMINISTIC
    
BEGIN
	DECLARE ratingAVG DECIMAL(2, 1);

	SELECT
        AVG(rating) INTO ratingAVG
    FROM
		Reviews
    WHERE
		id_worker = worker_in;
        
	-- If the return value is null, the function will return 0 as the global average rating 
	RETURN IFNULL(ratingAVG, 0);
END $$
DELIMITER ;

-- ------------------------------------- COUNT GLOBAL REVIEWS ------------------------------------------

USE Serviralia;
DROP FUNCTION IF EXISTS CountWorkerReviews;

DELIMITER $$

CREATE FUNCTION CountWorkerReviews(
	worker_in BIGINT
    ) 
    
RETURNS INT
DETERMINISTIC

BEGIN
    DECLARE review_count INT;
    SELECT
		COUNT(*) INTO review_count
    FROM
		Reviews
    WHERE
		id_worker = worker_in;
        
    RETURN review_count;
END $$
DELIMITER ;

-- ------------------------------------- COUNT REVIEWS BY SKILL ------------------------------------------

USE Serviralia;
DROP FUNCTION IF EXISTS CountWorkerReviewsBySkill;

DELIMITER $$

CREATE FUNCTION CountWorkerReviewsBySkill(
	worker_in BIGINT,
    skill_in INT
    ) 

RETURNS INT
DETERMINISTIC

BEGIN
    DECLARE review_count INT;
    SELECT
		COUNT(*) INTO review_count
    FROM
		Reviews
    WHERE
		id_worker = worker_in
        AND id_skill = skill_in;
        
    RETURN review_count;
    
END $$
DELIMITER ;

-- ------------------------------------- GET ALL IMAGES FROM GALLERY ------------------------------------------

DROP FUNCTION IF EXISTS GetAllWorkerImages;

DELIMITER $$

CREATE FUNCTION GetAllWorkerImages(
	worker_in BIGINT
    )

RETURNS JSON
DETERMINISTIC

BEGIN
	DECLARE imageList JSON;
    
    SELECT
		-- Function similar to CONCAT that adds selected file_name records in a JSON array format
		JSON_ARRAYAGG(file_name) INTO imageList
	FROM
		WorkerGallery
	WHERE
		id_worker = worker_in;
    
    RETURN imageList;
    
END $$
DELIMITER ;

-- ------------------------------------- GET 2 IMAGES FROM GALLERY ------------------------------------------

DROP FUNCTION IF EXISTS Get2WorkerImages;

DELIMITER $$

CREATE FUNCTION Get2WorkerImages(
	worker_in BIGINT
    )

RETURNS JSON
DETERMINISTIC

BEGIN
	DECLARE imageList JSON;
    
    SELECT
		JSON_ARRAYAGG(file_name) INTO imageList
	FROM
    ( -- Sub-querry to get two images from de WorkerGallery table
    -- The LIMIT must be in the subquery because JSON_ARRAYAGG aggregates all rows
		SELECT
			file_name
		FROM
			WorkerGallery
		WHERE
			id_worker = worker_in
		LIMIT 2
	) AS Gallery;
    
    RETURN imageList;
    
END $$
DELIMITER ;

-- ------------------------------------- LISTS ALL OF A WORKER SKILLS IN JSON -------------------------------------

DROP FUNCTION IF EXISTS wokerSkillsJson;

DELIMITER $$

CREATE FUNCTION wokerSkillsJson(
	worker_in BIGINT
    )

RETURNS JSON
DETERMINISTIC

BEGIN
	DECLARE skillsList JSON;
    
    SELECT
		JSON_ARRAYAGG(Skills.skill_name) INTO skillsList
	 FROM
		Skills 
	 JOIN
		WorkerSkills USING(id_skill)
	 WHERE
		id_worker = worker_in;
        
    RETURN skillsList;
    
END $$
DELIMITER ;



-- ------------------------------------- UnreadLeads ------------------------------------------

DROP FUNCTION IF EXISTS UnreadLeads;

DELIMITER $$

CREATE FUNCTION UnreadLeads(
	worker_in BIGINT
	)
    
RETURNS INT
DETERMINISTIC
    
BEGIN
	DECLARE unread INT;

	SELECT 
		SUM(!is_archived) INTO unread
	FROM 
		Leads 
	WHERE
		id_worker = worker_in;

        
	-- If the return value is null, the function will return 0 
	RETURN IFNULL(unread, 0);
END $$
DELIMITER ;