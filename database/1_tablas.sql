-- ------------------------------------- CREATING DATABASE ------------------------------------------

DROP DATABASE IF EXISTS Serviralia;
CREATE DATABASE Serviralia;
USE Serviralia;

-- ------------------------------------- CREATING TABLES ------------------------------------------
# all ID types are NOT NULL AUTO_INCREMENT because they are the primary key of the table
# all tables that save data about foreign keys have UNIQUE constraints to avoid duplicates

DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
	id_user BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(254) NOT NULL,
  phone BIGINT NOT NULL,
  password_hash CHAR(72) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pfp_file_name CHAR(100),
  date_of_birth DATE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT '1', 
      -- deactivated accounts won't be removed from the table, is_active will be set to 0

  PRIMARY KEY (id_user),
  CONSTRAINT users_email_unique 
    UNIQUE (email),
  CONSTRAINT users_phone_unique
    UNIQUE (phone),
  CONSTRAINT users_pfp_file_name_unique
    UNIQUE (pfp_file_name)
);

DROP TABLE IF EXISTS Workers;
CREATE TABLE Workers(
  id_worker BIGINT NOT NULL AUTO_INCREMENT,
  id_user BIGINT NOT NULL,
  bio TEXT NOT NULL,

  PRIMARY KEY (id_worker),
  CONSTRAINT workers_id_user_FK
    FOREIGN KEY(id_user)
    REFERENCES Users(id_user)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
	CONSTRAINT workers_id_user_unique
		UNIQUE (id_user)
);

DROP TABLE IF EXISTS Skills;
CREATE TABLE Skills(
  id_skill INT NOT NULL AUTO_INCREMENT,
  skill_name CHAR(100) NOT NULL,
  
  PRIMARY KEY (id_skill),
  CONSTRAINT skills_skill_name_unique
    UNIQUE (skill_name)
);

DROP TABLE IF EXISTS WorkerSkills;
CREATE TABLE WorkerSkills(
  id_worker BIGINT NOT NULL,
  id_skill INT NOT NULL AUTO_INCREMENT,
  
  PRIMARY KEY(id_worker, id_skill),
  CONSTRAINT workerskills_id_worker_FK
    FOREIGN KEY (id_worker)
    REFERENCES Workers(id_worker)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  CONSTRAINT workerskills_id_skill_FK
    FOREIGN KEY (id_skill)
    REFERENCES Skills(id_skill) 
      ON DELETE RESTRICT
      ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Reviews;
CREATE TABLE Reviews(
  id_review BIGINT NOT NULL AUTO_INCREMENT,
  id_worker BIGINT NOT NULL,
  id_user BIGINT,
  rating TINYINT NOT NULL,
  review_txt TEXT NOT NULL,
  id_skill INT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id_review),
  CONSTRAINT reviews_id_worker_FK
    FOREIGN KEY(id_worker)
    REFERENCES Workers(id_worker)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  CONSTRAINT reviews_id_user_FK
    FOREIGN KEY(id_user)
    REFERENCES Users(id_user)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  CONSTRAINT reviews_id_skill_FK
    FOREIGN KEY(id_skill)
    REFERENCES Skills(id_skill)
      ON DELETE RESTRICT
      ON UPDATE CASCADE
);

DROP TABLE IF EXISTS ReviewGallery;
CREATE TABLE ReviewGallery(
  id_photo BIGINT NOT NULL AUTO_INCREMENT,
  id_review BIGINT NOT NULL,
  file_name CHAR(100) NOT NULL,
  
  PRIMARY KEY(id_photo),
  CONSTRAINT reviewgallery_id_review_FK
    FOREIGN KEY(id_review)
    REFERENCES Reviews(id_review)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  CONSTRAINT reviewgallery_file_name_unique
    UNIQUE (file_name)
);

DROP TABLE IF EXISTS WorkerGallery;
CREATE TABLE WorkerGallery(
  id_photo BIGINT NOT NULL AUTO_INCREMENT,
  id_worker BIGINT NOT NULL,
  file_name CHAR(100) NOT NULL,

  PRIMARY KEY (id_photo),
  CONSTRAINT workergallery_id_worker_FK
    FOREIGN KEY(id_worker)
    REFERENCES Workers(id_worker)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  CONSTRAINT workergallery_file_name_unique
    UNIQUE(file_name)
);

DROP TABLE IF EXISTS Leads;
CREATE TABLE Leads(
  id_lead BIGINT NOT NULL AUTO_INCREMENT,
  id_worker BIGINT NOT NULL,
  id_user BIGINT,
  title VARCHAR(100) NOT NULL,
  details TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_archived BOOLEAN NOT NULL DEFAULT '0',

  PRIMARY KEY(id_lead),
  CONSTRAINT leads_id_worker_FK
    FOREIGN KEY(id_worker)
    REFERENCES Workers(id_worker)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  CONSTRAINT leads_id_user_FK
    FOREIGN KEY(id_user)
    REFERENCES Users(id_user)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);