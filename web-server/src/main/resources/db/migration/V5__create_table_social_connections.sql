CREATE TABLE IF NOT EXISTS social_connections (
    follower_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    followee_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (follower_id, followee_id)
);
