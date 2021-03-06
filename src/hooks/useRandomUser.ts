import { useEffect, useState } from "react"


export const useRandomUser = () => {
    const [user, setUser] = useState<IUser>({ name: '', img: '' });

    // returns random user from the api 
    const fetchUser = async () => {
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(result => {
                const userData: any = result.results[0];
                const randomUser: IUser = {
                    name: `${userData.name.first} ${userData.name.last}`,
                    img: userData.picture.thumbnail
                };
                setUser(randomUser);
            });
    };

    useEffect(() => {
        fetchUser();
    }, [])

    return user;
}