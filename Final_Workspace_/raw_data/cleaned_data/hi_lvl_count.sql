CREATE TABLE college AS
SELECT players."School" AS school,
	SUM(CASE WHEN players."HighLevel" = 'Rk' AND players."Source"='College' THEN 1 ELSE 0 END) as RK,
	SUM(CASE WHEN players."HighLevel" = 'A' AND players."Source"='College' THEN 1 ELSE 0 END) as A,
	SUM(CASE WHEN players."HighLevel" = 'A+' AND players."Source"='College' THEN 1 ELSE 0 END) as AP,
	SUM(CASE WHEN players."HighLevel" = 'AA' AND players."Source"='College' THEN 1 ELSE 0 END) as AA,
	SUM(CASE WHEN players."HighLevel" = 'AAA' AND players."Source"='College' THEN 1 ELSE 0 END) as AAA,
	SUM(CASE WHEN players."HighLevel" = 'MLB' AND players."Source"='College' THEN 1 ELSE 0 END) as MLB,
	COUNT(players."HighLevel") filter(where players."Source"='College') AS TOTAL
FROM players
GROUP BY players."School"
ORDER BY total DESC
LIMIT 10;


DROP TABLE highschool;
CREATE TABLE highschool AS
SELECT players."School" AS school,
	SUM(CASE WHEN players."HighLevel" = 'Rk' AND players."Source"='HS' THEN 1 ELSE 0 END) as RK,
	SUM(CASE WHEN players."HighLevel" = 'A' AND players."Source"='HS' THEN 1 ELSE 0 END) as A,
	SUM(CASE WHEN players."HighLevel" = 'A+' AND players."Source"='HS' THEN 1 ELSE 0 END) as AP,
	SUM(CASE WHEN players."HighLevel" = 'AA' AND players."Source"='HS' THEN 1 ELSE 0 END) as AA,
	SUM(CASE WHEN players."HighLevel" = 'AAA' AND players."Source"='HS' THEN 1 ELSE 0 END) as AAA,
	SUM(CASE WHEN players."HighLevel" = 'MLB' AND players."Source"='HS' THEN 1 ELSE 0 END) as MLB,
	COUNT(players."HighLevel") filter(where players."Source"='HS') AS TOTAL
FROM players
GROUP BY players."School"
ORDER BY total DESC
LIMIT 10;

SELECT json_agg(highschool)
FROM highschool
SELECT json_agg(college)
FROM college
