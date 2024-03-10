# PureGym API

## Usage

### Gym live count
Live information about the number of people at a specific gym, if id isn't provided it will automatically select your home gym
```http request
GET /count?email=[email]&pin=[pin]&id=[gym-id]
```

### Gym Access QR Code
Get string of the gym access QR Code, you can use this to generate an access QR Code with something like [Siri Shortcuts](https://apps.apple.com/us/app/shortcuts/id915249334)
```http request
GET /qrcode?email=[email]&pin=[pin]
```

## Use cases
<img src="https://github.com/lockieluke/puregym-api/blob/master/assets/live_count_widget.jpeg?raw=true">
<sub>It would show 0 when there's less than 10 people at the gym, this is what the underlying API returns and indeed is a limitation</sub>

- Use an app like [SuperWidget](https://superwidget.app/) to display your gym's live count on your home screen as a widget
- Use an app like [Siri Shortcuts](https://apps.apple.com/us/app/shortcuts/id915249334) to generate a QR Code for your gym access

## Security
The API does not store any data as it generates a new access token for every request and attempts to tell PureGym to invalidate it after the request is complete.

However, your email and pin are both sent in plain text same as PureGym's official API so there isn't much of a different, nothing we can do about that.

## Deploy
[Deno Deploy](https://deno.com/deploy) is the easiest way to deploy this API, but you can use any other service that supports Deno.
You might have to change the project ID in `deno.json` to your own but running `deno task deploy` should work right away as long as
[deployctl](https://github.com/denoland/deployctl) is installed
