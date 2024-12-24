"use server"

export async function registerClient( clientName: string, clientEmail: string) {
    const res = await fetch("https://simple-books-api.glitch.me/api-clients/", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            "clientName": clientName,
            "clientEmail": clientEmail
        })
    });

       if (res.status === 409) {
        return ("API client already registered. Try a different email.");
       }
       if (!res.ok) {
       return ("Failed to register API client");
       }
       const data = await res.json();
       
       return data.accessToken;      
    }   








