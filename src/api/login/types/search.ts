interface SearchResult {
    id: number,
    phone: string,
    email: string,
    nickname: string,
    username: string,
    idCard: string,
    avatar: string,
    gender: number,
    roleId: number,
    cityId: number,
    statusId: number,
    identityId: number,
    birthDay: Date,
    createTime: Date,
    integral: number,
    reputation: number,
    lastAddress: string,
    lastTime: Date,
}

export type SearchResponseData = Resp<SearchResult>