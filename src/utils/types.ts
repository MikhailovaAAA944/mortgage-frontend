export interface Unit {
    id: number,
    name: string,
    status: number,
    description: string,
    image: string
}

export interface User {
    id: number,
    name: string,
    email: string
}

export interface Calculation {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    state: string,
    fromAirport: string,
    toAirport: string,
    debt: strin
}

export interface Option {
    id: number,
    name: string
}