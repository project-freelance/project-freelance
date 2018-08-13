INSERT INTO portfolio
    (image_url1,image_url2, image_url3, link1, link2, link3, user_id)
VALUES
    ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;