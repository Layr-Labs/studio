CREATE TABLE IF NOT EXISTS "llm_cache" (
	"id" varchar PRIMARY KEY NOT NULL,
	"prompt_hash" varchar(64) NOT NULL,
	"prompt" text NOT NULL,
	"response" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "llm_cache_prompt_hash_unique" UNIQUE("prompt_hash")
);
