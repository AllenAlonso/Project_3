-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "coordinates" (
    "School" VARCHAR(255)   NOT NULL,
    "Latitude" FLOAT   NOT NULL,
    "Longitude" FLOAT   NOT NULL,
    CONSTRAINT "pk_Coordinates" PRIMARY KEY (
        "School"
     )
);

CREATE TABLE "players" (
    "PlayerName" VARCHAR(255)   NOT NULL,
    "School" VARCHAR(255)   NOT NULL,
    "Source" VARCHAR(255)   NOT NULL,
    "HighLevel" VARCHAR(255)   NOT NULL,
    "Year" INT   NOT NULL
);

ALTER TABLE "players" ADD CONSTRAINT "fk_Players_School" FOREIGN KEY("School")
REFERENCES "coordinates" ("School");

