interface IComment {
    id: number,
    author: string,
    img: string,
    text: string,
    date: string,
    rating: number,
    replies?: IComment[]
}

interface IUser {
    name: string,
    img: string
}