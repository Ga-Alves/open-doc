DELETE FROM article;

ALTER TABLE article ADD COLUMN author_id UUID;

ALTER TABLE article
ADD CONSTRAINT fk_article_author
FOREIGN KEY (author_id)
REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX idx_article_author_id ON article(author_id);