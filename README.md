
# Youtube audio player
My lovely Spotify has gone from Russia and grab playlist itself. <br />
So I decided to make my own player app that can convert youtube music videos to audio tracks that I can listen to! 🥰

<br />

## To Do List
### Interface functionality:
- [x] play tracks
- [x] skip tracks
- [ ] volume changer (drag n drop desktop and mute on mobile)
- [x] autoplay next track after ending of a current track
- [x] progressbar
- [x] drag n drop rewinding track (desktop via `mouse events`)
- [x] drag n drop rewinding track (mobile via `touch API`)
- [x] loop track button
- [x] random order button
### Playlist functionality:
- [ ] input for youtube videos links 
- [ ] video to audio converter
- [ ] playlist storage (localStorage or Firebase)
### Styles:
- [ ] good-looking styles
- [ ] cross-browser and adaptive layouts
### Bugs to solve:
- [x] Safari block playing after skip track (but [autoplay policy error is instead but with no valuent effect](https://developer.chrome.com/blog/autoplay/))
- [x] progressbar freezes and may get left >100% and fly beyond the borders of its block
- [x] prevent the ability of pushing skip track buttons from uncountable pushing after pushing to keep better UX

## Dependencies
- [x] `ESlint` and airbnb style-guide
- [x] `SASS` and `CSS Modules`
- [x] `classnames` for classes
- [x] `Redux` for state management 

<br />

## Libs
- [x] [fontawesome for player icons](https://fontawesome.com/v5/docs/web/use-with/react)
- [x] [classnames](https://www.npmjs.com/package/classnames)
- [ ] [ytdl-core for video to audio converting (backend)](https://www.npmjs.com/package/ytdl-core)

<br />

## References
* [Figma layout 1](https://www.figma.com/community/file/1076026332340759981)
* [Figma layout 2](https://www.figma.com/file/YCU5I0mptwWXlE0zsRAETN/Music-Player-UI-KIT%F0%9F%8E%A7-(Community)?node-id=1%3A2648)
* [Spotify UI Kit](https://www.figma.com/file/kBF55NUoaQeP4PUoTh51wR/Spotify-UI-Design-(Search%2FArtist-Profile)-(Community)?node-id=42%3A28)

<br />

## You can run this project locally:
* clone branch with `git clone git@github.com:proehavshiy/movies-explorer-frontend.git`
* `npm run start` - run the project
* `npm run build` - build final version
* `npm run lint` - check linter errors
* `npm run deploy` - build and deploy
