INSERT INTO portfolio
    (image_url,user_id)
VALUES
    ($1, $2)
RETURNING *;