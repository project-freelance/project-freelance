UPDATE portfolio
    SET image_url = $2
WHERE user_id=$1
RETURNING *;