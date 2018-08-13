UPDATE portfolio
    SET image_url1 = $2, image_url2 = $3, image_url3 = $4, link1 = $5, link2 = $6, link3 = $7
WHERE user_id=$1
RETURNING *;