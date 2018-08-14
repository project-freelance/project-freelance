INSERT INTO freelancer_profile
    (user_id)
VALUES
    ($1)
RETURNING *;