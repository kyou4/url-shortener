CREATE TABLE "shortUrl" (
	"id" serial PRIMARY KEY NOT NULL,
	"originalUrl" varchar(999) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
