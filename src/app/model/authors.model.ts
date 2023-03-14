export interface Authors {
   data: Data
}

export interface Data {
    author: string,
    birthday: string,
    birthPlace: string,
    books: Books[]
}

export interface Books {
    imageUrl: string,
    title: string,
    purchaseLink: string,
    PublishDate: string
}