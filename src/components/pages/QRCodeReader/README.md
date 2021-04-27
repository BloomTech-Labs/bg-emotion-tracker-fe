Known Library Issues

1. Server side rendering won't work so only require the component when rendering in a browser environment.
2. Due to browser implementations the camera can only be accessed over https or localhost.
3. In Firefox a prompt will be shown to the user asking which camera to use, so facingMode will not affect it.
4. On IOS 11 it is only supported on Safari and not on Chrome or Firefox due to Apple making the API not available to 3rd party browsers.