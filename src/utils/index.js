export const getTime = (seconds) => {
    return new Date(seconds * 1000).toLocaleTimeString('ua-Ua', { timeZone: 'Atlantic/Reykjavik' })
}