export const checkIfUserIsInDatabase = async (user) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
