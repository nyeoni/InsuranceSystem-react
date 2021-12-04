const users = [
    { id: "kim123", password: "123", name: "Kim" },
    { id: "lee123", password: "456", name: "Lee" },
    { id: "park123", password: "789", name: "Park" },
]

export function signIn({ id, password }) {
    const user = users.find((user) => user.id === id && user.password === password)
    if (user){
        console.log(user);
        return user;
    }
    else {
        console.log("what the fuck!");
        alert("로그인 실패!");
        return null;
    }
}
