export default class ImageService{
    static getAvatar(imageName:string | undefined){
        if(imageName){
            return process.env.NEXT_PUBLIC_STATIC_URL + imageName
        }
        return process.env.NEXT_PUBLIC_BASE_AVATAR as string
    }
    static getImage(imageName:string ){
        return  process.env.NEXT_PUBLIC_STATIC_URL+imageName
    }
}