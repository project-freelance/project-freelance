INSERT INTO employer_profile
    (user_id)
VALUES
    ($1)
RETURNING *;