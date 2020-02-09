import mockSafe from './mock/safe';
let safe = typeof window.Safe !== "undefined" ? (new window.Safe()) : mockSafe;

export default function(callback) {
    return new Promise((resolve, reject) => {
        try{
            const result = callback(safe);
            resolve(result)
        }catch(error) {
            reject(error);
        }
    });
}