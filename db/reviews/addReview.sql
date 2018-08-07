INSERT INTO reviews
    (review, user_id, reviewer_id, moment, rating)
VALUES
    ($1, $2, $3, $4, $5)
RETURNING *;