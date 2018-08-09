UPDATE users 
    SET 
    first_name = $2, 
    last_name = $3,
    email = $4, 
    Profile_image = $5
WHERE id = $1
RETURNING *;