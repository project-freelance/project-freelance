INSERT INTO employer_post
    (title, body, specialty, price, user_id, moment)
VALUES
    ($1, $2, $3, $4, $5, $6)
RETURNING *;