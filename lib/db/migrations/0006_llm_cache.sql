CREATE TABLE llm_cache (
    id SERIAL PRIMARY KEY,
    prompt_hash VARCHAR(64) NOT NULL UNIQUE,
    prompt TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_llm_cache_prompt_hash ON llm_cache(prompt_hash); 