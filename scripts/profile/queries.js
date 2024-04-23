// Query for name, audit ratio and numbers, xp.
const userInfoQuery = `
    query user {
        user {
            id
            login
            firstName
            lastName
            totalUp
            totalDown
            auditRatio
            xps {
                amount
                __typename
                path
            }
        }
    }
`;

const xpQuery = `
  query transaction($where: transaction_bool_exp) {
    transaction(where: $where) {
      type
      amount
      objectId
      userId
      createdAt
      path
      transaction_type {
        type
      }
      event {
        path
      }
    }
  }
`;
const xpVariables = {
	where: { type: { _eq: "xp" } },
};

export { userInfoQuery, xpQuery, xpVariables };
