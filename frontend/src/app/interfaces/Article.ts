//corresponde a un DTO
export interface Article
{
    _id?: string,
    title: string,
    author: string,
    body: string,
    created: Date,
    upvotes?: number,
    adsvotes?: number,
    isADS?: boolean,
    wasADS?: boolean
}