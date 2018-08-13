UPDATE employer_profile
    SET bio=$2, company=$3, position=$4, city=$5, state=$6, company_logo=$7
WHERE user_id=$1
RETURNING *;