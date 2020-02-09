export default function(callback, context) {
    return new Promise((resolve, reject) => {
        try{
            const result = callback.call(context);
            resolve(result)
        }catch(error) {
            reject(error);
        }
    });
}