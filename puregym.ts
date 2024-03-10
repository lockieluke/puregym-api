export async function login(email: string, pin: number): Promise<{
    access_token: string,
    expires_in: number,
    token_type: string,
    refresh_token: string,
    scope: string
}> {
    const response = await fetch("https://auth.puregym.com/connect/token", {
        method: "POST",
        headers: {
            "Authorization": "Basic cm8uY2xpZW50Og==",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=password&username=${encodeURIComponent(email)}&password=${pin}&scope=pgcapi+offline_access`
    })

    return await response.json();
}

export async function logout(access_token: string) {
    const response = await fetch("https://capi.puregym.com/api/v2/member/cache", {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });
    const json = await response.json();

    if (json["MessageId"] !== "DeleteCacheSuccess")
        throw new Error(`Failed to sign user out: ${access_token}`);
}

export async function fetchHeadCount(gymId: number, access_token: string): Promise<number> {
    const response = await fetch(`https://capi.puregym.com/api/v2/gymSessions/gym?gymId=${gymId}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });
    const json = await response.json();

    return parseInt(json["TotalPeopleInGym"] ?? 0);
}

export async function generateQrCode(access_token: string): Promise<string> {
    const response = await fetch("https://capi.puregym.com/api/v2/member/qrcode", {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });
    const json = await response.json();

    return json["QrCode"];
}
