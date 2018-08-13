INSERT INTO freelancer_post
    (title, body, user_id, moment)
VALUES
    ($1, $2, $3, $4)
RETURNING *;