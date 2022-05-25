export const checkIfUserIsInDatabase = async (user) => {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log("error checking if user is in database", error);
    return error;
  }
};
