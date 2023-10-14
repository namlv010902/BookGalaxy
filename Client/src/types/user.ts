export interface IUser{
    _id:string,
    name:string,
    avatar:string,
    phone:string,
    email:string,
    role:string,
    orderId:[{
        _id:string
    }]
    
}