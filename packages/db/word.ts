export const word :string[] =[]

function estimateSizeMB(arr:string[]) {
    let bytes = 0;
    for (const word of arr) {
        bytes += word.length * 2;    
        bytes += 40;                 
        bytes += 8;                 
    }
    return {
        bytes: bytes,
        kb: (bytes / 1024).toFixed(2),
        mb: (bytes / (1024 * 1024)).toFixed(6)
    };
}

console.log(estimateSizeMB(word));