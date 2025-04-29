USE Serviralia;

-- ------------------------------------- RATING AVERAGE OF WORKER'S SKILL ------------------------------------------

DROP FUNCTION IF EXISTS RatingAverage;

DELIMITER $$

CREATE FUNCTION RatingAverage(
	worker BIGINT,
    skill INT
	)
    
RETURNS DECIMAL(3, 2) -- Format example: 4.95
DETERMINISTIC
    
BEGIN
	DECLARE AVGrating DECIMAL(3, 2);
	SELECT
        AVG(rating) INTO AVGrating
    FROM
		Reviews
    WHERE
		id_worker = worker
        AND id_skill = skill;
        
	-- If the return value is null, the function will return 0 as the global average rating 
	RETURN
		IFNULL(AVGrating, 0);
END $$

-- ------------------------------------- GLOBAL RATING AVERAGE ------------------------------------------

DROP FUNCTION IF EXISTS GlobalRatingAverage;

DELIMITER $$

CREATE FUNCTION GlobalRatingAverage(
	worker BIGINT
	)
    
RETURNS DECIMAL(3, 2)
DETERMINISTIC
    
BEGIN
	DECLARE AVGrating DECIMAL(3, 2); -- Format example: 4.95
	SELECT
        AVG(rating) INTO AVGrating
    FROM
		Reviews
    WHERE
		id_worker = worker;
        
	-- If the return value is null, the function will return 0 as the global average rating 
	RETURN
		IFNULL(AVGrating, 0);
END $$

-- ------------------------------------- COUNT GLOBAL REVIEWS ------------------------------------------

USE Serviralia;
DROP FUNCTION IF EXISTS CountWorkerReviews;

DELIMITER $$

CREATE FUNCTION CountWorkerReviews(
	worker BIGINT
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
		id_worker = worker;
    RETURN review_count;
END $$

-- ------------------------------------- COUNT REVIEWS BY SKILL ------------------------------------------

USE Serviralia;
DROP FUNCTION IF EXISTS CountWorkerReviewsBySkill;

DELIMITER $$

CREATE FUNCTION CountWorkerReviewsBySkill(
	worker BIGINT,
    skill INT
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
		id_worker = worker
        AND id_skill = skill;
    RETURN review_count;
END $$

-- ------------------------------------- GET 2 IMAGES FROM GALLERY ------------------------------------------

DROP FUNCTION IF EXISTS Get2WorkerImages;

DELIMITER $$

CREATE FUNCTION Get2WorkerImages(
	worker BIGINT
    )

RETURNS JSON
DETERMINISTIC

BEGIN
	DECLARE imageList JSON;
    SELECT
		-- Function similar to CONCAT that adds selected file_name records in a JSON array format
		JSON_ARRAYAGG(file_name) INTO imageList
	FROM(
		SELECT
			file_name
		FROM
			WorkerGallery
		WHERE
			id_worker = worker
		LIMIT 2
	) AS Gallery;
    RETURN imageList;
END $$

# SELECT get2WorkerImages(1);