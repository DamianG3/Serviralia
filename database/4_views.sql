USE Serviralia;

-- ------------------------------------- VIEW OF ALL WORKERS' INFORMATION ------------------------------------------
# Use: worker's profile in website

DROP VIEW IF EXISTS AllWorkers;
CREATE VIEW AllWorkers AS
	SELECT 
		Workers.id_worker, -- Worker's ID
		CONCAT(Users.first_name, ' ', Users.last_name) AS Full_Name, -- Worker's full name
		Users.pfp_file_name, 
		(SELECT
			JSON_ARRAYAGG(Skills.name_category) 
		 FROM
			Skills 
		 JOIN
			WorkerSkills
			ON Skills.id_skill = WorkerSkills.id_skill 
		 WHERE
			WorkerSkills.id_worker = Workers.id_worker) AS Skills,
			GlobalRatingAverage(Workers.id_worker) AS Rating_Average,
			CountWorkerReviews(Workers.id_worker) AS Total_Reviews,
			Workers.bio AS Biography,
		(SELECT
			JSON_ARRAYAGG(file_name) 
		 FROM
			WorkerGallery 
		 WHERE
			id_worker = Workers.id_worker) AS Gallery
	FROM
		Workers
	JOIN
		Users
		ON Workers.id_user = Users.id_user;

-- ------------------------------------- VIEW OF ALL REVIEWS WRITTEN ------------------------------------------
# Use: worker's profile in website. At the bottom of the profile is the review section, with all reviews and
# their information (rating, skill, user that wrote the review, text and images attached).

DROP VIEW IF EXISTS AllReviews;
CREATE VIEW AllReviews AS
	SELECT 
		Reviews.id_worker, 
		CONCAT(Users.first_name, ' ', Users.last_name) AS Username, -- Just first name to protect user privacy
		Users.pfp_file_name, 
		Reviews.date_created AS Date, 
		Skills.name_category AS Skill, 
		Reviews.rating, 
		Reviews.review_txt AS Review,
        -- Subquery of the images attached in the review in JSON
		(SELECT
			JSON_ARRAYAGG(file_name) 
		 FROM
			ReviewGallery 
		 WHERE
         id_review = Reviews.id_review) AS Gallery
	FROM
		Reviews
	JOIN
		Users
        ON Reviews.id_user = Users.id_user
	JOIN
		Skills
        ON Reviews.id_skill = Skills.id_skill
	ORDER BY
		id_worker,
        Reviews.date_created DESC; -- To see recent reviews first

-- ------------------------------------- VIEW OF ALL WORKERS' INFORMATION SEPARATED BY SKILL ------------------------------------------

# Use: website search page. The website's search page displays the worker's name, profile picture, 2 images of their work,
# their rating average (of the skill searched), the amount of reviews they have gotten and a list of their skills.

DROP VIEW IF EXISTS WorkersInfoBySkill;
CREATE VIEW WorkersInfoBySkill AS
	SELECT 
		WorkerSkills.id_skill, 
		CONCAT(Users.first_name, ' ', Users.last_name) AS Name, 
		Users.pfp_file_name, 
		get2WorkerImages(Workers.id_worker) AS Gallery, -- Just shows two images
		RatingAverage(Workers.id_worker, WorkerSkills.id_skill) AS Rating, 
		CountWorkerReviewsBySkill(Workers.id_worker, WorkerSkills.id_skill) AS Total_Reviews,
        (SELECT
			JSON_ARRAYAGG(Skills.name_category) 
		 FROM
			Skills 
		 JOIN
			WorkerSkills
			ON Skills.id_skill = WorkerSkills.id_skill 
		 WHERE
			WorkerSkills.id_worker = Workers.id_worker) AS All_Skills
	FROM
		WorkerSkills
	JOIN
		Workers
        ON WorkerSkills.id_worker = Workers.id_worker
	JOIN
		Users
        ON Workers.id_user = Users.id_user
	ORDER BY
		id_skill,
        Rating DESC; -- To see highest rated first

-- ------------------------------------- VIEW OF ALL WORKERS' RATING SUMMARY ------------------------------------------
# Use: worker's profile in website. At the bottom of the profile is the review section, which starts with
# a summary of all their ratings. There is a global rating average as well as individual rating averages
# of all their skills.

DROP VIEW IF EXISTS WorkersRatingSummary;
CREATE VIEW WorkersRatingSummary AS
	
    -- Selects global ratings of all workers
	SELECT 
		Workers.id_worker, 
		GlobalRatingAverage(Workers.id_worker) AS Rating_Average, 
		'General' AS Skill
	FROM
		Workers
	
    -- Joins the individual skill ratings of all workers
	UNION ALL 
    
	SELECT 
		WorkerSkills.id_worker, 
		RatingAverage(WorkerSkills.id_worker, WorkerSkills.id_skill) AS Rating_Average, 
		Skills.name_category AS Skill
	FROM
		WorkerSkills
	JOIN
		Skills
        ON WorkerSkills.id_skill = Skills.id_skill;

-- ------------------------------------- VIEW OF ALL WORKERS' LEADS ------------------------------------------
# Use: worker's lead history in website. Workers can access a page that displays all leads they have gotten
# through contact forms.
        
DROP VIEW IF EXISTS AllLeads;
CREATE VIEW AllLeads AS
	SELECT 
		Leads.id_worker, 
		CONCAT(Users.first_name, ' ', Users.last_name) AS Username, 
		Users.pfp_file_name, 
		Leads.date_created AS Date, 
		Leads.title, 
		Leads.details
	FROM
		Leads
	JOIN
		Users
        ON Leads.id_user = Users.id_user
	ORDER BY
		id_worker;