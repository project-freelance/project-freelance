INSERT INTO freelancer_post
    (title, body, user_id)
VALUES
    ($1, $2, $3)
RETURNING *;