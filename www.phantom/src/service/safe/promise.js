import mockSafe from './mock/safe';
import cache from './cache/cache';
let safe = typeof window.Safe !== "undefined" ? (new window.Safe()) : mockSafe;

export default function(callback) {
    return new Promise((resolve, reject) => {
        try{
            let context = {
                'safe': safe,
                'cache': cache
            };

            const result = callback(context);
            resolve(result)
        }catch(error) {
            reject(error);
        }
    });
}