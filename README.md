# PureGym API

## Usage

### Gym live count
Live information about the number of people at a specific gym
```http request
GET /count?email=[email]&pin=[pin]&id=[gym-id]
```

### Gym Access QR Code
Get string of the gym access QR Code, you can use this to generate an access QR Code with something like Siri Shortcuts
```http request
GET /qrcode?email=[email]&pin=[pin]
```

## Use cases
- Use an app like [SuperWidget](https://superwidget.app/) to display your gym's live count on your home screen as a widget
- Use an app like [Siri Shortcuts](https://apps.apple.com/us/app/shortcuts/id915249334) to generate a QR Code for your gym access

## Deploy
[Deno Deploy](https://deno.com/deploy) is the easiest way to deploy this API, but you can use any other service that supports Deno.
You might have to change the project ID in `deno.json` to your own but running `deno task deploy` should work right away as long as
[deployctl](https://github.com/denoland/deployctl) is installed
