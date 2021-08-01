const Desktop = {
	data() {
		return {
			screenshot: {
				page3ScreenshotURLs: [
					'screenshots/screenshot_page_3_1.png',
					'screenshots/screenshot_page_3_2.png',
					'screenshots/screenshot_page_3_3.png'
				],
				page2ScreenshotURLs: [
					'screenshots/screenshot_page_2_1.png',
					'screenshots/screenshot_page_2_2.png',
					'screenshots/screenshot_page_2_4.png'
				]
			},
			download: {
				latest: {
					url: "https://github.com/toto-minai/Utai/releases/download/v0.1_5/Utai.app.zip",
					description: "0.1 Build 5, requires macOS 12 Monterey Beta 3+"
				},
				legacy: {
					url: "https://github.com/toto-minai/Utai/releases/download/v0.1_4/Utai.app.zip",
					description: "Build 4"
				}
			}
		}
	}
}

const app = Vue.createApp(Desktop)
app.component('page-3-window', {
	props: ['src'],
	template: `
<div class="outter_page_3 outter">
    <div class="inner_page_3 inner">
        <img v-bind:src="src" class="screenshot_page_3_img screenshot item" />
    </div>
</div>
`
})
app.component('page-2-window', {
	props: ['src'],
	template: `
<div class="outter_page_2 outter">
    <div class="inner_page_2 inner"> 
        <img v-bind:src="src" class="screenshot_page_2_img screenshot item" />
    </div>
</div>
`
})
app.component('download', {
	props: ['latest', 'legacy'],
	template: `
<div class="banner_horizontal banner" style="bottom: 0;">
    <p>
        <a v-bind:href="latest.url">
            Download Latest
        </a> ({{ latest.description }}) / 
        <a v-bind:href="legacy.url">
            Download Legacy
        </a> ({{ legacy.description }}) / 
        <a href="https://github.com/toto-minai/utai">View Source</a>
    </p>
</div>
	`
})
app.mount('body')