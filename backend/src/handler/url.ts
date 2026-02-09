export const shortenUrl = (index:number) => {
    return index.toString(32);

}
export const decodeShortenUrl = (index:string)=>{
    return parseInt(index, 32)
}
