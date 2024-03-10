import { Hono } from 'https://deno.land/x/hono@v3.11.10/mod.ts';
import {fetchHeadCount, generateQrCode, login, logout} from "./puregym.ts";

const app = new Hono();

app.get("/count", async c => {
    const email = c.req.query("email");
    const pin = c.req.query("pin");
    const id = c.req.query("id");
    if (!email || !pin) {
        c.status(400);
        return c.json({error: "Invalid email or pin"});
    }

    if (!id) {
        c.status(400);
        return c.json({error: "Invalid GYM ID"});
    }

    const auth = await login(email, parseInt(pin));
    const gymHeadCount = await fetchHeadCount(parseInt(id), auth.access_token);

    await logout(auth.access_token);

    return c.json({
        count: gymHeadCount,
        id: parseInt(id)
    });
});

app.get("/qrcode", async c => {
    const email = c.req.query("email");
    const pin = c.req.query("pin");
    if (!email || !pin) {
        c.status(400);
        return c.json({error: "Invalid email or pin"});
    }

    const auth = await login(email, parseInt(pin));
    const qrCode = await generateQrCode(auth.access_token);

    await logout(auth.access_token);

    return c.json({
        qrCode
    });
})

Deno.serve(app.fetch);
