UPDATE freelancer_profile
    SET bio=$2, skills=$3, experience=$4, city=$5
WHERE user_id=$1
RETURNING *;