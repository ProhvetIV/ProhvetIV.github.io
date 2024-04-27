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
  query transaction($order_by: [transaction_order_by!], $where: transaction_bool_exp) {
    transaction(order_by: $order_by, where: $where) {
      type
      amount
      objectId
      userId
      createdAt
      path
      object {
        attrs
      }
    }
  }
`;
const xpVariables = {
	order_by: { createdAt: "asc" },
	where: {
		type: {
			_eq: "xp",
		},
		object: {
			attrs: {
				_has_key: "displayedName",
			},
		},
		path: {
			_nregex: "/.+piscine.+/",
		},
	},
};

const lvQuery = `
  query transaction($order_by: [transaction_order_by!], $where: transaction_bool_exp) {
    transaction(order_by: $order_by, where: $where) {
      type
      amount
      createdAt
      path
    }
  }
`;
const lvVariables = {
	order_by: {
		amount: "desc",
	},
	where: {
		type: {
			_eq: "level",
		},
	},
};

const passFailQuery = `
  query progress {
    progress {
      createdAt
      grade
      path
    }
  }
`;

export { userInfoQuery, xpQuery, xpVariables, lvQuery, lvVariables, passFailQuery };
