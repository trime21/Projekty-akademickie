USE SkiJumping;

UPDATE HallOfGlory
SET PodiumsWorldCup = PodiumsWorldCup + 1
WHERE IDSkiJumpers = (SELECT IDSkiJumpers FROM SkiJumpers WHERE LastName LIKE 'Żyła');

SELECT IDSkiJumpers FROM SkiJumpers WHERE LastName LIKE 'Żyła';
UPDATE HallOfGlory
SET PodiumsWorldCup = PodiumsWorldCup + 1,
	VictoriesWorldCup = VictoriesWorldCup + 1
WHERE IDSkiJumpers = (SELECT IDSkiJumpers FROM SkiJumpers WHERE LastName LIKE 'Forfang';);

SELECT FirstName, LastName, DateOfBirth FROM SkiJumpers ORDER BY DateOfBirth;
SELECT FirstName, LastName, Height FROM SkiJumpers WHERE Height > 180 ORDER BY Height DESC;
SELECT DISTINCT Country FROM SkiJumpers ORDER BY Country;
SELECT DISTINCT Country, COUNT(Country) AS quantity FROM SkiJumpers GROUP BY Country ORDER BY quantity;
SELECT AVG(Height) FROM SkiJumpers;
SELECT DISTINCT Country, AVG(Height) as avange FROM SkiJumpers GROUP BY Country ORDER BY avange;
SELECT DISTINCT Country, MAX(Height) as maksiumum FROM SkiJumpers GROUP BY Country ORDER BY maksiumum;

SELECT ev.Name, ev.Seasons, r.Place, sk.FirstName, sk.LastName
FROM Results r
JOIN Events ev ON r.IDEvents=ev.IDEvents 
JOIN SkiJumpers sk ON r.IDSkiJumpers=sk.IDSkiJumpers
WHERE sk.Country LIKE 'Poland' AND (ev.Name LIKE 'World Championships Normal hill' OR ev.Name LIKE 'World Championships Large hill' OR ev.Name LIKE 'Olympic Games Normal hill' OR ev.Name LIKE 'Olympic Games Large hill')
ORDER BY r.IDEvents;

SELECT FirstName, LastName, 
OlympicGamesGold, OlympicGamesSilver, OlympicGamesBronze, 
WorldChampionshipsGold, WorldChampionshipsSilver, WorldChampionshipsBronze, 
SkiFlyingWorldChampionshipsGold, SkiFlyingWorldChampionshipsSilver, SkiFlyingWorldChampionshipsBronze, 
VictoriesWorldCup, PodiumsWorldCup, WorldCup, SkiFlyingWorldCup, FourHillsTournament, NordicTournament, RawAir
FROM SkiJumpers sk
JOIN HallOfGlory hog ON sk.IDSkiJumpers=hog.IDSkiJumpers;

SELECT ev.Name, ev.Seasons, r.Place, sk.FirstName, sk.LastName
FROM Results r
JOIN Events ev ON r.IDEvents=ev.IDEvents 
JOIN SkiJumpers sk ON r.IDSkiJumpers=sk.IDSkiJumpers
ORDER BY r.IDEvents;

SELECT FirstName, LastName, 
(OlympicGamesGold + OlympicGamesSilver + OlympicGamesBronze + 
WorldChampionshipsGold + WorldChampionshipsSilver + WorldChampionshipsBronze + 
SkiFlyingWorldChampionshipsGold + SkiFlyingWorldChampionshipsSilver + SkiFlyingWorldChampionshipsBronze) as medals
FROM SkiJumpers sk
JOIN HallOfGlory hog ON sk.IDSkiJumpers=hog.IDSkiJumpers
ORDER  BY medals DESC;

SELECT c.Country, Count(sk.IDCountry) as suma
FROM SkiJumpHill sk
JOIN Country c ON sk.IDCountry=c.IDCountry
GROUP BY Country
ORDER BY suma DESC;

SELECT ev.Name, ev.Seasons, r.Place, sk.FirstName, sk.LastName
FROM Results r
JOIN Events ev ON r.IDEvents=ev.IDEvents 
JOIN SkiJumpers sk ON r.IDSkiJumpers=sk.IDSkiJumpers
WHERE ev.Name LIKE 'World Championships Normal hill' OR ev.Name LIKE 'World Championships Large hill' OR ev.Name LIKE 'Olympic Games Normal hill' OR ev.Name LIKE 'Olympic Games Large hill'
ORDER BY r.IDEvents;

SELECT c.Country, sk.City, sk.HS, sk.KPoint, sk.HillRecord
FROM SkiJumpHill sk
JOIN Country c ON sk.IDCountry=c.IDCountry
WHERE sk.HS <= sk.HillRecord
ORDER BY sk.HillRecord DESC;

SELECT sk.FirstName, sk.LastName, hog.VictoriesWorldCup, hog.PodiumsWorldCup
FROM SkiJumpers sk
JOIN HallOfGlory hog ON sk.IDSkiJumpers=hog.IDSkiJumpers
WHERE VictoriesWorldCup >= 20 AND PodiumsWorldCup >= 50
ORDER BY VictoriesWorldCup DESC;

SELECT ev.Name, ev.Seasons, r.Place, sk.FirstName, sk.LastName
FROM Results r
JOIN Events ev ON r.IDEvents=ev.IDEvents 
JOIN SkiJumpers sk ON r.IDSkiJumpers=sk.IDSkiJumpers
WHERE r.Place LIKE 1 AND (ev.Name LIKE 'World Championships Normal hill' OR ev.Name LIKE 'World Championships Large hill' OR ev.Name LIKE 'Olympic Games Normal hill' OR ev.Name LIKE 'Olympic Games Large hill')
ORDER BY r.IDEvents;

SELECT c.Country, SUM(sk.HillRecord) as suma
FROM SkiJumpHill sk
JOIN Country c ON sk.IDCountry=c.IDCountry
GROUP BY Country
ORDER BY suma DESC;

SELECT sk.FirstName, sk.LastName, ev.Seasons
FROM Results r
JOIN SkiJumpers sk ON r.IDSkiJumpers=sk.IDSkiJumpers
JOIN Events ev oN r.IDEvents=ev.IDEvents
WHERE ev.Name LIKE 'Four Hills Tournament';

SELECT sk.FirstName, sk.LastName, COUNT(CASE ev.Name WHEN 'World Cup' THEN 1 ELSE NULL END) as quantity
FROM Results r
JOIN SkiJumpers sk ON r.IDSkiJumpers=sk.IDSkiJumpers
JOIN Events ev oN r.IDEvents=ev.IDEvents
GROUP BY r.IDSkiJumpers
ORDER BY suma DESC;