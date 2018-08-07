UPDATE freelancer_post
    SET title=$2, body=$3
WHERE id=$1
RETURNING *;