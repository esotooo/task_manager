export function generateUsernames(base: string, taken: Set<string>, count = 3) : string[] {
    const suggestions : string[] = [];
    let i = 1;

    while(suggestions.length < count){
        const candidate = i === 1 ? base : `${base}${i}`;
        if(!taken.has(candidate)){
            suggestions.push(candidate);
        }
        i++;
    }

    return suggestions;
}