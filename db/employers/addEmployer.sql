INSERT INTO employer_profile
    (bio,company,position,city, state, user_id, company_logo)
VALUES
    ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;