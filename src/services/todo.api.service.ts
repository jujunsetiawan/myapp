import { get } from "./asyncstorage.service"

const url = 'https://todo-api-omega.vercel.app/api/v1'

export const create = async(path: string, body: object) => {
    const res = await fetch(url + path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await res.json()
    return response
}

export const read = async(path: string) => {
    const userData = await get('user')
    const res = await fetch(url + path, {
        method: 'GET',
        headers: {
            Authorization: userData ? `Bearer ${userData.token}` : '',
            'Content-Type': 'application/json'
        }
    })

    const response = await res.json()
    return response
}

export const update = async(path: string, body: object) => {
    const userData = await get('user')
    const res = await fetch(url + path, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            Authorization: userData ? `Bearer ${userData.token}` : '',
            'Content-Type': 'application/json'
        }
    })

    const response = await res.json()
    return response
}

export const destroy = async() => {

}