SELECT p."PlayerName",p."Source",p."HighLevel",p."Year",p."School",c."Latitude",c."Longitude"
FROM players AS p
JOIN coordinates AS c
ON p."School" = c."School";