UPDATE employer_profile
    SET bio=$2, company=$3, position=$4, city=$5, company_logo=$6
WHERE user_id=$1
RETURNING *;