CREATE DATABASE IF NOT EXISTS SkiJumping;
USE SkiJumping;
CREATE TABLE IF NOT EXISTS SkiJumpers (
	IDSkiJumpers int NOT NULL AUTO_INCREMENT UNIQUE,
	FirstName varchar(255) NOT NULL,
	LastName varchar(255) NOT NULL,
	Country varchar(255) NOT NULL,
	Height int NOT NULL,
	DateOfBirth date NOT NULL,
	PRIMARY KEY (IDSkiJumpers)
);
CREATE TABLE IF NOT EXISTS Events (
	IDEvents int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL,
	Seasons varchar(255) NOT NULL,
	PRIMARY KEY (IDEvents)
);
CREATE TABLE IF NOT EXISTS HallOfGlory (
	IDSkiJumpers int NOT NULL AUTO_INCREMENT UNIQUE,
	OlympicGamesGold int NOT NULL,
	OlympicGamesSilver int NOT NULL,
	OlympicGamesBronze int NOT NULL,
	WorldChampionshipsGold int NOT NULL,
	WorldChampionshipsSilver int NOT NULL,
	WorldChampionshipsBronze int NOT NULL,
	SkiFlyingWorldChampionshipsGold int NOT NULL,
	SkiFlyingWorldChampionshipsSilver int NOT NULL,
	SkiFlyingWorldChampionshipsBronze int NOT NULL,
	VictoriesWorldCup int NOT NULL,
	PodiumsWorldCup int NOT NULL,
	WorldCup int NOT NULL,
	SkiFlyingWorldCup int NOT NULL,
	FourHillsTournament int NOT NULL,
	NordicTournament int NOT NULL,
	RawAir int NOT NULL,
	CONSTRAINT FK_SkiJumpersHallOfGlory FOREIGN KEY (IDSkiJumpers)
	REFERENCES SkiJumpers(IDSkiJumpers)
);	
CREATE TABLE IF NOT EXISTS Results (
	IDEvents int NOT NULL,
	Place int NOT NULL,
	IDSkiJumpers int NOT NULL,
	CONSTRAINT FK_EventsResults FOREIGN KEY (IDEvents)
	REFERENCES Events(IDEvents),
	CONSTRAINT FK_SkiJumpersResults FOREIGN KEY (IDSkiJumpers)
	REFERENCES SkiJumpers(IDSkiJumpers)
);
CREATE TABLE IF NOT EXISTS Country (
	IDCountry int NOT NULL AUTO_INCREMENT UNIQUE,
	Country varchar(255) NOT NULL,
	PRIMARY KEY (IDCountry)
);	
CREATE TABLE IF NOT EXISTS SkiJumpHill (
	IDSkiJumpHill int NOT NULL AUTO_INCREMENT UNIQUE,
	IDCountry int NOT NULL,
	City varchar(255) NOT NULL,
	HS int NOT NULL,
	KPoint int NOT NULL,
	HillRecord float NOT NULL,
	CONSTRAINT FK_CountrySkiJumpHill FOREIGN KEY (IDCountry)
	REFERENCES Country(IDCountry)
);	