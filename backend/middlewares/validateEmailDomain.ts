import dns from "dns/promises";

export async function validateEmailDomain(email : string): Promise<boolean>{
    
    const parts = email.split("@");
    if(parts.length !== 2) return false;

    const domain = parts[1];

    try{
        const address = await dns.resolveMx(domain);
        return address && address.length > 0;
    }catch{
        return false;
    }
}