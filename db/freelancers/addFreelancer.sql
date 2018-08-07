INSERT INTO freelancer_profile
    (bio,skills,experience,city,user_id)
VALUES
    ($1, $2, $3, $4, $5)
RETURNING *;