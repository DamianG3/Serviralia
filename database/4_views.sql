USE Serviralia;

-- ------------------------------------- VIEW OF ALL WORKERS' INFORMATION ------------------------------------------
# Use: worker's profile in website

DROP VIEW IF EXISTS AllWorkers;
CREATE VIEW AllWorkers AS
	SELECT 
		id_worker as id, -- Worker's ID
		CONCAT(Users.first_name, ' ', Users.last_name) AS fullName, -- Worker's full name
		Users.pfp_file_name as pfpFileName, 
		Workers.bio AS biography,
        
		wokerSkillsJson(id_worker) AS skills,		
		GlobalRatingAverage(id_worker) AS reviewAverage,
		CountWorkerReviews(id_worker) AS totalReviews,
        GetAllWorkerImages(id_worker) AS gallery
	FROM
		Workers
	JOIN
		Users USING(id_user);

-- ------------------------------------- VIEW OF ALL REVIEWS WRITTEN ------------------------------------------
# Use: worker's profile in website. At the bottom of the profile is the review section, with all reviews and
# their information (rating, skill, user that wrote the review, text and images attached).

DROP VIEW IF EXISTS AllReviews;
CREATE VIEW AllReviews AS
	SELECT 
		Reviews.id_worker AS id, 
		Users.first_name AS username, -- Just first name to protect user privacy
		Users.pfp_file_name AS pfpFileName, 
		Reviews.date_created AS date, 
		Skills.skill_name AS skill, 
		Reviews.rating, 
		Reviews.review_txt AS review,
        -- Subquery of the images attached in the review in JSON
		(SELECT
			JSON_ARRAYAGG(file_name) 
		 FROM
			ReviewGallery 
		 WHERE
         id_review = Reviews.id_review) AS gallery
	FROM
		Reviews
	JOIN
		Users USING(id_user)
	JOIN
		Skills USING(id_skill)
	ORDER BY
		id_worker,
        Reviews.date_created DESC; -- To see recent reviews first

-- ------------------------------------- VIEW OF ALL WORKERS' RATING SUMMARY ------------------------------------------
# Use: worker's profile in website. At the bottom of the profile is the review section, which starts with
# a summary of all their ratings. There is a global rating average as well as individual rating averages
# of all their skills.

DROP VIEW IF EXISTS WorkersRatingSummary;
CREATE VIEW WorkersRatingSummary AS
	
    -- Selects global ratings of all workers
	SELECT 
		Workers.id_worker AS id, 
		GlobalRatingAverage(Workers.id_worker) AS rating, 
		'General' AS skill
	FROM
		Workers
	
    -- Joins the individual skill ratings of all workers
	UNION ALL 
    
	SELECT 
		WorkerSkills.id_worker AS ID, 
		RatingAverage(WorkerSkills.id_worker, WorkerSkills.id_skill) AS rating, 
		Skills.skill_name AS skill
	FROM
		WorkerSkills
	JOIN
		Skills USING (id_skill);
        
-- ------------------------------------- VIEW OF ALL WORKERS' INFORMATION SEPARATED BY SKILL ------------------------------------------
#DEPRECATED: This view does not order results by relevance. Use the SearchSkill() procedure instead.
# Use: website search page. The website's search page displays the worker's name, profile picture, 2 images of their work,
# their rating average (of the skill searched), the amount of reviews they have gotten and a list of their skills.

DROP VIEW IF EXISTS WorkersInfoBySkill;
CREATE VIEW WorkersInfoBySkill AS
	SELECT 
		WorkerSkills.id_skill, 
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
	ORDER BY
		id_skill,
        Rating DESC; -- To see highest rated first

-- ------------------------------------- VIEW OF ALL WORKERS' LEADS ------------------------------------------
# Use: worker's lead history in website. Workers can access a page that displays all leads they have gotten
# through contact forms.
        
DROP VIEW IF EXISTS AllLeads;
CREATE VIEW AllLeads AS
	SELECT 
		id_worker AS id, 
        id_lead AS idLead, 
		first_name AS username, -- Just first name to protect user privacy
        email,
        phone,
		pfp_file_name AS pfpFileName, 
		Leads.date_created AS date, 
		title, 
		details,
        is_archived as isArchived
	FROM
		Leads
	JOIN
		Users USING(id_user)
	ORDER BY
		id_worker,
		Leads.date_created DESC; -- To see recent leads first

-- ------------------------------------- VIEW OF ALL USER'S DATA  ------------------------------------------
# Use: User's Edit Page. To see their current information an update it if necessary


DROP VIEW IF EXISTS userData;
CREATE VIEW userData AS
	SELECT 
		id_user AS id,
		first_name AS firstName,
		last_name AS lastName,
		email,
		phone,
		date_of_birth AS birthDate,
		pfp_file_name AS pfpFileName
	FROM
		Users;

-- ------------------------------------- VIEW OF ALL WORKERS' DATA  ------------------------------------------
# Use: Worker's Edit Page. To see their current information an update it if necessary

DROP VIEW IF EXISTS workerData;
CREATE VIEW workerData AS
	SELECT 
		id_worker AS id,
		first_name AS firstName,
		last_name AS lastName,
		email,
		phone,
		date_of_birth AS birthDate,
		pfp_file_name AS pfpFileName,
		
		bio,
		wokerSkillsJson(id_worker) as skills,
		GetAllWorkerImages(id_worker) as gallery
	FROM
		Users
	JOIN 
		Workers USING(id_user);


-- ------------------------------------- VIEW OF USER IMAGES  ------------------------------------------
# Use: Get the images related to a user

DROP VIEW IF EXISTS UserImages;
CREATE VIEW UserImages AS
SELECT 
    id_user, pfp_file_name file_name
FROM
    users 
UNION ALL SELECT 
    id_user, file_name
FROM
    Workers
        JOIN
    Users USING (id_user)
        JOIN
    WorkerGallery USING (id_worker) 
UNION ALL SELECT 
    id_user, file_name
FROM
    Reviews
        JOIN
    ReviewGallery USING (id_review)
        JOIN
    Users USING (id_user) 
UNION ALL SELECT 
    Workers.id_user, file_name
FROM
    Reviews
        JOIN
    ReviewGallery USING (id_review)
        JOIN
    Workers USING (id_worker)
