export interface IPost {
    id: string,    
    userEmail: string,
    title: string,
    content: string,
    userName: string,
    postedDate: Date,
    postImg: string,
    userImg: string,
    like: number,
    dislike: number,
    comments: []
}